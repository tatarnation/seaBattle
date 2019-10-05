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
            arr[i][j] = Math.random();
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

            fieldView.on('pointerdown', function () {

            });
            fieldView.on('pointerover', function () {
                this.beginFill(0xFFFFFF);
                this.drawRect(coordX + offset, coordY + offset, size, size);
                this.endFill();
            });
            fieldView.on('pointerout', function () {
                this.beginFill(0xDE3249);
                this.drawRect(coordX + offset, coordY + offset, size, size);
                this.endFill();
            });
            app.stage.addChild(fieldView);
            //app.stage.addChild(basicText);

        }
    }
}

export const insertShip = (arr, shipCells) => {
    // ????????????
}
