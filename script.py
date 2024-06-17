# Define the path to your input and output files
input_file_path = 'test_emojis.txt'
output_file_path = 'all_emojis.txt'

# Function to parse the test_emojis.txt file and extract emojis
def extract_emojis(input_file_path):
    emojis = []
    with open(input_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith('#'):  # Skip empty lines and lines starting with #
                parts = line.split('#')[0].strip().split(';')
                if len(parts) >= 2:
                    emoji_code = parts[0].strip()
                    if emoji_code:
                        try:
                            # Split emoji_code by spaces and convert each part to a character
                            emoji_chars = ''.join(chr(int(part, 16)) for part in emoji_code.split())
                            emojis.append(emoji_chars)
                        except ValueError:
                            pass  # Ignore invalid lines
    return emojis

# Extract emojis from the input file
emojis = extract_emojis(input_file_path)

# Write emojis to the output file
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    for emoji in emojis:
        output_file.write(emoji + '\n')

print(f"Emojis extracted from '{input_file_path}' and saved to '{output_file_path}'.")
