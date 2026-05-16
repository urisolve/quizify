import os
import re
import python_avatars as pa

OUTPUT_DIR = os.path.join("app", "public", "img", "logos", "avatars")
os.makedirs(OUTPUT_DIR, exist_ok=True)

existing_numbers = []
for filename in os.listdir(OUTPUT_DIR):
    match = re.match(r"avatar_(\d+)\.svg$", filename)
    if match:
        existing_numbers.append(int(match.group(1)))

start_index = max(existing_numbers, default=0)

for i in range(50):
    avatar = pa.Avatar.random(
        style=pa.AvatarStyle.CIRCLE
    )

    avatar.render(os.path.join(OUTPUT_DIR, f"avatar_{start_index + i + 1}.svg"))

print(f"50 avatars gerados em {OUTPUT_DIR}")