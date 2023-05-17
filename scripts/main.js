const wrapperElement = document.querySelector('.countries-wrapper')

document.addEventListener('DOMContentLoaded', () => {
	document.querySelector('.countries-count').textContent = countries.length

	countries.forEach((country) => {
		const componentElement = document.createElement('div')
		componentElement.classList.add('country-component')

		componentElement.textContent = country
		wrapperElement.appendChild(componentElement)
	})
})

/**
 *      target the filter options (starts with, searching with any word, sort)
 *      target the input
 *      Listen for any keyup, the value will be used for the search
 *      if the filterStartWith is checked then it will use it to filter for whatever country start with what is in the search bar and store it in the result array same goes for filterSearch
 *      if filter sort is clicked it will reverse the output
 */

const filterStartWith = document.querySelector('.starts-with'),
	filterSearch = document.querySelector('.search'),
	filterSort = document.querySelector('.sort'),
	feedback = document.querySelector('.feedback'),
	searchBar = document.querySelector('.input-container input')

filterSort.addEventListener('change', () => {
	sortArray(countries)
	searchBar.value = ''
	feedback.innerHTML = ''
})

function sortArray(arr) {
	if (filterSort.checked) {
		arr.sort(function (a, b) {
			return b.localeCompare(a)
		})

		wrapperElement.innerHTML = ''

		arr.forEach((country) => {
			const componentElement = document.createElement('div')
			componentElement.classList.add('country-component')

			componentElement.textContent = country
			wrapperElement.appendChild(componentElement)
		})
	} else {
		arr.sort(function (a, b) {
			return a.localeCompare(b)
		})

		wrapperElement.innerHTML = ''

		arr.forEach((country) => {
			const componentElement = document.createElement('div')
			componentElement.classList.add('country-component')

			componentElement.textContent = country
			wrapperElement.appendChild(componentElement)
		})
	}
}

searchBar.addEventListener('keyup', (e) => {
	const searchString = e.target.value

	let result = []

	if (filterStartWith.checked) {
		const capitalizeString =
			searchString.charAt(0).toUpperCase() +
			searchString.slice(1).toLowerCase()

		result = countries.filter((country) =>
			country.startsWith(capitalizeString)
		)

		feedback.innerHTML = `Countries starting with
					<span class="alphabet" style="color: ${randomColor};">${searchString}</span> are
					<span class="number" style="color: ${randomColor};">${result.length}</span>`
	} else {
		const findWithAnyWord = new RegExp(searchString, 'gi')

		result = countries.filter((country) => country.match(findWithAnyWord))
		feedback.innerHTML = `Countries containing
					<span class="alphabet" style="color: ${randomColor};">${searchString}</span> are
					<span class="number" style="color: ${randomColor};">${result.length}</span>`
	}

	// check if sort is checked
	sortArray(result)

	if (searchString === '') feedback.innerHTML = ''
})

// generate random color for alphabet and number in the feedback
function generateRandomColorCode() {
	// Generate random values for red, green, and blue components
	var red = Math.floor(Math.random() * 256)
	var green = Math.floor(Math.random() * 256)
	var blue = Math.floor(Math.random() * 256)

	// Construct the color code by combining the components
	var colorCode = `rgb(${red}, ${green}, ${blue})`

	return colorCode
}

const randomColor = generateRandomColorCode()
