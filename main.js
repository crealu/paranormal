function filterData(arr) {
	for (let i = 0; i < arr.length; i++) {
		// if the item's state property is Michigan, add the location to the page
		if (arr[i].state == 'Michigan') {
			let stateName = document.createElement('p');
			stateName.textContent = arr[i].location;
			document.body.appendChild(stateName);
		}
	}
}

fetch('/places')
	.then(res => res.json())
	.then(data => {
		// console.log(data);
		filterData(data.places);
	})
	.catch(err => { console.log(err) })

const apiKey = 'ca0900d4946b49d0a6a0fc1ba6e9dc68';
let lat = '42.5189621';
let lon = '-74.1361243';
let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`
// string template literal

fetch(url)
	.then(res => res.json())
	.then(data => {
		// dot notation to destructure
		let entity = data.features[0].properties.state;
		console.log(entity);
		// document.body.innerHTML = entity;
	});

// built in method getCurrentPosition
// navigator.geolocation.getCurrentPosition((pos) => {
	// document.body.innerHTML = pos.coords;
	// console.log(pos.coords);
// });

