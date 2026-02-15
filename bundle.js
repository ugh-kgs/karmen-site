
class KeyDown extends HTMLElement {
	static tagName = 'key-down'
	static actions = {
		click: 'click',
		focus: 'focus',
	}

	static register(
		tagName = KeyDown.tagName,
		registry = globalThis.customElements,
	) {
		registry?.define(tagName, KeyDown)
	}

	connectedCallback() {
		const key = this.getAttribute('data-key')
		const action = this.getAttribute('data-action')
		const scroll = this.getAttrBool('data-scroll')
		const rules = {
			altKey: this.getAttrBool('data-altKey'),
			ctrlKey: this.getAttrBool('data-ctrlKey'),
			metaKey: this.getAttrBool('data-metaKey'),
			shiftKey: this.getAttrBool('data-shiftKey'),
		}
		this.listener = (e) => {
			const target = e.target
			const targetType = target?.tagName?.toLowerCase()
			const contentEditableAttr = target?.getAttribute('contenteditable')
			if (
				targetType === 'input' ||
				targetType === 'textarea' ||
				contentEditableAttr === '' ||
				contentEditableAttr === 'true' ||
				contentEditableAttr === 'plaintext-only' ||
				!this.checkRules(e, rules)
			) {
				return
			}
			if (e.key === key) {
				e.preventDefault()
				for (const child of this.children) {
					if (scroll) {
						child?.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
						})
					}
					switch (action) {
						case KeyDown.actions.focus:
							child?.focus()
							break
						default:
							child?.click()
					}
				}
			}
		}
		window.addEventListener('keydown', this.listener)
	}

	disconnectedCallback() {
		window.removeEventListener('keydown', this.listener)
	}

	getAttrBool(d) {
		const value = this.getAttribute(d)
		return value === 'true' ? true : value === 'false' ? false : undefined
	}

	checkRules(e, definedRules) {
		const currentModifiers = {
			altKey: e.altKey,
			ctrlKey: e.ctrlKey,
			metaKey: e.metaKey,
			shiftKey: e.shiftKey,
		}
		return Object.entries(definedRules).every(
			([ruleName, currentRuleValue]) => {
				if (currentRuleValue !== undefined) {
					const currentModifierValue = currentModifiers[ruleName]
					return currentRuleValue === currentModifierValue
				}
				return true
			},
		)
	}
}
KeyDown.register()

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

