# Karmen's website

This is a site for Karmen Griffin. I'm writing this today to just write down a few things to remember when editing the site.

1. You probably don't need to update the site, but if you do, run `npm i`

2. To test locally, run `npm run dev` to test the site locally.

3. If you want, you can change your site name and stuff like that in the `_data/metadata.js` file.

# How to make a new post
Create new posts in ./content/p.

- Make a markdown file `POSTNAME.md` and place your image in the folder next to it. Name your image `POSTNAME.{extension}`, which will let you reference it by typing ./picture.jpg in the markdown file. You can upload any pictures you want into that folder. Each post will have an image attached to it sharing a filename. 

## TO MAKE A NEW POST, RUN THIS COMMAND

`./newpost.sh`

it will walk you through everything you need to do, and provide you an editor to start writing.
### TO ADD MORE IMAGES

you can copy more images into the p folder, but will need to reference their relative paths to the p folder as the other attachments in the list of attachments.

Here is a manual template, if you forget/need it. \/
```
---
author: Author Name
date: 2025-07-15T17:01:23.812Z
attachments:
  - altText: Alt text for sample1.png
    type: image/png
    url: ./sample1.png
  - altText: Alt text for sample2.jpg
    type: image/jpeg
    url: ./sample2.jpg
  - altText: Alt-text for sample3.mp4
    type: video/mp4
    url: ./sample3.mp4
    pixel: true
tags: [sample, tags]
---

Caption and body content here.
```