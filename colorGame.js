let colors = generateRandomColors(6);
let squares = document.querySelectorAll('.grid-item');
let pickedColor = pickColor();
let colorDisplay = document.querySelector('#colorDisplay');
let guessTitle = document.querySelector('#guessTitle');
let successMessage = document.querySelector('#successMessage');
let header = document.querySelector('header');
let resetButton = document.querySelector('#reset');
let bodyColor = document.querySelector('body').style.backgroundColor;
let difficultyButton = document.querySelectorAll('.difficulty');

let numberOfSquares = 6;

// Easy hard 
for (let i=0;i<2;i++) {
    difficultyButton[i].addEventListener('click',function(){
        difficultyButton[1].classList.toggle('selected');
        difficultyButton[0].classList.toggle('selected');
        
            // If clicked easy
            if (this === difficultyButton[0]) {
                numberOfSquares = 3;
                setUpGame(numberOfSquares);
                for (let i=0;i<squares.length;i++) {
                    if(colors[i]) {
                        squares[i].style.backgroundColor=colors[i];
                    }
                    else {
                        squares[i].classList.add('hidden');
                    }
                };
            }

            // If clicked hard
            else{
                numberOfSquares = 6;
                setUpGame(numberOfSquares);
                for (let i=0;i<squares.length;i++) {
                    if(colors[i]) {
                        squares[i].style.backgroundColor=colors[i];
                        squares[i].classList.remove('hidden');
                    }
                };
            }
        });
    };       
        

// resetButton mechanisms
resetButton.addEventListener('click',function(){
    setUpGame(numberOfSquares)
});

colorDisplay.textContent = pickedColor;
// Square mechanisms
for (let i = 0; i<squares.length; i++) {

    // Add initial color to squares
    squares[i].style.backgroundColor = colors[i];

    // Add click listeners
    squares[i].addEventListener('click',function(){
        // Grab color of clicked square
        let clickedColor = this.style.backgroundColor;
        // Compare color with pickedcolor
        if (clickedColor===pickedColor) {
            successMessage.textContent='Correct!'
            guessTitle.textContent=`You guessed right!`;
            // Change color of all squares to the pickedColor
            for (let i = 0; i<squares.length; i++) {
            squares[i].style.backgroundColor=pickedColor};
            header.style.backgroundColor = pickedColor;
            resetButton.textContent = "Play Again?";
            
           
        }
        else{
            this.style.backgroundColor=bodyColor;
            successMessage.textContent='Try again';
        }
        
    });
};

// Set colors from the array to all the squares
function setColors () {
    for (let i = 0; i<squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
}};

// Select random color from the array
function pickColor () {
   let random = Math.floor(Math.random() * colors.length)
   return colors[random];
};

// Generate random color array based on input
function generateRandomColors(num) {
    let arr =[];
    for (let i = 0; i<num; i++) {
        arr.push(randomColor())
    }
    return arr;
};

// Generate a random color.
function randomColor() {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);

    return `rgb(${red}, ${green}, ${blue})`;
};


// SetUp game
function setUpGame(num) {
     // generate new colors
     colors = generateRandomColors(num);
     // pick new colors from array
    pickedColor = pickColor();
    // Changes on the page
    colorDisplay.textContent = pickedColor;
    header.style.backgroundColor = bodyColor;
    setColors();
    // Reset wording of resetButton & successMessage
    resetButton.textContent = "New colors";
    successMessage.textContent='';
    guessTitle.textContent = 'You need to guess:'
}