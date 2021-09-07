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

// -------- ETCH A SKETCH --------

// object with color modes
const Modes = Object.freeze({
  normal: "normal",
  colors: "colors",
  greyscale: "greyscale",
});

function EtchASketch() {
  const SIDE_LENGTH = 560;

  // default values
  let cellsPerRow = 10;
  let mountedAt;
  let grid;
  let mode = Modes.normal;

  // when the mode is normal style the cell to have color black
  function getNormalModeListener(cell) {
    return function () {
        cell.style.backgroundColor = "black";
    }
  }

  // when the mode is random style the cell to have a random color generated from the randomRGBVal
  function getColorsModeListener(cell) {
    function randomRGBVal() {
        return Math.floor(Math.random() * 256);
    }
    return function () {
        const red = randomRGBVal();
        const green = randomRGBVal();
        const blue = randomRGBVal();

        cell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }
  }

  // when the mode is greyscale style the cell to have a black color and each time it is passed a little opacity is added on top 
  function getGreyscaleModeListener(cell) {
    let opacity = 0;
    return function () {
        opacity += 0.1;
        cell.style.backgroundColor = "black";
        cell.style.opacity = opacity;
    }
  }

  // function that creates the grid and allows the functions
  function createDomGrid() {
    grid = document.createElement('div');
    grid.setAttribute('id', 'grid');

    for (let i = 0; i < cellsPerRow; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < cellsPerRow; j++) {
            const cell = document.createElement('div');
            const cellSideLength = `${(SIDE_LENGTH / cellsPerRow).toFixed(1)}px`;

            cell.classList.add('grid-cell');
            cell.style.width = cellSideLength;
            cell.style.height = cellSideLength;

            let listener = getNormalModeListener(cell);

            switch (mode) {
                case Modes.normal:
                listener = getNormalModeListener(cell);
                break;
                case Modes.colors:
                listener = getColorsModeListener(cell);
                break;
                case Modes.greyscale:
                listener = getGreyscaleModeListener(cell);
                break;
            }

            cell.addEventListener('mouseenter', listener);

            row.append(cell);
        }
        grid.append(row);
    }
  }

  const reset = (function () {
    grid.remove();
    createDomGrid();
    this.mount(mountedAt);
  }).bind(this);

  this.changeMode = function (newMode) {
    mode = newMode;
    reset();
  }

  this.mount = function (selector) {
    mountedAt = selector;
    document.querySelector(selector).append(grid);
  }

  this.shake = function () {
    cellsPerRow = prompt('How many cells per side?');
    reset();
  }

  createDomGrid();
}

let etchASketch = new EtchASketch();
etchASketch.mount('#container');

document.querySelector('#shake').addEventListener('click', () => {
  etchASketch.shake();
});

document.querySelector('#resize').addEventListener('click', () => {
  etchASketch.shake();
});

document.querySelector('#normal').addEventListener('click', () => {
  etchASketch.changeMode(Modes.normal);
})

document.querySelector('#random').addEventListener('click', () => {
  etchASketch.changeMode(Modes.colors);
})

document.querySelector('#monochrome').addEventListener('click', () => {
  etchASketch.changeMode(Modes.greyscale);
})