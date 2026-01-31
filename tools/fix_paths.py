import pathlib
import sys
root=pathlib.Path('.')
replacements=[
    ('../css/styles.css','/css/styles.css'),
    ('../assets/logo.svg','/assets/logo.svg'),
    ('../js/site-ui.js','/js/site-ui.js'),
    ('../index.html#systems','/index.html#systems'),
    ('../index.html','/index.html'),
]
files=list(root.rglob('systems/*.html'))
files+=list(root.glob('*.html'))
changed=[]
for f in files:
    s=f.read_text(encoding='utf-8',errors='ignore')
    orig=s
    for a,b in replacements:
        s=s.replace(a,b)
    if s!=orig:
        f.write_text(s,encoding='utf-8')
        changed.append(str(f))
print('Updated',len(changed),'files')
for p in changed:
    print(p)
