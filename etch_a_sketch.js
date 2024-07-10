const container = document.querySelector("#container");
function whenHovering() {
    const allPixels = document.querySelectorAll('.containerGrandchild');
    for (let pixelNumber = 0; pixelNumber < allPixels.length; pixelNumber++) {
        allPixels[pixelNumber].addEventListener('mouseover', () => {
            let currentOpacity = (parseInt(allPixels[pixelNumber].style.opacity*10))/10
            let newOpacity = currentOpacity + .1;
            if (currentOpacity < 1) {
                allPixels[pixelNumber].style.opacity = newOpacity; }
            allPixels[pixelNumber].classList.add('hoveredOver');
        } );
    }

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
    whenHovering();
}

function removeGrid (pixelAmount = Math.sqrt((document.querySelectorAll('.containerGrandchild')).length)) {
    const div = document.querySelectorAll('.containerChild');
    for (let removedDivs = 0; removedDivs < pixelAmount; removedDivs++) {
            container.removeChild(div[removedDivs]); 
        }
    }
createGrid();

function resizeGrid() {
    removeGrid();
    let desiredPixelAmount = prompt('Enter a number from 1 to 100. This will be the number of pixels in each row.', 16);
    if (desiredPixelAmount > 100 || desiredPixelAmount < 1) {
        alert('That is not a number from 1 to 100. The pixel amount has been set to 16 x 16');
        desiredPixelAmount = 16;
    }    
    createGrid(desiredPixelAmount);

}

const resizeGridButton = document.getElementById('resize-button');
resizeGridButton.addEventListener('click', resizeGrid);
// allows users to reset grid without refreshing
const resetGridButton = document.getElementById('reset-button');
resetGridButton.addEventListener('click', () => {
    const allPixels = document.querySelectorAll('.containerGrandchild');
    for (let pixelNumber = 0; pixelNumber < allPixels.length; pixelNumber++) {
            allPixels[pixelNumber].classList.remove('hoveredOver'); 
    }
});