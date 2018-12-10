class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
        this.active;
        this.currentScene;
        
        this.menubg;
    }
    
    preload(){
        this.load.image('menubg', 'assets/menu.jpg');
         this.load.image('button', 'assets/button.png');
    }
create(){
    let menubg = this.add.sprite(0, 0, 'menubg');
    let button = this.add.sprite(65,460,'button');
    
    menubg.setOrigin(0,0);
    button.setOrigin(0,0);
    
    button.setInteractive();
    button.on('pointerdown', () => this.scene.start('Game'));
}
}

//08 - Final
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
//let config = {
//    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
//    width: 600,
//    height: 1024,
//    physics: {
//        default: 'arcade',
//        arcade: {
//            debug: true,
//            gravity: {
//                y: 100
//            }
//        }
//    },
//    scene: [Menu, gameScene]
//};
var score = 0;
var scoreText;
//var player;
// create a new game, pass the configuration
//let game = new Phaser.Game(config);



// create a new scene


var timedEvent;

// some parameters for our scene
gameScene.init = function () {

    this.playerMaxX = 600
    this.playerMinX = 0
    this.starsMaxY = 280;
    this.starsMinY = 80;
    this.enemySpeed = 1.5;
    this.enemyBoundaryXMax = 600;
    this.enemyBoundaryYMin = -50;
    this.playerBoundaryXMax = 600;
    this.playerBoundaryYMin = 0;
}

// load assets
gameScene.preload = function () {

           
    
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('whale', 'assets/whale.png');
    this.load.image('crab', 'assets/crab.png');
    
    
  
    /* this.load.spritesheet('player', 'assets/spritesheet.png',{
         frameWidth: 90, frameHeight: 100, endFrame: 3});*/


};

// called once after the preload ends
gameScene.create = function () {
    //this.physics.world.gravity.y = 0;
 


    // create bg sprite
    let bg = this.add.sprite(0, 0, 'background');
   

    // change the origin to the top-left corner
    bg.setOrigin(0, 0);

    
    //score
    scoreText = this.add.text(16, 16, 'score: 0', {
        fontSize: '32px',
        fill: '#000'
    });



    // create whale
    //    this.whale = this.add.sprite(350, 540, 'whale');
    var whale = this.add.image(0, 550, 'whale');
    whale.setScale(0.4);
    var tween = this.tweens.add({
        targets: whale,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        flipX: true,
        yoyo: true,
        repeat: -1
    });


    //this.whale.flipX = true;
    //    whale.flipY = true;
    //    star = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this});
    //     //06: group of enemies
    //  this.stars = this.add.group({
    //    key: 'star',
    //    repeat: 4,
    //    setXY: {
    //      x: 110,
    //      y: 100,
    //      stepX: 90,
    //      stepY: 20   let ranVal = Phaser.Math.Between(-100,-300);

    //    }
    //    });

    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 2,
        //collideWorldBounds: false,
        setXY: {
            x: 150,
            y: -30,
            stepX: 200,
            stepY: 150
        }
    });

    this.crabs = this.physics.add.group({
        Key: 'crab',
        repeat: 4,
        setXY: {
            x: 150,
            y: -30,
            stepX: 100,
            stepY: 150
        }
    });


    //    this.stars = this.add.group({
    //        defaultKey: 'star',
    //        repeat: 4,
    //        setXY: {
    //            x: 200,
    //            y: -30,
    //            stepX: 100
    //        },
    //        bounceX: 1,
    //        bounceY: 1,
    //        collideWorldBounds: false
    //    });



    //    for (let i=0;i<this.stars.length; i++){

    /*let ranVal = Phaser.Math.Between(-100, -300);
    this.stars.create(150, -30); //.setGravity(0, 100);     
    this.stars.create(250, -30); //.setGravity(0, 90);     
    this.stars.create(400, -30); //.setGravity(0, 50);     
    this.stars.create(500, -30); //.setGravity(0, 30); */

    //console.log(this.stars.getChildren()[0])

    //    

    //    this.stars.create(200, 300).setGravity(0, -120);
    //    this.stars.create(300, 300);
    //    this.stars.create(400, 300);
    //    this.stars.create(500, 300, 'star').body.allowGravity = false
    //    this.physics.add.collider(this.stars, player);
    //    this.physics.add.overlap(this.player, this.star, collectStar, null, this);


    // create the player
    player = this.physics.add.sprite(300, this.sys.game.config.height / 1.3, 'player');

    console.log(player);
 
    // player.body.gravityX = 0;
    //player.body.gravityY = 0;
    //    this.anims.create({
    //        key: 'walk',
    //        frames: this.anims.generateFrameNumbers('player',{start: 0, end: 3}),
    //        frameRate: 10,
    //        repeat: -1
    //    })

    // we are reducing the width and height by 50%
    player.setScale(0.2);
    //console.log(this.player);
//    var music = this.sound.add('theme');
//     music.play();
    player.setCollideWorldBounds(true);

    player.body.allowGravity = false;


    this.physics.add.overlap(player, this.stars, collectStar, null, this);
    //this.physics.add.overlap(player, this.crabs, collectCrab, null, this);




};

//this.physics.add.collider(this.stars, player);
//this.physics.add.overlap(player, this.stars, collectStar, null, this);


function onEvent() {
    timedEvent.reset({
        delay: Phaser.Math.Between(100, 5000),
        callback: onEvent,
        callbackScope: this,
        repeat: 1
    });
};

// this is called up to 60 times per second
gameScene.update = function () {
    // check for active input
    if (this.input.activePointer.downX > 300) {
        // player walks
        //        player.anims.load('walk')
        player.x += 3.5;
        //        this.playerBoundaryXMax;

    } else if (this.input.activePointer.downX < 150) {
        //console.log(this.player.x );
        player.x -= 3.5;
        //        this.playerBoundaryYMin;
    } else {
        // console.log("Pointer x" + this.input.activePointer.downX);
        //console.log(this.player.x);
    }
    //    if (this.whale.x > this.enemyBoundaryXMax) {
    //
    //        this.enemySpeed *= -1;
    //    }
    //    //move whale
    //    if (this.whale.x < this.enemyBoundaryYMin) {
    //        this.whale.flipX = true;
    //
    //        this.enemySpeed *= -1;
    //    }
    //    this.whale.x += this.enemySpeed;

    this.stars.children.iterate(function (child) {



        //if the y position of the start is at the bottom 
        //then reset the y
        if (child.y > 1024) {

            child.disableBody(true, true);
            child.enableBody(true, child.x, 0, true, true);
            console.log(gameScene.physics.world.gravity.y);

        }


    });

//    this.crabs.children.iterate(function (child) {
//
//
//
//        //if the y position of the start is at the bottom 
//        //then reset the y
//        if (child.y > 1024) {
//
//            child.disableBody(true, true);
//            child.enableBody(true, child.x, 0, true, true);
//
//            console.log(gameScene.physics.world.gravity.y);
//        }
//
//
//    });


    /*let stars = this.stars.getChildren();
    
    
    let numStars = this.stars.length;
    let starspeed = 1.5;

    for (let i = 0; i < numStars; i++) {
        
        console.log(this.stars[i].y)
        
        let starY = this.stars[i].y;
        if (starY > 1200) {
            this.stars[i].y = -30;
        }
        this.stars[i].y += this.starspeed;

        //console.log(this.stars[i].gravity);

        //console.log(starY);
        
    }*/

    /*let crabs = this.crabs.getChildren();
    let numCrabs = crabs.length;
    let crabSpeed = 1.5;

    for (let i = 0; i < numCrabs; i++) {
        let crabY = this.stars[i].y;
        if (crabY > 1100) {
            this.stars[i].y = -30;
        }
        crabs[i].y += crabSpeed;

        //console.log(this.stars[i].gravity);

        //console.log(starY);
        
    }*/


};

function collectStar(player, star) {

    console.log("collect star function called");

    star.disableBody(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);
    if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });
    }
}

//function resetStar(star) {
//    this.star.x = Phaser.Math.Between(-100, -300);
//    this.star.y = Phaser.Math.Between(-100, -300);
//
//}

//function collectCrab(player, crab) {
//
//    console.log("collect crab function called");
//
//    crab.disableBody(true, true);
//    //  Add and update the score
//    score += 10;
//    scoreText.setText('Score: ' + score);
//    if (this.crabs.countActive(true) === 0) {
//        this.crabs.children.iterate(function (child) {
//
//            child.enableBody(true, child.x, 0, true, true);
//
//        });
//    }
//}

//
//gameScene.gameOver = function () {
//
//
//};

let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 600,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 100
            }
        }
    },
    scene: [Menu, gameScene]
};
let game = new Phaser.Game(config);