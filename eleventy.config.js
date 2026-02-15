import { EleventyRenderPlugin, HtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import collections from './_config/collections.js'
import filters from './_config/filters.js'
import shortcodes from './_config/shortcodes.js'

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(shortcodes)
	eleventyConfig.addPlugin(filters)
	eleventyConfig.addPlugin(collections)
	eleventyConfig.addPlugin(HtmlBasePlugin)
	eleventyConfig.addPlugin(EleventyRenderPlugin)
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ['webp', 'auto'],
		widths: ['auto'],
		defaultAttributes: {
			loading: 'lazy',
			decoding: 'async',
		},
	})
	eleventyConfig.addPassthroughCopy({
		'./public/': '/',
	})
	eleventyConfig.addPassthroughCopy('content/**/*.mp4')
	eleventyConfig.addPassthroughCopy({ './content/profile.jpg': '/' })
}

export const config = {
	dir: {
		input: 'content',
		includes: '../_includes',
		data: '../_data',
	},
}
