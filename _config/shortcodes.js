import {
	buildOpenGraphImage,
	buildOpenGraphVideo,
	buildOptimizedImage,
} from './utils.js'

export default function (eleventyConfig) {
	eleventyConfig.addShortcode('optimizeImage', async (src) => {
		return await buildOptimizedImage(src)
	})

	eleventyConfig.addShortcode('ogImage', async (src) => {
		if (typeof src === 'string') {
			return await buildOpenGraphImage(src)
		}
		const output = []
		for (const attachment of src) {
			if (attachment.type.indexOf('image') === 0) {
				output.push(
					await buildOpenGraphImage(
						attachment.url.replace('./', './content/p/'),
					),
				)
			} else if (attachment.type.indexOf('video') === 0) {
				output.push(buildOpenGraphVideo(attachment))
			}
		}
		return output.join('\n')
	})
}
