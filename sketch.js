let score1 = 0;

var tank, tankImage, tank_shot, explosion;
var bullet;

var ground, groundImage;

var planeGroup, planeImage1, plane_destroyed, planeImage2, plane2_destroyed;

var target, targetImage;

var border;

function preload() {

    tankImage = loadAnimation("tank1.png");
    tank_shot = loadAnimation("tank_shot.png");

    groundImage = loadImage("ground.png");

    planeImage1 = loadImage("plane1.png");
    plane_destroyed = loadImage("plane1_destroyed.png");
    planeImage2 = loadImage("plane2.png");

    targetImage = loadImage("target.png");

    tankShotSound = loadSound("Tank Firing.mp3");

    explosion = loadSound("explosion.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    border = createSprite(windowWidth - windowWidth - 10, windowHeight - windowHeight + 100, 10, 60);

    tank = createSprite(windowWidth - windowWidth + 90, windowHeight - 80);
    tank.addAnimation("normal", tankImage);
    tank.addAnimation("afterShot", tank_shot);
    tank.scale = 0.5;

    bullet = createSprite(tank.x, tank.y, 10, 10);
    bullet.shapeColor = "black";

    ground = createSprite(windowWidth / 2, windowHeight - 35);
    ground.addImage(groundImage);
    ground.scale = 1.5;

    target = createSprite(627, windowHeight - windowHeight + 100);
    target.addImage(targetImage);
    target.scale = 0.5;

    planeGroup = new Group();
}

function draw() {
    background(92, 148, 252);

    console.log(frameCount);

    // text(mouseX + ',' + mouseY, mouseX, mouseY);

    textSize(30);
    textFont('Agency FB');
    fill("red");
    text('Plane destroyed: ' + score1, windowWidth - windowWidth + 20, windowHeight - windowHeight + 30);

    planeGroup.depth = target.depth;
    target.depth = target.depth + 1;

    tank.depth = bullet.depth;
    tank.depth = tank.depth + 1;

    bullet.depth = target.depth;
    bullet.depth = bullet.depth + 1;

    ground.depth = tank.depth;
    tank.depth = tank.depth + 1;

    ground.velocityX = -4;

    if(ground.x < 0) {
        ground.x = ground.width / 2;
    }

    if(keyDown("space")) {
        bullet.velocityX = 11;
        bullet.velocityY = -9;
        tankShotSound.play();
    }

    if(bullet.y < 0) {
        bullet.x = tank.x;
        bullet.y = tank.y;
        bullet.velocityX = 0;
        bullet.velocityY = 0;
        tankShotSound.stop();
    }

    if (planeGroup.isTouching(bullet)) {
        planeGroup.destroyEach();
        score1 += 1;
        explosion.play();
    }

    planes();

    drawSprites();
}

function planes() {
    if(frameCount % 280 === 0) {
        var plane = createSprite(windowWidth + 50, windowHeight - windowHeight + 100);
        plane.velocityX = -4;
        var rand = Math.round(random(1, 2));
        switch (rand) {
            case 1:
                plane.addImage(planeImage1);
                break;
            case 2:
                plane.addImage(planeImage2);
                break;
            default:
                break;
        }
        plane.lifetime = width / 4;

        planeGroup.add(plane);
    }
}