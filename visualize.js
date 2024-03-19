// iife - immediately invoked function expression
let selectedState = document.getElementById('selected-state');
let placesHere = document.getElementById('places-here');
let places;

function filterData(stateName) {
	while (placesHere.firstChild) {
		placesHere.removeChild(placesHere.firstChild);
	}
	
	for (let i = 0; i < places.length; i++) {
		if (places[i].state == stateName) {
			let infoElement = document.createElement('p');
			infoElement.textContent = places[i].location + ' ' + places[i].city;
			placesHere.appendChild(infoElement);
		}
	}
}

async function getPlaces() {
	await fetch('/places')
		.then(res => res.json())
		.then(data => {
			places = data.places;
		})
		.catch(err => { console.log(err) })
}

getPlaces();

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
		.defer(d3.json, 'topo.json')
		.await(ready)

	let projection = d3.geoAlbersUsa()
		.translate([width / 2, height / 2])
		.scale(1000)

	let path = d3.geoPath()
		.projection(projection)

	function ready(error, data) {
		console.log(data);
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
			})
	}
})();

function get4() {
	return {num: 4}
}

console.log(get4().num);
