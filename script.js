'use strict'
const imageContainer = document.querySelector('#image-container')
const loader = document.querySelector('#loader')

let isReady = false
let imagesLoaded = 0
let totalImages = 0

const showLoader = () => {
	loader.classList.remove('hidden')
}

const hideLoader = () => {
	loader.classList.add('hidden')
}

// Check if all images were loaded
const imageLoaded = () => {
	imagesLoaded++
	if (imagesLoaded === totalImages) {
		isReady = true
	}
}

const displayPhotos = (array) => {
	totalImages += array.length
	if (array.length) {
		array.forEach(photo => {
			const imageLink = document.createElement('a')
			const imageElement = document.createElement('img')
			imageElement.src = photo.urls.regular
			imageElement.alt = photo.alt_description
			imageElement.title = photo.alt_description
			imageLink.href = photo.links.html
			imageLink.target = '_blank'

			imageElement.addEventListener('load', imageLoaded)

			imageLink.append(imageElement)
			imageContainer.append(imageLink)
		})
	}
}

// Unsplash API
const API_BASE = 'https://api.unsplash.com'
const API_KEY = 'eGlrheUFjb2pimroY65g49rBEnm9SNyBs-OsUFLfqh0'
const IMAGE_COUNT = 30
const apiUrl = `${API_BASE}/photos/random/?client_id=${API_KEY}&count=${IMAGE_COUNT}`

// Get photos from Unsplash API
const getPhotos = async () => {
	showLoader()
	try {
		const res = await fetch(apiUrl)
		const data = await res.json()
		displayPhotos(data)
	} catch (error) {
		console.error(error.message)
	} finally {
		hideLoader()
	}
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && isReady) {
		isReady = false
		getPhotos()
	}
})

getPhotos()