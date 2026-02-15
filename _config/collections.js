import metadata from '../_data/metadata.js'
import { byDate, chunk, hasTags } from './utils.js'

function paginateMappedCollection(mappedCollection) {
	const pages = []
	for (const name of Object.keys(mappedCollection)) {
		const pagedItems = chunk(mappedCollection[name], metadata.pageSize)
		for (let currentPage = 0; currentPage < pagedItems.length; currentPage++) {
			pages.push({
				name,
				currentPage,
				totalPages: pagedItems.length,
				items: pagedItems[currentPage],
			})
		}
	}
	return pages
}

export default function (eleventyConfig) {
	eleventyConfig.addCollection('tagPages', (collection) => {
		const taggedPosts = collection.items.filter(hasTags).sort(byDate)
		const mappedCollection = {}
		for (const post of taggedPosts) {
			const tags = post.data.tags
			for (const tag of tags) {
				if (metadata.hiddenTags.indexOf(tag) === -1) {
					if (!mappedCollection[tag]) {
						mappedCollection[tag] = []
					}
					mappedCollection[tag].push(post)
				}
			}
		}

		return paginateMappedCollection(mappedCollection)
	})
}
