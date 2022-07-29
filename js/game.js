(function(){
    const menu = document.querySelector('.menu');
    const ui = document.querySelector('.game-ui');
    const score = document.querySelector('.game-score');

    const gameState = {
        difficulty: null, //1 - easy 2 3
        currentScreen: 1, //1 - menu , 2 - process, 3 - game over
        score: 0,
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


})()