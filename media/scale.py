import os
import subprocess

i = 2

# def compress_videos_to_webp(input_folder, output_folder, resolution='400'):
def compress_videos_to_webp(input_folder, output_folder, resolution='800'):
    global i
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.mp4', '.avi', '.mov', '.mkv', '.flv')):
            input_file = os.path.join(input_folder, filename)
            # output_file = os.path.join(output_folder, '720_video' + str(i) + '.webp')
            output_file = os.path.join(output_folder, 'video.webp')
            i += 1

            # FFmpeg command to convert video to WebP with specific resolution
            command = [
                'ffmpeg',
                '-i', input_file,
                '-vf', f'scale=-1:{resolution}',  # Scale to height 520p, width is auto-scaled
                '-c:v', 'libwebp',                 # Use WebP codec
                '-lossless', '0',                  # Use lossy compression (0 = lossy, 1 = lossless)
                '-quality', '50',                      # Quality of the output WebP (0-100)
                '-loop', '0',                      # Loop the animation indefinitely
                output_file
            ]

            try:
                subprocess.run(command, check=True)
                print(f'Converted {input_file} to {output_file}')
            except subprocess.CalledProcessError as e:
                print(f'Error converting {input_file}: {e}')

if __name__ == "__main__":
    input_folder = '.'
    output_folder = 'videos'
    compress_videos_to_webp(input_folder, output_folder)
