var helicopterIMG, helicopterSprite, packageSprite, packageIMG;
var packageBody, ground
var redBoxleft, redBoxBottom, redBoxRight;
var redBoxleftBody, redBoxBottomBody, redBoxRightBody;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopterIMG = loadImage("helicopter.png")
	packageIMG = loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);


	packageSprite = createSprite(width / 2, 80, 10, 10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale = 0.1

	helicopterSprite = createSprite(width / 2, 200, 10, 10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale = 0.6

	groundSprite = createSprite(width / 2, height - 35, width, 10);
	groundSprite.shapeColor = color(255)

	redBoxleft = createSprite(width / 2 - 100, height - 90, 20, 100);
	redBoxleft.shapeColor = "red";

	redBoxBottom = createSprite(width / 2, height - 50, 200, 20);
	redBoxBottom.shapeColor = "red";

	redBoxRight = createSprite(width / 2 + 100, height - 90, 20, 100);
	redBoxRight.shapeColor = "red";


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width / 2, 200, 5, { restitution: 0.4, isStatic: true });
	World.add(world, packageBody);


	//Create a Ground
	ground = Bodies.rectangle(width / 2, 650, width, 10, { isStatic: true });
	World.add(world, ground);

	redBoxleftBody = Bodies.rectangle(redBoxleft.position.x, redBoxleft.position.y, 20, 100), { isStatic: true };
	World.add(world, redBoxleftBody);

	redBoxBottomBody = Bodies.rectangle(redBoxBottom.position.x, redBoxBottom.y - 5, 200, 20, { isStatic: true });
	World.add(world, redBoxBottomBody);

	redBoxRightBody = Bodies.rectangle(redBoxRight.position.x, redBoxRight.position.y, 20, 100, { isStatic: true })
	World.add(world, redBoxRightBody);

	Engine.run(engine);

}


function draw() {
	rectMode(CENTER);
	background(0);
	packageSprite.x = packageBody.position.x
	packageSprite.y = packageBody.position.y
	drawSprites();

}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		helicopterSprite.x = helicopterSprite.x - 10;
		translation = { x: -10, y: 0 }
		Matter.Body.translate(packageBody, translation);
	}
	else if (keyCode === RIGHT_ARROW) {
		helicopterSprite.x = helicopterSprite.x + 10;
		translation = { x: 10, y: 0 }
		Matter.Body.translate(packageBody, translation);
	}
	if (keyCode === DOWN_ARROW) {
		// Look at the hints in the document and understand how to make the package body fall only on
		Matter.Body.setStatic(packageBody, false);
	}
}



