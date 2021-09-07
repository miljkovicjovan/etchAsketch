let grid =  document.getElementById('container');

// the function that creates the grid and add each "square" spot
createGrid = () => {
    // appending in each grid box a single square (32x32=1024)
    for (let i = 0; i < 1024; i++) { // this is the default value
      const div = document.createElement("div");
      div.classList.add("square"); // add the square styling
      grid.appendChild(div); // append to each spot
    }
};

// target the square element inside each grid spot
const square = document.querySelector("div");
// on mouseover change the styling from square to color
square.addEventListener("mouseover", function(event) {
  event.target.classList.replace("square", "color");
});

// create the grid and start the program
createGrid();


// -------- SHAKE FUNCTIONALITY --------
let shake = document.getElementById('shake');

shake.addEventListener('click', e => {
  grid.innerHTML = ""; // empty the grid
  createGrid(); // call the function as in default
});