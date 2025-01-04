const firstnumber = document.getElementById('firstnumber')
const secondnumber = document.getElementById('secondnumber')
const numberspeed = document.getElementById('numberspeed')

const additionOp = document.getElementById('additionOp')
const subtractionOp = document.getElementById('subtractionOp')
const multiplicationOp = document.getElementById('multiplicationOp')
const divisionOp = document.getElementById('divisionOp')

const opRightContainer = document.querySelector('.op-right')

const expression = document.getElementById('expre')
const container = document.getElementById('container')

let rangFrom = 1;
let randTo = 9;
let speed = 40;
let speedBandWidth = 60;
let operations = [["additionOp",false],["subtractionOp",false],["multiplicationOp",false],["divisionOp",false]];
let activeOperations = []
let currentop = 0;
let isExpressionActive = false;


function resetValues() {
    firstnumber.value = rangFrom;
    secondnumber.value = randTo;
    additionOp.checked = true;

    operations[0][1] = true;
    currentop = 1;
    activeOperations.push(0)
    numberspeed.value = 100 - speed;
}

function operationCheck(index,event) {    
    if(currentop == 1 && operations[index][1] == true) {
        event.target.checked = true;
    }else {
        if(event.target.checked == true) {
            currentop++;
            operations[index][1] = true;
            activeOperations.push(index)
        }else {
            currentop--;
            operations[index][1] = false;

            let deleVal = activeOperations.indexOf(index)
            if(deleVal !== -1)
                activeOperations.splice(deleVal,1);
        }
    }
    // console.log(currentop,activeOperations, operations)

}

function getRangeNumber() {
    let a = rangFrom;
    let b = randTo;
    firstnumber.addEventListener('input', (event) => {
        a = Number(event.target.value);

        if(a >= b) {
            firstnumber.style.borderColor = "red";
            secondnumber.style.borderColor = "red";
        }else {
            firstnumber.style.borderColor = "white";
            secondnumber.style.borderColor = "white";
    
            rangFrom = a;
        }
        // console.log(rangFrom, randTo)
    })

    secondnumber.addEventListener('input', (event) => {
        b = Number(event.target.value);

        if(a >= b) {
            firstnumber.style.borderColor = "red";
            secondnumber.style.borderColor = "red";
        }else {
            firstnumber.style.borderColor = "white";
            secondnumber.style.borderColor = "white";
    
            randTo = b;
        }

        // console.log(rangFrom, randTo)
    })
}

function getSpeeds() {
    numberspeed.addEventListener('change', (event) => {
        let range = Number(event.target.value);

        // converting in milisecond
        speed = (range) * (speedBandWidth/100);

        // convert speed in range formate
        speed = (speedBandWidth-speed + 3);

        speed = Number(speed.toFixed(2))
        // console.log(speed)
    })
}

function getOperations() {
    additionOp.addEventListener('click', (event) => {
        operationCheck(0,event)
        // console.log(operations)
    })
    subtractionOp.addEventListener('click', (event) => {
        operationCheck(1,event)
        // console.log(operations)
    })
    multiplicationOp.addEventListener('click', (event) => {
        operationCheck(2,event)
        // console.log(operations)
    })
    divisionOp.addEventListener('click', (event) => {
        operationCheck(3,event)
        // console.log(operations)
    })
}





function generateCircult(result) {
    let left = Math.floor(Math.random() * (container.scrollWidth - 70));
    const ele = document.createElement('div');
    ele.classList.add('result-box');
    ele.style.animationDuration = `${Math.max(speed, 0.5)}s`; // Minimum animation duration
    ele.innerHTML = result;
    ele.style.left = `${left}px`;
    ele.style.backgroundColor = `rgb(${Math.floor(Math.random() * 200) + 50},${Math.floor(Math.random() * 200) + 10},${Math.floor(Math.random() * 200) + 10})`;
    // ele.style.backgroundColor = lightRGBColors[Math.floor(Math.random() * lightRGBColors.length)]
    container.appendChild(ele);

    setTimeout(() => {
        if (container.contains(ele)) {
            container.removeChild(ele);
        }
    }, (speed+10) * 1000); // Remove element
}

function generateNumbers() {
    let first = Math.floor(Math.random()*(randTo-rangFrom) + rangFrom);
    let second = Math.floor(Math.random()*(randTo-rangFrom) + rangFrom);
    let op = activeOperations[Math.floor(Math.random()*activeOperations.length)]

    // console.log(op)
    let result = 0;


    if(op == 0) {
        result = first + second;
        expression.textContent = `${first} + ${second}`
    }else if(op == 1) {
        result = first - second;
        expression.textContent = `${first} - ${second}`
        
    }else if(op == 2){
        result = first * second;
        expression.textContent = `${first} * ${second}`
        
    }else if(op == 3){
        result = first / second;
        expression.textContent = `${first} / ${second}`

    }

    return result;
}

let counting = 0;
let expressionResult;
function startGame() {
    let result = 0;
    let setTime = Date.now()
    let intervalId = null;
    generateCircult(Math.floor(Math.random()*(randTo) + rangFrom))
    if (!intervalId) {
        intervalId = setInterval(() => {
            if(!isExpressionActive){
                result = generateNumbers();
                expressionResult = result;
                isExpressionActive = true;
            }else {
                result = Math.floor(Math.random()*(randTo) + rangFrom);
            }


            if(Date.now() - setTime >= 10000) {
                setTime = Date.now();
                result = expressionResult;
                // console.log(result)
            }
    
            generateCircult(result)
        }, 2000); 
    }

}


const wonAudio = document.querySelector('#wonAudio');
container.addEventListener('click', (event) => {
    // console.log(event.target)
    if(event.target.classList.contains('result-box')){

        if(event.target.innerHTML === String(expressionResult)){
            counting++;
            container.removeChild(event.target)
            isExpressionActive = false;

            expression.textContent = `---`;
            document.getElementById('count').textContent = `Count: ${counting}`;
            wonAudio.currentTime = 0;
            wonAudio.play()

            generateCircult(Math.floor(Math.random()*(randTo) + rangFrom))

        }else{
            if(counting > 0) {
                counting--;
                document.getElementById('count').textContent = `Count: ${counting}`;
            }
        }
    }
})


getRangeNumber()
resetValues()
getSpeeds()
getOperations()



startGame()

