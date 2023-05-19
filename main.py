def collect_files(file_paths):
    result = ""

    for file_path in file_paths:
        with open(file_path, 'r') as file:
            content = file.read()

        result += f"{file_path}:\n\n{content}\n\n"

    return result

def write_to_file(content, output_file_path):
    with open(output_file_path, 'w') as file:
        file.write(content)

def main():
    input_file_path = "file_paths.txt"
    output_file_path = "merged_code.txt"

    with open(input_file_path, 'r') as file:
        file_paths = file.read().splitlines()

    content = collect_files(file_paths)
    write_to_file(content, output_file_path)

if __name__ == "__main__":
    main()