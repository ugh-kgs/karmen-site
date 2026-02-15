class ShareButton extends HTMLElement {
	static register(tagName = 'share-btn', registry = globalThis.customElements) {
		registry?.define(tagName, ShareButton)
	}

	constructor() {
		super()
		const { url } = this.dataset
		const canShare = navigator.share !== undefined
		const button = this.querySelector('button')
		const link = this.querySelector('a')

		if (canShare) {
			link?.classList.toggle('hidden')
			button?.classList.toggle('hidden')
		}
		button?.addEventListener('click', () => {
			navigator.share({ url })
		})
	}
}
ShareButton.register()
