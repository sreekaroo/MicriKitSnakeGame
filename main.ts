let currentPlayerX = 0;
let currentPlayerY = 0;
let direction = 'north';
let playerLength = 1;

let isLose = false;

type segment = { x: number, y: number, dir: string };
let snake: segment[];

reset()
// TODO make a structure that could represent a snake

let currentFruitX = 3;
let currentFruitY = 0;

function reset() {
    snake = [{ x: 2, y: 1, dir: 'east' },
             { x: 1, y: 1, dir: 'east' }]
}

function movePlayer() {
    const copy = snake.map((elem) => elem )
    const head = snake[0]

    let nextX = head.x;
    let nextY = head.y;
    
    switch (head.dir) {
        case ('north'):
            nextY--;
            if (nextY < 0) isLose= true;
            break;
        case ('east'):
            nextX++;
            if (nextX > 4) isLose = true;
            break;
        case ('south'):
            nextY++;
            if (nextY > 4) isLose = true;
            break;
        case ('west'):
            nextX--;
            if (nextX < 0) isLose = true;
            break;
    }

    const nextHead = {x: nextX, y: nextY, dir: head.dir}

    copy[0] = nextHead

    for(let i = 1; i < copy.length; i++){

        const prevSeg = snake[i-1]
        copy[i] = {x: prevSeg.x, y: prevSeg.y, dir: prevSeg.dir}

    }

    snake = copy;

}

function switchDirection(isClockwise: boolean) {
    switch (snake[0].dir) {
        case ('north'):
            snake[0].dir = isClockwise ? 'east' : 'west';
            break;
        case ('east'):
            snake[0].dir = isClockwise ? 'south' : 'north';
            break;
        case ('south'):
            snake[0].dir = isClockwise ? 'west' : 'east';
            break;
        case ('west'):
            snake[0].dir = isClockwise ? 'north' : 'south';
            break;
    }
}

function playerAteFruit() {
    return currentFruitX === snake[0].x && currentFruitY === currentPlayerY
}

function extendPlayer() {
    // TODO ADD A NEW SEGMENT TO SNAKE

}

loops.everyInterval(500, function () {

    if(isLose) {

        basic.showString("L")

    }
    else{

        for(let i = 0; i < snake.length; i++) {
            led.unplot(snake[i].x, snake[i].y);
        }
        movePlayer();
        // TODO AFTER MOVING CHECK IF COLLIDED
        for (let i = 0; i < snake.length; i++) {
            led.plot(snake[i].x, snake[i].y);
        }

        if (playerAteFruit()) {
            extendPlayer();
            led.unplot(currentFruitX, currentFruitY)
            led.plot(currentPlayerX, currentPlayerY);

            // keep getting a random point until not player location
            currentFruitX = randint(0, 4);
            currentFruitY = randint(0, 4);
            while (currentFruitX === currentPlayerX || currentFruitY === currentPlayerY) {
                currentFruitX = randint(0, 4);
                currentFruitY = randint(0, 4);
            }

            led.plotBrightness(currentFruitX, currentFruitY, 10);

        }
    }
})

input.onButtonPressed(Button.A, function () {
    switchDirection(false)
})

input.onButtonPressed(Button.B, function () {
    switchDirection(true);
})

input.onGesture(Gesture.Shake, function () {

    basic.clearScreen()
    isLose = false;
    reset();

})