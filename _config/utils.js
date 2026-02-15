import Image from '@11ty/eleventy-img'
import metadata from '../_data/metadata.js'

export const hasTags = (p) => !!p.data.tags
export const hasLink = (p) => !!p.data.link

export const uniq = (arr) => [...new Set(arr)]

export const chunk = (arr, chunkSize = 1, cache = []) => {
	const tmp = [...arr]
	if (chunkSize <= 0) return cache
	while (tmp.length) cache.push(tmp.splice(0, chunkSize))
	return cache
}

export const byCount = (a, b) => b.count - a.count
export const byDate = (a, b) =>
	new Date(b.page.date).valueOf() - new Date(a.page.date).valueOf()

export const countKeys = (data) =>
	Object.keys(data)
		.map((key) => ({ key, count: data[key] }))
		.sort(byCount)

export const buildOptimizedImage = async (path) => {
	const m = await Image(path, {
		widths: [1200],
		formats: ['jpeg'],
		outputDir: './_site/img/',
	})
	const data = m.jpeg[m.jpeg.length - 1]
	return `${metadata.url}${data.url}`
}

export const buildOpenGraphImage = async (path) => {
	const m = await Image(path, {
		widths: [1200],
		formats: ['jpeg'],
		outputDir: './_site/img/',
	})
	const data = m.jpeg[m.jpeg.length - 1]
	return `<meta property="og:image:height" content="${data.height}">
	<meta property="og:image:width" content="${data.width}">
	<meta property="og:image" content="${metadata.url}${data.url}">`
}

export const buildOpenGraphVideo = (attachment) => {
	return `<meta property="og:video:type" content="${attachment.type}" />
	<meta property="og:video:url" content="${attachment.url.replace(
		'./',
		`${metadata.url}/p/`,
	)}" />`
}
