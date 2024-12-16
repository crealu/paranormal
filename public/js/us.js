// iife - immediately invoked function expression
let map = document.getElementById('map');
let selectedState = document.querySelector('.selected-state');
let placesHere = document.querySelector('.places-here');
let placeElement = document.querySelector('.place');
let pageCenter = [innerWidth / 2, innerHeight / 2];
let locations = [];
let places;
let activeLocation = '';

let count = 0;

function toggleDetails(element) {
	if (element.style.display == 'block') {
		element.style.display = 'none';
	} else {
		element.style.display = 'block';
	}
}

function handleInfoClick(event) {
	let el;

	if (event.target.classList[0] == 'info-top') {
		el = event.target.nextSibling;
	}  else if (event.target.classList[0] == 'info-element') {
		el = event.target.children[1];
	} else if (event.target.classList[0] == 'info-bottom') {
		el = event.target;
	} else {
		el = event.target.parentNode.nextSibling;
	}

	toggleDetails(el);
}

function openGoogleMaps(address) {
	const encodedAddress = encodeURIComponent(address);
	const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
	window.open(mapsUrl, '_blank');
}

function createLocationItem(place) {
	locations.push(place);
	let infoElement = document.createElement('div');
	infoElement.classList.add('info-element');

	let infoTop = document.createElement('div');
	infoTop.classList.add('info-top');

	let locationName = document.createElement('p');
	locationName.textContent = place.location;

	let cityName = document.createElement('p');
	cityName.textContent = place.city;

	let infoBottom = document.createElement('div');
	infoBottom.classList.add('info-bottom');
	infoBottom.textContent = place.description;

	let mapLink = document.createElement('button');
	mapLink.classList.add('map-link');
	mapLink.textContent = 'Open in Google Maps';

	mapLink.addEventListener('click', (event) => {
		const address = `${place.location} ${place.city} ${place.state}`;
		openGoogleMaps(address);
	});

	infoBottom.appendChild(mapLink);
	infoTop.appendChild(locationName);
	infoTop.appendChild(cityName);
	infoElement.appendChild(infoTop);
	infoElement.appendChild(infoBottom);

	infoElement.addEventListener('click', handleInfoClick);
	count++;

	return infoElement;
}

// function openGoogleMaps(address) {
//     // Encode the address to make it URL-safe
//     const encodedAddress = encodeURIComponent(address);

//     // Construct the Google Maps URL
//     const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

//     // Open the URL in a new tab
//     window.open(mapsUrl, '_blank');
// }

function filterData(stateName) {
	count = 0;
	while (placesHere.firstChild) {
		placesHere.removeChild(placesHere.firstChild);
	}
	
	for (let i = 0; i < places.length; i++) {
		if (places[i].state == stateName) {
			const element = createLocationItem(places[i]);
			placesHere.appendChild(element);
		}
	}
}

function resetActive(target) {
	const activeState = document.getElementsByClassName('active-state')[0];
	if (activeState) {
		activeState.classList.remove('active-state');
		target.classList.add('active-state');
	}
}

(function() {
	let height = 540;
	let width = window.innerWidth;

	let svg = d3.select('#map')
		.append('svg')
		.attr('height', height)
		.attr('width', width)
		.append('g')
		.attr('transform', 'translate(0, 0)')

	d3.queue()
		.defer(d3.json, '../data/topo.json')
		.await(ready)

	let projection = d3.geoAlbersUsa()
		.translate([width / 2, height / 2])
		.scale(1000)

	let path = d3.geoPath().projection(projection)

	function ready(error, data) {
		let states = topojson.feature(data, data.objects.states).features;

		svg.selectAll('.state')
			.data(states)
			.enter()
			.append('path')
			.attr('class', 'state')
			.attr('d', path)
			.on('click', (event) => {
				selectedState.textContent = event.properties.name;
				filterData(event.properties.name);
				resetActive();
			});
	}
})();

async function getPlaces() {
	await fetch('/places')
		.then(res => res.json())
		.then(data => { places = data.places; })
		.catch(err => { console.log(err) })
}

function handleClick(event) {
	if (event.target.classList[0] == 'state') {
		// const mapRect = map.getBoundingClientRect();
		const g = document.getElementsByTagName('g')[0];
		resetActive(event.target);

		const rect = g.getBoundingClientRect(); // Get SVG's bounding box in screen coordinates

    // Mouse click position relative to the SVG
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // // Center of the SVG viewport
    const centerX = rect.width / 4;
    const centerY = rect.height / 1.5;

    // Calculate the translation needed to move the clicked point to the center
    const dx = centerX - clickX;
    const dy = centerY - clickY;

    // Apply the translation to the <g> element
    const transform = `translate(${dx}, ${dy}) scale(1.75)`;
    g.setAttribute("transform", transform);
	}
}

function handleKeyDown(event) {
	if (event.key == 'r') {
		let g = document.getElementsByTagName('g')[0];
		g.style.transform = 'translate(0px, 0px) scale(1)';
	}
}

function handleLoad() {
	getPlaces();
}

window.addEventListener('click', handleClick);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('load', handleLoad);
