import * as PIXI from 'pixi.js';

import { create2dArray, drawField, generateCells, insertShipV2, insertShip } from './utils';

const app = new PIXI.Application({
    backgroundColor: 0xABCDEF
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

//const WIDHT = app.renderer.width;
//const HEIGHT = app.renderer.height;

let field = create2dArray(10, 10);

generateCells(field);

//fillRand2dArray(field);

insertShipV2(field, 4);
insertShipV2(field, 3);
insertShipV2(field, 3);
insertShipV2(field, 2);
insertShipV2(field, 2);
insertShipV2(field, 2);
insertShipV2(field, 1);
insertShipV2(field, 1);
insertShipV2(field, 1);
insertShipV2(field, 1);


drawField(PIXI, field, app, 80, 100);
//console.log(field);







