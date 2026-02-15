import dateRfc822 from '@11ty/eleventy-plugin-rss/src/dateRfc822.js'
import dateRfc3339 from '@11ty/eleventy-plugin-rss/src/dateRfc3339.js'
import getNewestCollectionItemDate from '@11ty/eleventy-plugin-rss/src/getNewestCollectionItemDate.js'
import MarkdownIt from 'markdown-it'
import metadata from '../_data/metadata.js'
import { countKeys } from './utils.js'

export default function (eleventyConfig) {
	eleventyConfig.addFilter('toISOString', (pubDate) => {
		if (!pubDate) return ''
		const date = new Date(pubDate)
		return date.toISOString()
	})

	eleventyConfig.addFilter('formatDate', (pubDate) => {
		if (!pubDate) return ''
		const date = new Date(pubDate)
		const prettyDate = new Intl.DateTimeFormat('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		}).format(date)
		return prettyDate
	})

	eleventyConfig.addFilter('cleanTags', (tags = []) =>
		tags.filter((tag) => metadata.hiddenTags.indexOf(tag) === -1),
	)

	eleventyConfig.addFilter('cleanTitle', (input = '') => {
		if (typeof input !== 'string') {
			return ''
		}
		return input?.replaceAll('\n', ' ')?.trim()
	})

	eleventyConfig.addFilter('encodeUriComponent', (i = '') =>
		encodeURIComponent(i),
	)

	eleventyConfig.addFilter('getHead', (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return []
		}
		if (n < 0) {
			return array.slice(n)
		}
		return array.slice(0, n)
	})

	eleventyConfig.addFilter('getFirstImage', (attachments) => {
		return attachments
			.find((o) => o.type.indexOf('image') === 0)
			?.url.replace('./', './content/p/')
	})

	eleventyConfig.addFilter('postImagePath', (i) => {
		if (!i) return
		return i.replace('./', '/p/')
	})

	eleventyConfig.addFilter('markdown', (md) => {
		const mit = new MarkdownIt()
		return mit.render(md)
	})

	eleventyConfig.addFilter('getTagsByCount', (posts) => {
		const data = {}
		for (const {
			data: { tags },
		} of posts) {
			if (tags) {
				for (const tag of tags) {
					if (metadata.hiddenTags.indexOf(tag) === -1) {
						data[tag] = data[tag] ? data[tag] + 1 : 1
					}
				}
			}
		}
		return countKeys(data)
	})

	eleventyConfig.addFilter('filterLowCounts', (countArray) =>
		countArray.filter(({ count }) => count > 1),
	)

	eleventyConfig.addFilter(
		'getRelatedPosts',
		(posts, currentTags, currentSlug, limit = 2) => {
			const hasSimilarTags = (t) => currentTags.includes(t)
			const tagCounts = (i, v) => (hasSimilarTags(v) ? i + 1 : i)
			return posts
				.filter(({ fileSlug }) => fileSlug !== currentSlug)
				.filter((item) => item.data.tags.some(hasSimilarTags))
				.sort((a, b) => {
					const aCount = a.data.tags.reduce(tagCounts, 0)
					const bCount = b.data.tags.reduce(tagCounts, 0)
					return aCount === bCount ? 0 : aCount < bCount ? 1 : -1
				})
				.slice(0, limit)
		},
	)

	eleventyConfig.addFilter('prependAttachments', (input, attachments) => {
		if (!attachments) {
			return input
		}
		const output = []
		for (const attachment of attachments) {
			if (attachment?.type.indexOf('image') === 0) {
				output.push(
					`<img src="${attachment.url}" alt="${attachment.altText}" />`,
				)
			} else if (attachment?.type.indexOf('video') === 0) {
				output.push(
					`<video aria-label="${attachment.altText}" playsinline="true" controls="true" src="${attachment.url}"></video>`,
				)
			}
		}
		return `${output.join('<br />')}<br />${input}`
	})

	eleventyConfig.addNunjucksFilter(
		'getNewestCollectionItemDate',
		getNewestCollectionItemDate,
	)
	eleventyConfig.addNunjucksFilter('dateToRfc3339', dateRfc3339)
	eleventyConfig.addNunjucksFilter('dateToRfc822', dateRfc822)
}
