let grid =  document.getElementById('container');

// the function that creates the grid and add each "square" spot
createGrid = (cells) => {
    // appending in each grid box a single square (32x32=1024)
    for (let i = 0; i < cells * cells; i++) { // this is the default value
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
createGrid(32);


// -------- SHAKE FUNCTIONALITY --------
let shake = document.getElementById('shake');

shake.addEventListener('click', e => {
  grid.innerHTML = ""; // empty the grid
  grid.style.setProperty("grid-template-columns", `repeat(32, 2fr)`); // change the styling of the grid
  grid.style.setProperty("grid-template-rows", `repeat(32, 2fr)`);
  createGrid(32); // call the function as in default
});


// -------- RESIZE FUNCTIONALITY --------
let resize = document.getElementById('resize');

resize.addEventListener('click', e => {
  grid.innerHTML = ""; // empty the grid
  let cells  = prompt("How many cells do you want per side?"); // promt the user for input
  grid.style.setProperty("grid-template-columns", `repeat(${cells}, 2fr)`); // change the styling of the grid
  grid.style.setProperty("grid-template-rows", `repeat(${cells}, 2fr)`);
  createGrid(cells);
});


// -------- DROPDOWN MENU --------
// to open the dropdown menu
function openDropdown() {
  document.getElementById('myDropdown').classList.toggle('show'); //change the styling to the show class 
}

// when user clicks outside of the dropdown menu -> collapse it
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}