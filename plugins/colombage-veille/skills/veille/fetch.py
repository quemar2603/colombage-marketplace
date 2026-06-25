#!/usr/bin/env python3
"""Fetcher dedie a la veille ColombAge.

Recupere sitemaps et pages publiques avec de vrais headers navigateur,
suit les redirections, et sort le contenu brut (utile pour le XML des sitemaps,
que WebFetch convertirait en markdown). Garde SSRF : refuse les IP internes.

Usage:
    python fetch.py <url>                     # contenu brut sur stdout
    python fetch.py <url> --output /tmp/x.xml # ecrit dans un fichier (utf-8)
    python fetch.py <url> --head              # statut + headers seulement
"""
import argparse
import ipaddress
import socket
import sys
from urllib.parse import urlparse

try:
    import requests
except ImportError:
    sys.exit("Erreur: lib 'requests' requise (pip install requests).")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 ColombAgeVeille/1.0"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.5",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
}


def is_public(host: str) -> bool:
    """Refuse les hotes qui resolvent vers une IP privee/loopback (anti-SSRF)."""
    try:
        infos = socket.getaddrinfo(host, None)
    except socket.gaierror:
        return False
    for info in infos:
        ip = ipaddress.ip_address(info[4][0])
        if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved:
            return False
    return True


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--output")
    ap.add_argument("--head", action="store_true")
    ap.add_argument("--timeout", type=int, default=30)
    args = ap.parse_args()

    parsed = urlparse(args.url)
    if parsed.scheme not in ("http", "https"):
        sys.exit(f"Erreur: URL non http(s): {args.url}")
    if not parsed.hostname or not is_public(parsed.hostname):
        sys.exit(f"Erreur: hote non public ou introuvable: {parsed.hostname}")

    try:
        r = requests.get(
            args.url, headers=HEADERS, timeout=args.timeout, allow_redirects=True
        )
    except requests.RequestException as exc:
        sys.exit(f"Erreur de requete: {exc}")

    if args.head:
        print(f"URL finale: {r.url}")
        print(f"Statut: {r.status_code}")
        for key, value in r.headers.items():
            print(f"{key}: {value}")
        return

    if args.output:
        with open(args.output, "w", encoding="utf-8") as handle:
            handle.write(r.text)
        print(f"HTTP {r.status_code} | {len(r.content)} octets -> {args.output}")
    else:
        sys.stdout.buffer.write(r.text.encode("utf-8", "replace"))


if __name__ == "__main__":
    main()
