import re

path = "src/lib/data.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

menu_ids = [f"m-{i}" for i in range(1, 19)]
reward_ids = [f"r-{i}" for i in range(1, 7)]

for key in menu_ids:
    pattern = rf'(id: "{key}"[\s\S]*?image: )"[^"]+"'
    replacement = rf'\1images.menu["{key}"]'
    content, n = re.subn(pattern, replacement, content, count=1)
    print(key, n)

for key in reward_ids:
    pattern = rf'(id: "{key}"[\s\S]*?image: )"[^"]+"'
    replacement = rf'\1images.rewards["{key}"]'
    content, n = re.subn(pattern, replacement, content, count=1)
    print(key, n)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("done")
