const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "100%");
svg.setAttribute("height", "100%");
svg.innerHTML = `<path d="M10,10 L50,10 L50,50 Z" fill="lightblue" stroke="black"/>`; // Example path
document.body.appendChild(svg);

const canvas = document.getElementById("map-canvas");
const gl = canvas.getContext("webgl");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// let scale = 1;
// let offsetX = 0;
// let offsetY = 0;

// function draw() {
//   gl.clearColor(0.9, 0.9, 0.9, 1.0);
//   gl.clear(gl.COLOR_BUFFER_BIT);

//   gl.viewport(offsetX, offsetY, canvas.width * scale, canvas.height * scale);

//   // Render points
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   const positions = [];
//   points.forEach(({ x, y }) => {
//     const transformedX = (x - canvas.width / 2) * scale + canvas.width / 2 + offsetX;
//     const transformedY = (y - canvas.height / 2) * scale + canvas.height / 2 + offsetY;
//     positions.push(
//       transformedX / canvas.width * 2 - 1,
//       transformedY / canvas.height * -2 + 1
//     );
//   });
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//   gl.drawArrays(gl.POINTS, 0, points.length);

//   // Render paths (if you have line data)
//   if (paths) {
//     const pathPositions = [];
//     paths.forEach(({ x1, y1, x2, y2 }) => {
//       const transformedX1 = (x1 - canvas.width / 2) * scale + canvas.width / 2 + offsetX;
//       const transformedY1 = (y1 - canvas.height / 2) * scale + canvas.height / 2 + offsetY;
//       const transformedX2 = (x2 - canvas.width / 2) * scale + canvas.width / 2 + offsetX;
//       const transformedY2 = (y2 - canvas.height / 2) * scale + canvas.height / 2 + offsetY;

//       pathPositions.push(
//         transformedX1 / canvas.width * 2 - 1,
//         transformedY1 / canvas.height * -2 + 1,
//         transformedX2 / canvas.width * 2 - 1,
//         transformedY2 / canvas.height * -2 + 1
//       );
//     });
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pathPositions), gl.STATIC_DRAW);
//     gl.drawArrays(gl.LINES, 0, pathPositions.length / 2);
//   }
// }

canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const zoomFactor = 1.1;
  scale *= e.deltaY > 0 ? 1 / zoomFactor : zoomFactor;
  // draw(); // Redraw with updated scale
});

canvas.addEventListener("mousedown", (e) => {
  let startX = e.clientX;
  let startY = e.clientY;

  const onMouseMove = (e) => {
    offsetX += e.clientX - startX;
    offsetY += e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;
    // draw(); // Redraw with updated offset
  };

  const onMouseUp = () => {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
  };

  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mouseup", onMouseUp);
});

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
		.defer(d3.json, '../data/SanFrancisco.Neighborhoods.json')
		.await(ready)

	let projection = d3.geoAlbersUsa()
		.translate([width / 2, height / 2])
		.scale(1000)

	let path = d3.geoPath().projection(projection)

	function ready(error, data) {
		console.log(data.features);
		let neighborhoods = topojson.feature(data, data.geometry).features;
		
		// console.log(data);

		// console.log(topojson.feature(data, data.geometry)).features;


		// console.log(neighborhoods);
		// let states = topojson.feature(data, data.objects.states).features;

		// svg.selectAll('.state')
		// 	.data(states)
		// 	.enter()
		// 	.append('path')
		// 	.attr('class', 'state')
		// 	.attr('d', path)
		// 	.on('click', (event) => {
		// 		selectedState.textContent = event.properties.name;
		// 		filterData(event.properties.name);
		// 	})
	}
})();