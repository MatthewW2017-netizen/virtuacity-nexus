import pathlib, re
root=pathlib.Path('.')
for p in root.rglob('*.html'):
    s=p.read_text(encoding='utf-8', errors='ignore')
    for m in re.finditer(r'(?:href|src)=["\']([^"\']+)["\']', s):
        url=m.group(1)
        if url.startswith(('http://','https://')):
            print(f"EXTERNAL: {url} in {p}")
        else:
            target=(p.parent / url.lstrip('./')).resolve()
            exists=target.exists()
            tag="OK" if exists else "MISSING"
            print(f"{tag}: {url} in {p} -> {target}")
