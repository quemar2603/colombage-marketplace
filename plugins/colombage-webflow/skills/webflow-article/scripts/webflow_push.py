#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
webflow_push.py — Cree ou met a jour un item CMS Webflow EN BROUILLON via l'API Data v2.

Pourquoi ce script : pousser un article via le MCP oblige a recopier tout le HTML
dans l'appel (lourd et faillible pour un gros rich text). Ce script lit le payload
depuis un fichier et l'envoie directement a l'API — aucune recopie, fiable.

SECURITE : le token n'est JAMAIS ecrit ici ni dans le repo. Il est lu depuis la
variable d'environnement WEBFLOW_API_TOKEN. Le token doit avoir les scopes
'cms:read' et 'cms:write' (cocher « CMS » en lecture + ecriture lors de la
generation du token dans Webflow : Site settings > Apps & integrations > API access).

Usage :
    WEBFLOW_API_TOKEN=xxxxx python webflow_push.py <request.json>

Format du fichier request.json :
    {
      "collection_id": "68f8986beeb92eac221248d4",
      "item_id": "6a3ea7b295143d6a6bca1ebc",   # present => UPDATE (PATCH) ; absent => CREATE (POST)
      "isDraft": true,                            # defaut true (brouillon)
      "fieldData": { ...champs... }
    }

Sortie : le JSON de reponse de l'API (id de l'item, statut), sur stdout.
"""

import os
import sys
import json
import urllib.request
import urllib.error

API_BASE = "https://api.webflow.com/v2"


def _request(method, url, token, payload=None):
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method, headers={
        "Authorization": f"Bearer {token}",
        "accept": "application/json",
        "content-type": "application/json",
    })
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return e.code, {"error": e.read().decode("utf-8")}


def main():
    token = os.environ.get("WEBFLOW_API_TOKEN")
    if not token:
        raise SystemExit("[webflow_push] Variable d'environnement WEBFLOW_API_TOKEN absente.")
    if len(sys.argv) < 2:
        raise SystemExit("[webflow_push] Usage : python webflow_push.py <request.json>")

    with open(sys.argv[1], "r", encoding="utf-8") as f:
        body = json.load(f)

    collection_id = body.get("collection_id")
    if not collection_id:
        raise SystemExit("[webflow_push] 'collection_id' obligatoire dans le payload.")
    item_id = body.get("item_id")
    is_draft = body.get("isDraft", True)
    field_data = body.get("fieldData")
    if not field_data:
        raise SystemExit("[webflow_push] 'fieldData' obligatoire dans le payload.")

    item_payload = {"isDraft": is_draft, "fieldData": field_data}

    if item_id:
        # UPDATE (item en staging/draft)
        url = f"{API_BASE}/collections/{collection_id}/items/{item_id}"
        status, result = _request("PATCH", url, token, item_payload)
        action = "update"
    else:
        # CREATE (item en staging/draft)
        url = f"{API_BASE}/collections/{collection_id}/items"
        status, result = _request("POST", url, token, item_payload)
        action = "create"

    out = {"action": action, "http_status": status, "result": result}
    sys.stdout.buffer.write((json.dumps(out, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
    if status >= 400:
        sys.exit(1)


if __name__ == "__main__":
    main()
