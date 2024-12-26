import os
from PIL import Image

if not os.path.exists('processed'):
    os.makedirs('processed')

for filename in os.listdir('.'):
    if filename.endswith('.jpg'):
        with Image.open(filename) as img:
            width, height = img.size
            if width > height:
                new_width = 800
                new_height = int(height * (800 / width))
            else:
                new_height = 800
                new_width = int(width * (800 / height))
            
            resized_img = img.resize((new_width, new_height), Image.LANCZOS)
            
            resized_img.save(os.path.join('processed', filename))