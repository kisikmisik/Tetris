(function () {
    const canvas = document.querySelector('.field');
    const ctx = canvas.getContext("2d");

    const menu = document.querySelector('.menu');
    const ui = document.querySelector('.game-ui');
    const score = document.querySelector('.game-score');
    const timer = document.querySelector('.game-timer');

    const fieldCellSize = 50;
    let speedInMs = null;

    const cellsCountX = canvas.width / fieldCellSize;
    const cellsCountY = canvas.height / fieldCellSize;

    const shapes = [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
    ]
    let timerInterval;

    const gameState = {
        difficulty: null, //1 - easy 2, 3
        currentScreen: 1, //1 - menu , 2 - process, 3 - game over
        score: 0,
        timer: 0,
        shapesOnField: [],
        currentShape: null,
        nextShape: null
    }
    document.querySelector('.console-state').addEventListener('click', () => {
        console.log(gameState)
    })

    document.querySelector('.start').addEventListener('click', () => {
        const levelSelectorValue = document.querySelector("#level").value;
        registerChanges('difficulty', parseInt(levelSelectorValue));
        registerChanges('currentScreen', 2);

    })
    const registerChanges = (valueToChange, newValue) => {
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

    const updateCurrentScreen = () => {
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

    const updateDifficulty = () => {
        switch (gameState.difficulty) {
            case 1:
                speedInMs = 700
                break;
            case 2:
                speedInMs = 500
                break;
            case 3:
                speedInMs = 200
                break;
            default:
                break;
        }
    }

    const startGame = () => {
        startTimer();
        generateAndLaunchNewShape();


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

    const generateAndLaunchNewShape = () => {
        gameState.shapesOnField.push(new Shape(shapes[Math.round(Math.random() * (shapes.length - 1))]))

    }

    class Shape {
        needShiftToStartCoods = 3;
        coods = [];
        isMoving = true;

        constructor(elementsCoods) {
            this.coods = elementsCoods.map((el) => {
                return { x: el.x + this.needShiftToStartCoods, y: el.y - this.needShiftToStartCoods }
            })
            this.drawShape()
            this.startMoving()
        }

        drawShape() {
            ctx.fillStyle = 'white';
            for (let element of this.coods) {
                ctx.fillRect(element.x * fieldCellSize, element.y * fieldCellSize, fieldCellSize, fieldCellSize);
            }
        }
        clearShape() {
            for (let element of this.coods) {
                ctx.clearRect(element.x * fieldCellSize, element.y * fieldCellSize, fieldCellSize, fieldCellSize);
            }
        }
        isCollided() {
            const staticShapesArr = gameState.shapesOnField.filter(el => el.isMoving === false);

            const isAnyElementsCollided = false;
            // staticShapesArr.some((staticShapeElements) => {
            //     console.log('staticShapeElements', staticShapeElements)
            //     return staticShapeElements.some((staticEl) => {
            //         console.log(staticEl.x)
            //     })
            // });

            return this.coods.some(el => el.y >= (cellsCountY - 1) || isAnyElementsCollided);
        }
        startMoving() {
            this.isMoving = true;
            const movingInterval = setInterval(() => {
                this.clearShape();
                this.coods = this.coods.map((el) => {
                    return { ...el, y: el.y + 1 }
                });
                this.drawShape();
                if (this.isCollided()) {
                    clearInterval(movingInterval);
                    this.isMoving = false;
                    generateAndLaunchNewShape();
                }
            }, speedInMs);

        }

    }



})()