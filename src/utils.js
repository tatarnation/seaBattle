/**
 * 
 * @param {number} c  columns of array
 * @param {number} r  rows of array
 * @returns {[][]} 2d Array
 */

export const create2dArray = (c, r) => {
    let arr = new Array(c);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(r);
    }
    return arr;
}

/**
 * 
 * @param {[][]} arr 
 */

export const get2dArrayLength = (arr) => {
    let colsLen = arr.length;
    let rowsLen = arr[0].length;
    return [colsLen, rowsLen]
}

/**
 * 
 * @param {[][]} arr 2d Array
 */

export const generateCells = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = {
                id: (i * arr.length + j) + 1,
                haveShip: false,
                isExployed: false
            };
        }
    }
}

// only for testing .. or not
export const fill2dArray = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = value;
        }
    }
}

// only for testing .. or not
export const fillRand2dArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = Object.assign(arr[i][j], { haveShip: Math.floor(Math.random() * (1 - 0 + 1)) + 0 == false });
        }
    }
}

/**
 * 
 * @param {PIXI} PIXI pixi instance
 * @param {[][]} arr 
 * @param {PIXI.Application} app 
 * @param {number} size 
 * @param {number} offset 
 */
export const drawField = (PIXI, arr, app, size, offset) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const fieldView = new PIXI.Graphics();
            fieldView.interactive = true;
            fieldView.buttonMode = true;
            const coordX = i * size;
            const coordY = j * size;
            if (arr[i][j].haveShip) {
                fieldView.lineStyle(2, 0xABCDEF, 1); //FFFFFF
                fieldView.beginFill(0xFFFFFF);
                fieldView.drawRect(coordX + offset, coordY + offset, size, size);
                fieldView.endFill();
            }
            else {
                fieldView.lineStyle(2, 0xABCDEF, 1); //FFFFFF
                fieldView.beginFill(0xDE3249);
                fieldView.drawRect(coordX + offset, coordY + offset, size, size);
                fieldView.endFill();
            }
            const style = new PIXI.TextStyle({
                fontFamily: 'Arial',
                fontSize: 14,
                fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#00ff99'], // gradient
                stroke: '#4a1850',
                strokeThickness: 5,
                wordWrap: true,
                wordWrapWidth: 440,
            })
            const basicText = new PIXI.Text(arr[i][j].id.toString(), style);
            basicText.x = coordX + offset;
            basicText.y = coordY + offset;
            app.stage.addChild(fieldView);
            app.stage.addChild(basicText);

        }
    }
}

export const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//todo: починить can't read property....
//Возможно придётся переписать пол кода
//интересно почему проверка на сущесвтвование элемента массива не срабатывает..
//скорее всего я тупой... хотя наверное так оно и есть
//ещё оно пропускает некоторые корабли, скорее из-за того что алгоритм не может подобрать нужные элементы массива
export const insertShipV2 = (arr, shipCells) => {


    const rndC = randomInt(0, arr.length - 1);
    const rndR = randomInt(0, arr[0].length - 1);

    //const randomCell = arr[rndC][rndR]; //

    let allFree = false;

    while (!allFree) {
        const dir = randomInt(0, 1);
        console.log("dir=" + dir);
        switch (dir) {
            case 0:
                for (let i = 0; i < shipCells; i++) {

                    if (arr[rndC + i][rndR] === undefined) break;
                    if (arr[rndC + i][rndR].haveShip) break;
                    if (arr[rndC + i][rndR + 1].haveShip) break;
                    if (arr[rndC + i][rndR - 1].haveShip) break;

                    arr[rndC + i][rndR].haveShip = true;

                    console.log("rows");
                    console.log(arr[rndC + i][rndR]);
                }
                allFree = true;
                break;
            case 1:
                for (let i = 0; i < shipCells; i++) {

                    if (arr[rndC][rndR + i] === undefined) break;
                    if (arr[rndC][rndR + i].haveShip) break;
                    if (arr[rndC + 1][rndR + i].haveShip) break;
                    if (arr[rndC - 1][rndR + i].haveShip) break;

                    arr[rndC][rndR + i].haveShip = true;
                    console.log("cols");
                    console.log(arr[rndC][rndR + i]);
                }
                allFree = true;
                break;
            default:
                allFree = false;
                break;
        }

    }



}
