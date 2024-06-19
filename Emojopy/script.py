# Define the path to your input and output files
input_file_path = 'emojis.txt'
output_file_path = 'all_emojis.txt'

# Function to parse the test_emojis.txt file and extract emojis with descriptions
def extract_emojis(input_file_path):
    emojis = []
    with open(input_file_path, 'r', encoding='utf-8') as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith('#'):  # Skip empty lines and lines starting with #
                parts = line.split('#')[0].strip().split(';')
                emoji_code = parts[0].strip()
                last_int_index = max([i for i, char in enumerate(line) if char.isdigit()], default=-1)
                description = line[last_int_index + 1:].strip()
                if emoji_code:
                    try:
                        # Split emoji_code by spaces and convert each part to a character
                        emoji_chars = ''.join(chr(int(part, 16)) for part in emoji_code.split())
                        emojis.append((emoji_chars, description))
                    except ValueError:
                        pass  # Ignore invalid lines
    return emojis

# Extract emojis and descriptions from the input file
emojis_with_desc = extract_emojis(input_file_path)

# Remove duplicates while preserving order
emojis_unique = []
seen = set()
for emoji, desc in emojis_with_desc:
    if emoji not in seen:
        emojis_unique.append((emoji, desc))
        seen.add(emoji)

# Write emojis and descriptions to the output file
with open(output_file_path, 'w', encoding='utf-8') as output_file:
    for emoji, desc in emojis_unique:
        if desc:
            output_file.write(f"{emoji},{desc}\n")
        else:
            output_file.write(f"{emoji}\n")

print(f"Emojis extracted from '{input_file_path}', duplicates removed, and saved to '{output_file_path}'.")
