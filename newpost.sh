#!/bin/bash
echo Hello! Let\'s make a new post.

printf "%s" "First, go ahead and drag and drop an image into the terminal here: "
read INPUT_FILE
INPUT_FILE="${INPUT_FILE//\'/}"
INPUT_FILE="${INPUT_FILE//\"/}"

EXTENSION="${INPUT_FILE##*.}"
EXTENSION="$(echo "$EXTENSION" | tr -cd '[:alnum:]')"
IMAGE_FILE="$(date +"%b.%d.%y.At.%H.%M").${EXTENSION}"
IMAGE_COPY="./content/p/$IMAGE_FILE" # not sure why i have to do this
echo copying $INPUT_FILE
echo to $IMAGE_COPY...
cp -- "$INPUT_FILE" "$IMAGE_COPY"
echo done.

printf "%s" "Alright, now describe it in a sentence. Example, (a picture of my awesome dog): "
read ALT_TEXT

printf "%s" "Cool. Now type in all tags, separated by a comma. Example, (cats, dogs): "
read TAGS
# =========================
# Auto-generated values
# =========================

# Frontmatter timestamp (ISO 8601 with milliseconds, UTC)
DATE="$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")"

# Filename format: Feb.14.26.At.08.19.md
OUTPUT_FILE="./content/p/$(date +"%b.%d.%y.At.%H.%M").md"

# =========================
# File Generation
# =========================
cat <<EOF > "$OUTPUT_FILE"
---
date: $DATE
attachments:
  - altText: $ALT_TEXT
    type: image
    url: $IMAGE_FILE
tags: [$TAGS]
---

It is happening again.
EOF

echo "File '$OUTPUT_FILE' generated successfully."