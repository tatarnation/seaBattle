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
            arr[j][i] = {
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
            // const style = new PIXI.TextStyle({
            //     fontFamily: 'Arial',
            //     fontSize: 14,
            //     fontStyle: 'italic',
            //     fontWeight: 'bold',
            //     fill: ['#ffffff', '#00ff99'], // gradient
            //     stroke: '#4a1850',
            //     strokeThickness: 5,
            //     wordWrap: true,
            //     wordWrapWidth: 440,
            // })
            // const basicText = new PIXI.Text(arr[i][j].id.toString(), style);
            // basicText.x = coordX + offset;
            // basicText.y = coordY + offset;
            app.stage.addChild(fieldView);
            //app.stage.addChild(basicText);

        }
    }
}

export const randomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

/**
 * 
 * @param {[][]} arr 
 * @param {number} shipCells 
 */

export const insertShip = (arr, shipCells) => {


    const rndC = randomInt(0, arr.length - 1);
    const rndR = randomInt(0, arr[0].length - 1);

    //const randomCell = arr[rndC][rndR]; //

    let allFree = false;

    while (!allFree) {
        const dir = randomInt(0, 1);
        switch (dir) {
            case 0:
                if (arr[rndC][rndR] != undefined && arr[rndC + 1][rndR] != undefined && arr[rndC + 2][rndR] != undefined) {
                    if (!arr[rndC][rndR].haveShip && !arr[rndC + 1][rndR].haveShip && !arr[rndC + 2][rndR].haveShip) {
                        console.log('free');
                        arr[rndC][rndR].haveShip = true;
                        arr[rndC + 1][rndR].haveShip = true;
                        arr[rndC + 2][rndR].haveShip = true;
                        allFree = true;
                    };
                }
                break;
            case 1:
                if (arr[rndC][rndR] != undefined && arr[rndC][rndR + 1] != undefined && arr[rndC][rndR + 2] != undefined) {
                    if (!arr[rndC][rndR].haveShip && !arr[rndC][rndR + 1].haveShip && !arr[rndC][rndR + 2].haveShip) {
                        console.log('free');
                        arr[rndC][rndR].haveShip = true;
                        arr[rndC][rndR + 1].haveShip = true;
                        arr[rndC][rndR + 2].haveShip = true;
                        allFree = true;
                    };
                }
                break;
            default:
                allFree = false;
                break;
        }

    }
}

//todo: починить can't read property....
export const insertShipV2 = (arr, shipCells) => {


    const rndC = randomInt(0, arr.length - 1);
    const rndR = randomInt(0, arr[0].length - 1);

    //const randomCell = arr[rndC][rndR]; //

    let allFree = false;

    while (!allFree) {
        const dir = randomInt(0, 1);
        switch (dir) {
            case 0:
                for (let i = 0; i < shipCells; i++) {

                    if (arr[rndC + i][rndR] !== undefined && !arr[rndC + i][rndR].haveShip) {
                        arr[rndC + i][rndR].haveShip = true;
                    }

                }
                allFree = true;
                break;
            case 1:
                for (let i = 0; i < shipCells; i++) {

                    if (arr[rndC][rndR + i] !== undefined && !arr[rndC + i][rndR].haveShip) {
                        arr[rndC][rndR + i].haveShip = true;
                    }

                }
                allFree = true;
                break;
            default:
                allFree = false;
                break;
        }

    }



}
