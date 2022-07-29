(function(){
    const canvas = document.querySelector('.field');
    const ctx = canvas.getContext("2d");

    const menu = document.querySelector('.menu');
    const ui = document.querySelector('.game-ui');
    const score = document.querySelector('.game-score');
    const timer = document.querySelector('.game-timer');

    const fieldCellSize = 50;
    const cellsCountX = canvas.width / fieldCellSize;
    const cellsCountY = canvas.height / fieldCellSize;

    const shapes = [
        [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
        [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}]
    ]
    let timerInterval;

    const gameState = {
        difficulty: null, //1 - easy 2 3
        currentScreen: 1, //1 - menu , 2 - process, 3 - game over
        score: 0,
        timer: 0,
        shapesOnField: [],
        currentShape: null,
        nextShape: null
    }
    document.querySelector('.start').addEventListener('click', ()=>{
        const levelSelectorValue = document.querySelector("#level").value;
        registerChanges('difficulty', levelSelectorValue);
        registerChanges('currentScreen', 2);

    })
    const registerChanges =  (valueToChange, newValue) => {
        gameState[valueToChange] = newValue;
        switch (valueToChange) {
            case 'difficulty':
                updateDifficulty()
                break;
            case 'currentScreen':
                updateCurrentScreen()
                break;
            default:
                break;
        }
    }

    const updateCurrentScreen =  () => {
        switch (gameState.currentScreen) {
            case 1: 
                menu.classList.remove('hidden');
                ui.classList.add('hidden');
                break;
            case 2:
                menu.classList.add('hidden');
                ui.classList.remove('hidden');
                startGame();
                break;
            case 3:
                
                break;
            default:
                break;
        }
    }

    const updateDifficulty =  () => {
        console.log('updateDiff')
        // switch (gameState.currentScreen) {
        //     case 1:
        //         document.querySelector('.menu').classList.toggle('hidden')
        //         break;
        //     case 2:
        //         updateGameState()
        //         break;
        //     case 3:
        //         updateGameState()
        //         break;
        //     default:
        //         break;
        // }
    }

    const startGame = () => {
        startTimer();
        generateAndLaunchShape();
        

    }
    const startTimer = () => {
        timerInterval = setInterval(() => {
            registerChanges('timer', gameState.timer + 1)
            timer.innerText = gameState.timer;
        }, 1000);
    }
    const resetTimer = () => {
        clearTimeout(timerInterval);
        registerChanges('timer', 0)
    }

    const generateAndLaunchShape = () => {
        gameState.shapesOnField.push(new Shape(shapes[Math.round(Math.random() * (shapes.length - 1))]))
        
    }

    class Shape {
        needShiftToCenter = 4;

        drawElement (coods) {
            ctx.fillStyle = 'white';
            ctx.fillRect((coods.x + this.needShiftToCenter) * fieldCellSize, coods.y * fieldCellSize, fieldCellSize, fieldCellSize);
        }
        startMoving () {

        }
        constructor(elementsCoods) {
            for(let element of elementsCoods) {
                this.drawElement(element)
            }
            this.startMoving()
        }
    }
    


})()