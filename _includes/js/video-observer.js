if (window.IntersectionObserver) {
	const shouldReduceMotion =
		window.matchMedia('(prefers-reduced-motion: reduce)').matches === true
	const videos = document.querySelectorAll('video')

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (shouldReduceMotion) {
				entry.target.pause()
			} else {
				if (entry.isIntersecting) {
					entry.target.play()
				} else {
					entry.target.pause()
				}
			}
		}
	})

	for (const video of videos) {
		if (shouldReduceMotion) {
			video.pause()
		} else {
			observer.observe(video)
		}
	}
}
