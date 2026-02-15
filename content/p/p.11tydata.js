import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

export default {
	layout: 'layouts/post.njk',
	tags: ['posts'],
	eleventyDataSchema: (data) => {
		const result = z
			.object({
				date: z.date(),
				tags: z.string().array().min(1),
			})
			.safeParse(data)

		if (result.error) {
			throw fromZodError(result.error)
		}
	},
}
