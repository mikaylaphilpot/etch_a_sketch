const container = document.querySelector("#container");

function whenHovering(desiredColor='black') {
    const allPixels = document.querySelectorAll('.containerGrandchild');
    for (let pixelNumber = 0; pixelNumber < allPixels.length; pixelNumber++) {
        allPixels[pixelNumber].addEventListener('mouseover', () => {
            allPixels[pixelNumber].classList.add('hoveredOver');
            let currentOpacity = (parseInt(allPixels[pixelNumber].style.opacity*10))/10
            let newOpacity = currentOpacity + .1;
            if (currentOpacity < 1) {
                allPixels[pixelNumber].style.opacity = newOpacity; }
            if (desiredColor !== 'black') {
                desiredColor = randomRGBColors();
                allPixels[pixelNumber].style.backgroundColor = desiredColor; 
            }
            else {
                allPixels[pixelNumber].style.backgroundColor = desiredColor; 
            }
        });
        };
};

function randomRGBColors() {
    let firstRandomNumber = Math.floor((Math.random())*255);
    let secondRandomNumber = Math.floor((Math.random())*255);
    let thirdRandomNumber = Math.floor((Math.random())*255);
    let RGBColor = 'rgb(' + firstRandomNumber + ',' + secondRandomNumber + ',' + thirdRandomNumber + ')';
    return RGBColor;
}

// pixel amount should actually be the square root of the amount of pixels desired
function createGrid(pixelAmount = 16) {
    for (let createdDivs = 0; createdDivs < pixelAmount; createdDivs++) {
        const div = document.createElement("div");
        container.appendChild(div);
        div.setAttribute('class', 'containerChild');
        //nested for loops caused performance issues
        let moreCreatedDivs = 0;
        while(moreCreatedDivs < pixelAmount) {
            const anotherDiv = document.createElement("div");
            div.appendChild(anotherDiv);
            moreCreatedDivs++;
            anotherDiv.setAttribute('class', 'containerGrandchild');
            anotherDiv.textContent ='';
        }
    }
}

function removeGrid (pixelAmount = Math.sqrt((document.querySelectorAll('.containerGrandchild')).length)) {
    const div = document.querySelectorAll('.containerChild');
    for (let removedDivs = 0; removedDivs < pixelAmount; removedDivs++) {
            container.removeChild(div[removedDivs]); 
        }
    }

function resizeGrid() {
    removeGrid();
    let desiredPixelAmount = prompt('Enter a number from 1 to 100. This will be the number of pixels in each row.', 16);
    if (desiredPixelAmount > 100 || desiredPixelAmount < 1) {
        alert('That is not a number from 1 to 100. The pixel amount has been set to 16 x 16');
        desiredPixelAmount = 16;
    }    
    createGrid(desiredPixelAmount);
    whenHovering();
}

const resizeGridButton = document.getElementById('resize-button');
resizeGridButton.addEventListener('click', resizeGrid);
// allows users to reset grid without refreshing
const resetGridButton = document.getElementById('reset-button');
resetGridButton.addEventListener('click', () => {
    let previousDivAmount = (Math.sqrt(document.querySelectorAll('.containerGrandchild').length));
    removeGrid();
    createGrid(previousDivAmount);
    whenHovering();
});

const randomizeColorButton = document.getElementById('randomize-color');
randomizeColorButton.addEventListener('click', () => { 
    let desiredColor = 'random';
    let previousDivAmount = (Math.sqrt(document.querySelectorAll('.containerGrandchild').length));
    console.log(previousDivAmount);
    removeGrid();
    createGrid(previousDivAmount);
    whenHovering(desiredColor);
});

createGrid();
whenHovering();