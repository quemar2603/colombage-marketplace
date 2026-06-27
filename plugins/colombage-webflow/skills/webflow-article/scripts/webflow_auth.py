#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
webflow_auth.py — Resolution securisee du token API Webflow pour les scripts du skill.

Le token n'est JAMAIS stocke dans le code ni dans un fichier versionne. Ordre de
resolution (premier trouve gagne) :

  1. Variable d'environnement par site : WEBFLOW_API_TOKEN_COMPAGNIE / WEBFLOW_API_TOKEN_PRINCIPAL
  2. Variable d'environnement globale : WEBFLOW_API_TOKEN
  3. Fichier local 'webflow_tokens.json' (gitignore), a cote de ce script,
     avec les cles "compagnie" / "principal".

Le site est determine par l'argument 'site', ou deduit du 'collection_id' via
collections.json. Si rien n'est trouve, une erreur explicite explique comment configurer.
"""

import os
import json

HERE = os.path.dirname(os.path.abspath(__file__))
TOKENS_FILE = os.path.join(HERE, "webflow_tokens.json")
COLLECTIONS_FILE = os.path.join(HERE, "collections.json")


def site_of_collection(collection_id):
    """Retourne la cle de site ('compagnie'/'principal') possedant cette collection,
    d'apres collections.json. None si inconnue."""
    if not collection_id or not os.path.isfile(COLLECTIONS_FILE):
        return None
    cfg = json.load(open(COLLECTIONS_FILE, encoding="utf-8"))
    for meta in cfg.get("collections", {}).values():
        if meta.get("collection_id") == collection_id:
            return meta.get("site")
    for site_key, s in cfg.get("sites", {}).items():
        if collection_id in (s.get("theme_collection_id"),
                             s.get("cta_collection_id"),
                             s.get("auteurs_collection_id"),
                             s.get("site_id")):
            return site_key
    return None


def get_token(collection_id=None, site=None):
    site = site or site_of_collection(collection_id)

    # 1) env par site
    if site:
        v = os.environ.get(f"WEBFLOW_API_TOKEN_{site.upper()}")
        if v:
            return v.strip()
    # 2) env globale
    v = os.environ.get("WEBFLOW_API_TOKEN")
    if v:
        return v.strip()
    # 3) fichier local gitignore
    if os.path.isfile(TOKENS_FILE):
        data = json.load(open(TOKENS_FILE, encoding="utf-8"))
        if site and data.get(site):
            return str(data[site]).strip()
        # un seul token defini ? l'utiliser a defaut
        real = {k: v for k, v in data.items()
                if not k.startswith("_") and isinstance(v, str) and v and not v.startswith("REMPLACER")}
        if len(real) == 1:
            return list(real.values())[0].strip()

    raise SystemExit(
        "[webflow_auth] Token Webflow introuvable"
        + (f" pour le site '{site}'" if site else "")
        + ".\nConfigurez l'un de :\n"
        "  - variable d'env WEBFLOW_API_TOKEN_COMPAGNIE / WEBFLOW_API_TOKEN_PRINCIPAL,\n"
        "  - variable d'env WEBFLOW_API_TOKEN,\n"
        f"  - fichier local '{TOKENS_FILE}' (copie de webflow_tokens.example.json, gitignore).\n"
        "Scopes requis : cms:read + cms:write."
    )
