import os
from PIL import Image

if not os.path.exists('processed'):
    os.makedirs('processed')

for root, dirs, files in os.walk('.'):
    for filename in files:
        if filename.endswith('.png'):
            file_path = os.path.join(root, filename)
            
            with Image.open(file_path) as img:
                width, height = img.size
                if width > height:
                    new_width = 800
                    new_height = int(height * (800 / width))
                else:
                    new_height = 800
                    new_width = int(width * (800 / height))
                
                resized_img = img.resize((new_width, new_height), Image.LANCZOS)
                
                processed_dir = os.path.join('processed', os.path.relpath(root, '.'))
                if not os.path.exists(processed_dir):
                    os.makedirs(processed_dir)
                
                resized_img.save(os.path.join(processed_dir, filename))