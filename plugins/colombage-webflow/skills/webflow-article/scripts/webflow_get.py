#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
webflow_get.py — Recupere un item CMS Webflow existant (par id ou par slug).

Sert au mode "modifier un article existant" : on lit l'item pour repartir de son
contenu reel (le rich text est deja en HTML Webflow, avec ses embeds
data-rt-embed-type) plutot que de le regenerer depuis zero.

SECURITE : token lu depuis la variable d'environnement WEBFLOW_API_TOKEN
(scopes 'cms:read'). Jamais ecrit dans le repo.

Usage :
    # par item id :
    WEBFLOW_API_TOKEN=xxx python webflow_get.py <collection_id> --id <item_id>
    # par slug :
    WEBFLOW_API_TOKEN=xxx python webflow_get.py <collection_id> --slug <slug>
    # lister (id + name + slug) tous les items d'une collection :
    WEBFLOW_API_TOKEN=xxx python webflow_get.py <collection_id> --list

Sortie : JSON de l'item (ou liste compacte) sur stdout, en UTF-8.
Avec --field <slug>, sort uniquement la valeur de ce champ (ex. --field premier-rich-text).
"""

import os
import sys
import json
import urllib.request
import urllib.error

API_BASE = "https://api.webflow.com/v2"


def _get(url, token):
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}", "accept": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise SystemExit(f"[webflow_get] HTTP {e.code}: {e.read().decode()[:300]}")


def _all_items(collection_id, token):
    items, offset = [], 0
    while True:
        data = _get(f"{API_BASE}/collections/{collection_id}/items?limit=100&offset={offset}", token)
        batch = data.get("items", [])
        items += batch
        total = data.get("pagination", {}).get("total", len(items))
        offset += len(batch)
        if not batch or offset >= total:
            break
    return items


def _emit(obj):
    sys.stdout.buffer.write((json.dumps(obj, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))


def main():
    token = os.environ.get("WEBFLOW_API_TOKEN")
    if not token:
        raise SystemExit("[webflow_get] WEBFLOW_API_TOKEN absente.")
    args = sys.argv[1:]
    if not args:
        raise SystemExit("[webflow_get] Usage : python webflow_get.py <collection_id> [--id ID | --slug SLUG | --list] [--field SLUG]")
    collection_id = args[0]
    field = None
    if "--field" in args:
        field = args[args.index("--field") + 1]

    if "--list" in args:
        for it in _all_items(collection_id, token):
            fd = it.get("fieldData", {})
            tag = "[D]" if it.get("isDraft") else "   "
            print(f"{tag} {it.get('id')}  {fd.get('slug')}  <- {fd.get('name')}")
        return

    if "--id" in args:
        item = _get(f"{API_BASE}/collections/{collection_id}/items/{args[args.index('--id') + 1]}", token)
    elif "--slug" in args:
        slug = args[args.index("--slug") + 1]
        item = next((it for it in _all_items(collection_id, token)
                     if it.get("fieldData", {}).get("slug") == slug), None)
        if item is None:
            raise SystemExit(f"[webflow_get] Aucun item avec slug='{slug}' dans la collection.")
    else:
        raise SystemExit("[webflow_get] Préciser --id, --slug ou --list.")

    if field:
        sys.stdout.buffer.write(((item.get("fieldData", {}).get(field) or "") + "\n").encode("utf-8"))
    else:
        _emit(item)


if __name__ == "__main__":
    main()
