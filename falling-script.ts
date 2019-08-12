import {
    Graphics,
    Application,
    Rectangle,
    DisplayObject,
    Text
} from "pixi.js";

import { print, random } from "introcs";

const app = new Application(400, 600, { backgroundColor: 0x000000 });
document.body.appendChild(app.view);

let player = new Graphics();
player.beginFill(0xffffff);
player.drawRect(0, 0, 40, 40);
player.x = 180;
player.y = 20;
app.stage.addChild(player);

let top = new Graphics();
top.beginFill(0xfff123);
top.drawRect(0, 0, 400, 10);
app.stage.addChild(top);

let bar1 = new Graphics();
bar1.beginFill(0xfffff);
bar1.drawRect(0, 0, 100, 5);
app.stage.addChild(bar1);

let bar2 = new Graphics();
bar2.beginFill(0xfffff);
bar2.drawRect(0, 0, 300, 5);
app.stage.addChild(bar2);

let bar3 = new Graphics();
bar3.beginFill(0xfffff);
bar3.drawRect(0, 0, 100, 5);
app.stage.addChild(bar3);

let bar4 = new Graphics();
bar4.beginFill(0xfffff);
bar4.drawRect(0, 0, 300, 5);
app.stage.addChild(bar4);

let bar5 = new Graphics();
bar5.beginFill(0xfffff);
bar5.drawRect(0, 0, 100, 5);
app.stage.addChild(bar5);

let bar6 = new Graphics();
bar6.beginFill(0xfffff);
bar6.drawRect(0, 0, 300, 5);
app.stage.addChild(bar6);

let bar7 = new Graphics();
bar7.beginFill(0xfffff);
bar7.drawRect(0, 0, 100, 5);
app.stage.addChild(bar7);

let bar8 = new Graphics();
bar8.beginFill(0xfffff);
bar8.drawRect(0, 0, 300, 5);
app.stage.addChild(bar8);

let bar9 = new Graphics();
bar9.beginFill(0xfffff);
bar9.drawRect(0, 0, 100, 5);
app.stage.addChild(bar9);

let bar10 = new Graphics();
bar10.beginFill(0xfffff);
bar10.drawRect(0, 0, 300, 5);
app.stage.addChild(bar10);

let barArray = [[bar1, bar2], [bar3, bar4], [bar5, bar6], [bar7, bar8], [bar9, bar10]];


let L = 0;
let R = 0;
let speed = 1;

window.addEventListener("keydown", (e: KeyboardEvent): void => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const RIGHT: number = 39;
    if (e.keyCode === RIGHT) {
        R = 7;
    } else if (e.keyCode === LEFT) {
        L = -7;
    }
});

window.addEventListener("keyup", (e: KeyboardEvent): void => {
    console.log("key: " + e.keyCode);
    const LEFT: number = 37;
    const RIGHT: number = 39;
    if (e.keyCode === RIGHT) {
        R = 0;
    } else if (e.keyCode === LEFT) {
        L = 0;
    }
});

let isColliding = (a: DisplayObject, b: DisplayObject): boolean => {
    let ab: Rectangle = a.getBounds();
    let bb: Rectangle = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y + ab.height / 2 < bb.y + bb.height;
};

// let loss = (): boolean => {
//     return player.y + player.height < 0;
// };

let gameOver = (): void => {
    app.stage.removeChild(player);
    app.stage.removeChild(bar1);
    app.stage.removeChild(bar2);
    app.stage.removeChild(bar3);
    app.stage.removeChild(bar4);
    app.stage.removeChild(bar5);
    app.stage.removeChild(bar6);
    app.stage.removeChild(bar7);
    app.stage.removeChild(bar8);
    app.stage.removeChild(bar9);
    app.stage.removeChild(bar10);
    let lossText = new Text("Game Over");
    lossText.style.fill = 0xffffff;
    lossText.x = 130;
    lossText.y = 300;
    app.stage.addChild(lossText);
};


let n = 0;
let z = 30;
let i = 0;
let score = 0;
let counter = true;
let scoreText = new Text("Score: " + score);
scoreText.style.fill = 0xffffff;
scoreText.x = 10;
scoreText.y = 10;
app.stage.addChild(scoreText);


let gameLoop = (delta: number): void => {
    if (player.x < -20) {
        player.x = 400;
    } else if (player.x > 400) {
        player.x = -20;
    }
    player.x += (L + R);

    if (z % 30 === 0) {
        n = random(0, 30) * 10;
        barArray[i][0].y = 600;
        barArray[i][1].y = 600;
        barArray[i][0].width = n;
        barArray[i][1].x = 400 - (300 - n);
        i++;
        if (i === 5) {
            i = 0;
        }
    }
    if (z % 5 === 0 && counter) {
        score ++;
        scoreText.text = "Score: " + score;
    }
    z++;

    bar1.y -= 7;
    bar2.y -= 7;
    bar3.y -= 7;
    bar4.y -= 7;
    bar5.y -= 7;
    bar6.y -= 7;
    bar7.y -= 7;
    bar8.y -= 7;
    bar9.y -= 7;
    bar10.y -= 7;

    if (isColliding(player, top)) {
        counter = false;
        gameOver();
    }
    if (isColliding(player, bar1) || isColliding(player, bar2) || isColliding(player, bar3) || isColliding(player, bar4) || isColliding(player, bar5) || isColliding(player, bar6) || isColliding(player, bar7) || isColliding(player, bar8) || isColliding(player, bar9) || isColliding(player, bar10)) {
        player.y -= 7;
    } else if (player.y >= 560) {
        player.y = 560;
    } else {
        player.y += 9;
    }
};

app.ticker.add(delta => gameLoop(delta));