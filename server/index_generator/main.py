import os
import argparse

from pathlib import Path

import json

import re
import yaml


def read_yaml(file_path: Path):
    if not file_path.is_file():
        raise FileNotFoundError(f"File not found {file_path}")

    content = file_path.read_text(encoding="utf-8")

    match = re.match(r"^---\s*\n(.*?)\n---\s*(\n|$)", content, re.DOTALL)

    if match:
        yaml_str = match.group(1)

        meta = yaml.safe_load(yaml_str)
        return meta if isinstance(meta, dict) else {}

    return {}


def process_directory(directory_path: Path):
    data = {}

    for root, _, files in os.walk(directory_path):
        for file in files:
            file_path = os.path.join(root, file)

            parts, _ext = os.path.splitext(file)
            yaml = read_yaml(Path(file_path))

            data[parts] = yaml

    return data


def write_output(data: dict[str, dict], output_path: Path):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("dir_path", help="Path to the input directory")
    parser.add_argument("output_path", help="Path to the output directory")

    args = parser.parse_args()

    input_path = Path(args.dir_path).expanduser().resolve()
    output_path = Path(args.output_path).expanduser().resolve()

    if not os.path.isdir(output_path):
        return print("`output_path` is not a directory")

    if os.path.isdir(input_path):
        data = process_directory(args.dir_path)
        write_output(data, output_path.joinpath("post_index.json"))
    else:
        print("`dir_path` is not a directory")


if __name__ == "__main__":
    main()
