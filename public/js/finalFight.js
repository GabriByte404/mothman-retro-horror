var spam = 0;
var rinculoY = 0;
var rinculoX = 0;
var colpito = 0;
var bobColpito = 0;
var danniSubiti = 0;
var end = 0;
var inizioScontro = 0;
cammina = 0;
var isShooting = false;
var shotCounter = 0;
var canShoot = true;
var lastShotTime = 0;

var life;
var life1;
var life2;
var life3;
var life4;
var life5;
var life6;
var life7;
var life8;
var life9;
var life10;
var life11;

class finalFight extends Phaser.Scene {
    constructor() {
        super("finalFight");
    }

    handleMonsterHit(shot, monster, scene) {
        shot.destroy();
    
        if (Xp >= 0 && Xp <= 30) {
            colpito = colpito + 1;
        } else if (Xp > 30 && Xp <= 70) {
            colpito = colpito + 1.25;
        } else if (Xp > 70 && Xp <= 120) {
            colpito = colpito + 1.5;
        } else {
            colpito = colpito + 1.75;
        }
    
        if (colpito > 0 && colpito < 200) {
            monster.anims.play('hit2', true);
            setTimeout(() => {
                monster.anims.play('down2', true);
            }, 600);
        }
    
        if (colpito >= 15) life5.setTint(0xffff00);
        if (colpito >= 25) life4.setTint(0xffff00);
        if (colpito >= 40) life3.setTint(0xffff00);
        if (colpito >= 55) life2.setTint(0xffff00);
        if (colpito >= 65) life1.setTint(0xffff00);
        if (colpito >= 80) life.setTint(0xffff00);
    
        if (colpito >= 100) life5.setVisible(false);
        if (colpito >= 120) life4.setVisible(false);
        if (colpito >= 145) life3.setVisible(false);
        if (colpito >= 160) life2.setVisible(false);
        if (colpito >= 175) life1.setVisible(false);
        if (colpito >= 200) {
            life.setVisible(false);
            monster.anims.play('hit2', true);
            setTimeout(() => {
                monster.destroy();
                setTimeout(() => {
                    // Logica di fine battaglia
                    scene.finalA.stop();
                    cammina = 1;
                    bobColpito = 1;
                    scene.omino.setVelocityX(0);
                    scene.omino.setVelocityY(0);
                    scene.vittoria = scene.sound.add('vittoria');
                    scene.vittoria.setVolume(vol);
                    scene.vittoria.play();
    
                    let sblocco3;
                    let sblocco2;
                    scene.add.image(scene.omino.x - 229, scene.omino.y - 213, "finale").setOrigin(0).setDepth(25).setScale(0.2);
                    let sblocco = scene.add.text(scene.omino.x - 210, scene.omino.y + 85, "Bob:", { font: "16px Courier", fill: "black" }).setDepth(26);
    
                    if (lingua == "ita") {
                        sblocco2 = scene.add.text(scene.omino.x - 210, scene.omino.y + 110, "Ce l'ho fatta l'ho sconfitto!!!", { font: "12px Courier", fill: "black" }).setDepth(26);
                    } else if (lingua == "ing") {
                        sblocco2 = scene.add.text(scene.omino.x - 210, scene.omino.y + 110, "I did it! I finished it!!!", { font: "12px Courier", fill: "black" }).setDepth(26);
                    }
    
                    setTimeout(() => {
                        if (lingua == "ita") {
                            sblocco3 = scene.add.text(scene.omino.x - 210, scene.omino.y + 130, "Ora io e la mia famiglia siamo salvi e possiamo\ntornare a casa!", { font: "12px Courier", fill: "black" }).setDepth(26);
                        } else if (lingua == "ing") {
                            sblocco3 = scene.add.text(scene.omino.x - 210, scene.omino.y + 130, "Now my family and I are safe and we can\ngo home!", { font: "12px Courier", fill: "black" }).setDepth(26);
                        }
    
                        setTimeout(() => {
                            let playButton = scene.add.image(scene.omino.x + 173, scene.omino.y + 103, "avanti").setOrigin(0).setDepth(26).setScale(0.075);
                            playButton.setInteractive();
                            playButton.on('pointerdown', () => {
                                scene.vittoria.stop();
                                scene.add.image(scene.omino.x - 330, scene.omino.y - 190, "torna").setOrigin(0).setDepth(28).setScale(0.35);
                                let menuButton = scene.add.image(scene.omino.x - 60, scene.omino.y + 120, "MNF2").setOrigin(0).setDepth(29).setScale(0.2);
                                menuButton.setInteractive();
                                menuButton.on('pointerdown', () => {
                                    spam = 0;
                                    rinculoY = 0;
                                    rinculoX = 0;
                                    colpito = 0;
                                    bobColpito = 0;
                                    danniSubiti = 0;
                                    end = 0;
                                    inizioScontro = 0;
                                    cammina = 0;
                                    Xp = 0;
                                    scene.vittoria.stop();
                                    scene.scene.start("Menu");
                                });
                            });
                        }, 1000);
                    }, 1000);
                }, 800);
            }, 800);
        }
    }

    preload(){
        this.load.image('vita', './assets/vita.png');
        this.load.image('vs', './assets/versus.png');
        this.load.image('nd', './assets/nickD.png');
        this.load.image('ns', './assets/nick.png');
        this.load.atlas('bobArmato', './assets/bob/bobArma.png', './assets/bob/bob.json');
        this.load.atlas('bobColpito', './assets/bob/bobColpito.png', './assets/bob/bobColpito.json');
        this.load.image('LaserL', './assets/laserL.png');
        this.load.image('LaserU', './assets/laserU.png');
        this.load.image('LaserD', './assets/laserD.png');
        this.load.image('LaserR', './assets/laserR.png');
        this.load.image("tiles6","./assets/castel.png");
        this.load.tilemapTiledJSON('map',"./assets/map1.json");
        this.load.atlas('in', './assets/monster/n.png', './assets/monster/n.json');
        this.load.atlas('ie', './assets/monster/e.png', './assets/monster/e.json');
        this.load.atlas('iw', './assets/monster/w.png', './assets/monster/w.json');
        this.load.atlas('is', './assets/monster/s.png', './assets/monster/s.json');
        this.load.atlas('t', './assets/monster/t.png', './assets/monster/t.json');
        this.load.atlas('hit', './assets/monster/hit.png', './assets/monster/s.json');
        this.load.image("gameOverf", "./assets/gameOverF.png");
        this.load.image("MNF", "./assets/MenuButtons/menuButtonF.png");
        this.load.image("MNF2", "./assets/MenuButtons/menuButtonF2.png");
        this.load.audio('over', 'assets/audio/gameOver.wav');
        this.load.audio('damage', 'assets/audio/damage.wav');
        this.load.audio('sh', 'assets/audio/sparo.mp3');
        this.load.audio('sottoFinal', 'assets/audio/sottoFinal.mp3');
        this.load.audio('vittoria', 'assets/audio/vittoria.mp3');
        this.load.image("luce","./assets/dialoghi/dialogo.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
        this.load.image("finale","./assets/dialoghi/finale.png");
        this.load.image("torna","./assets/dialoghi/tornaMenu.jpg");
        this.load.image('joystickThumb', './assets/control.png');
        this.load.image('joystickThumbShoot', './assets/shoot.png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(){
        this.finalA = this.sound.add('sottoFinal', { loop: -1 });
        this.finalA.setVolume(vol);
        this.finalA.play();

        var esperienza = this.add.text(395, 4.5, 'XP: '+Xp, {
            fontSize: '12px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff',
            stroke: true
        });
        esperienza.setScrollFactor(0);
        esperienza.setVisible(true)
        esperienza.setDepth(15)
        //vite
        life=this.add.image(130,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life.setScale(0.4)
        life.setScrollFactor(0);
        life.setVisible(true)
        life.setDepth(15)
        life1=this.add.image(146,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life1.setScale(0.4)
        life1.setScrollFactor(0);
        life1.setVisible(true)
        life1.setDepth(15)
        life2=this.add.image(162,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life2.setScale(0.4)
        life2.setScrollFactor(0);
        life2.setVisible(true)
        life2.setDepth(15)
        life3=this.add.image(178,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life3.setScale(0.4)
        life3.setScrollFactor(0);
        life3.setVisible(true)
        life3.setDepth(15)

        life4=this.add.image(194,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life4.setScale(0.4)
        life4.setScrollFactor(0);
        life4.setVisible(true)
        life4.setDepth(15)
        life5=this.add.image(210,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life5.setScale(0.4)
        life5.setScrollFactor(0);
        life5.setVisible(true)
        life5.setDepth(15)


        life6=this.add.image(250,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life6.setScale(0.4)
        life6.setScrollFactor(0);
        life6.setVisible(true)
        life6.setDepth(15)
        life7=this.add.image(266,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life7.setScale(0.4)
        life7.setScrollFactor(0);
        life7.setVisible(true)
        life7.setDepth(15)
        life8=this.add.image(282,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life8.setScale(0.4)
        life8.setScrollFactor(0);
        life8.setVisible(true)
        life8.setDepth(15)
        life9=this.add.image(298,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life9.setScale(0.4)
        life9.setScrollFactor(0);
        life9.setVisible(true)
        life9.setDepth(15)
        life10=this.add.image(314,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life10.setScale(0.4)
        life10.setScrollFactor(0);
        life10.setVisible(true)
        life10.setDepth(15)
        life11=this.add.image(330,15,"vita",{
            padding: { x: 10, y: 5 },
        });
        life11.setScale(0.4)
        life11.setScrollFactor(0);
        life11.setVisible(true)
        life11.setDepth(15)

        life.setTint(0xff0000);
        life1.setTint(0xff0000);
        life2.setTint(0xff0000);
        life3.setTint(0xff0000);
        life4.setTint(0xff0000);
        life5.setTint(0xff0000);
        life6.setTint(0xff0000);
        life7.setTint(0xff0000);
        life8.setTint(0xff0000);
        life9.setTint(0xff0000);
        life10.setTint(0xff0000);
        life11.setTint(0xff0000);

        life.setVisible(false)
        life1.setVisible(false)
        life2.setVisible(false)
        life3.setVisible(false)
        life4.setVisible(false)
        life5.setVisible(false)
        life6.setVisible(false)
        life7.setVisible(false)
        life8.setVisible(false)
        life9.setVisible(false)
        life10.setVisible(false)
        life11.setVisible(false)

         //mostro
         
         this.anims.create({ key: 'right2', frames: this.anims.generateFrameNames('ie', { prefix: 'ie', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
         this.anims.create({ key: 'left2', frames: this.anims.generateFrameNames('iw', { prefix: 'iw', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
         this.anims.create({ key: 'up2', frames: this.anims.generateFrameNames('in', { prefix: 'in', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
         this.anims.create({ key: 'down2', frames: this.anims.generateFrameNames('is', { prefix: 'is', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
         this.anims.create({ key: 'turn2', frames: this.anims.generateFrameNames('t', { prefix: 't', end: 19, zeroPad: 4}), frameRate: 10, repeat: -1});
         this.anims.create({ key: 'hit2', frames: this.anims.generateFrameNames('hit', { prefix: 'is', end: 12, zeroPad: 4}), frameRate: 10, repeat: 0});
         
         this.monster =this.physics.add.sprite(815, 400, 'is').setScale(0.5).setDepth(5);
         this.monster.anims.play('down2', true);

         //fine mostro

        //animazioni
        this.anims.create({ key: 'right4', frames: this.anims.generateFrameNames('bobArmato', { prefix: 'right', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left4', frames: this.anims.generateFrameNames('bobArmato', { prefix: 'left', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up4', frames: this.anims.generateFrameNames('bobArmato', { prefix: 'up', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down4', frames: this.anims.generateFrameNames('bobArmato', { prefix: 'down', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn4', frames: this.anims.generateFrameNames('bobArmato', { prefix: 'idle', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'bobColpito4', frames: this.anims.generateFrameNames('bobColpito', { prefix: 'terra', end: 4, zeroPad: 4}), frameRate: 10, repeat: 0});

        this.omino =this.physics.add.sprite(815, 1307, 'bobArmato').setDragX(500).setDragY(500).setScale(1.2).setDepth(5);

        //mappa
        const map = this.make.tilemap({key:"map",tileWidth:35,tileHeight:35});
        const tileset = map.addTilesetImage("castel","tiles6");
        const layer = map.createLayer("sfondoFF", tileset, 0, 0);
        const ostacoli = map.createLayer("muriFF", tileset, 0, 0);

        this.physics.add.collider(this.omino,ostacoli);
        this.physics.add.collider(this.monster,ostacoli);
        ostacoli.setCollisionByProperty({colliders:true});
        ostacoli.setCollision([6351, 6352, 6353, 6354, 6355, 6356, 6357, 6358, 6359, 6360, 6361, 6362, 6363, 6364, 6365, 6366, 6367, 6368, 6369, 6370, 6371, 6372, 6373, 6374, 6375, 6376, 6389, 6399, 6404, 6405, 6414, 6426, 6427, 6437, 6439, 6440, 6442, 6443, 6452, 6453, 6454, 6463, 6475, 6477, 6478, 6480, 6481, 6492, 6501, 6530, 6539, 6568, 6577, 6606, 6615, 6644, 6653, 6682, 6691, 6720, 6729, 6758, 6767, 6796, 6805, 6834, 6843, 6872, 6881, 6910, 6919, 6948, 6957, 6986, 6995, 7024, 7033, 7062, 7071, 7100, 7109, 7138, 7147, 7176, 7185, 7214, 7223, 7252, 7261, 7290, 7299, 7328, 7337, 7366, 7375, 7376, 7377, 7402, 7403, 7404, 7415, 7440, 7453, 7454, 7455, 7456, 7457, 7458, 7459, 7460, 7461, 7462, 7463, 7464, 0, 0, 7467, 7468, 7469, 7470, 7471, 7472, 7473, 7474, 7475, 7476, 7477, 7478, 7502, 7505, 7540, 7541, 7542, 7543])

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.omino)

        this.mioTasto=this.input.keyboard.createCursorKeys();
       
        this.physics.add.overlap(this.omino,this.monster,(primo, secondo) =>{
            if(inizioScontro==1){
                if(bobColpito==0){
                    danniSubiti=danniSubiti+1;
                    bobColpito=1
                    if(danniSubiti>=3){
                        life6.setTint(0xffff00);
                    } 
                    if(danniSubiti>=5){
                        life7.setTint(0xffff00);
                    } 
                    if(danniSubiti>=7){
                        life8.setTint(0xffff00);
                    } 
                    if(danniSubiti>=9){
                        life9.setTint(0xffff00);
                    } 
                    if(danniSubiti>=11){
                        life10.setTint(0xffff00);
                    } 
                    if(danniSubiti>=14){
                        life11.setTint(0xffff00);
                    } 
                    if(danniSubiti>=16){
                        life6.setVisible(false);
                    } 
                    if(danniSubiti>=18){
                        life7.setVisible(false);
                    } 
                    if(danniSubiti>=20){
                        life8.setVisible(false);
                    } 
                    if(danniSubiti>=22){
                        life9.setVisible(false);
                    } 
                    if(danniSubiti>=24){
                        life10.setVisible(false);
                    } 
                    if(danniSubiti>=25){
                        life11.setVisible(false);
                        end=1
                        setTimeout(() =>{
                            this.omino.setVisible(false)
                            this.monster.x=100
                            this.monster.y=100
                            this.finalA.stop();
                            this.Gover = this.sound.add('over');
                            this.Gover.setVolume(vol);
                            this.Gover.play();
                            this.add.image(this.omino.x-320,this.omino.y-200,"gameOverf").setOrigin(0).setDepth(19).setScale(0.28);
                            this.monster.anims.stop('right3', true);
                            menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MNF").setOrigin(0).setDepth(20).setScale(0.2);
                            menuButton.setInteractive();
                            menuButton.on('pointerdown', ()=>{
                                 spam=0
                                 rinculoY=0
                                 rinculoX=0
                                 colpito=0
                                 bobColpito=0
                                 danniSubiti=0
                                 end=0
                                 inizioScontro=0
                                 cammina=0
                                 Xp=0
                                this.scene.start("Menu")
                        });
                        }, 600)
                    }

                    if(this.monster.x>this.omino.x){
                        this.omino.setVelocityX(-300)
                        this.damage = this.sound.add('damage');
                        this.damage.setVolume(vol);
                        this.damage.play();
                        this.omino.anims.play('bobColpito4', true);
                    }else{
                        this.omino.setVelocityX(300)
                        this.damage = this.sound.add('damage');
                        this.damage.setVolume(vol);
                        this.damage.play();
                        this.omino.flipX=true
                        this.omino.anims.play('bobColpito4', true);
                    }
                    setTimeout(() =>{
                        this.omino.flipX=false
                        if(end==0){
                            bobColpito=0
                        }
                    }, 600)
                }
            }
        })

        const thumbContainer = this.add.container(0, 0);
        const thumbCircle = this.add.circle(0, 0, 20, 0x195ebe);
        const thumbImage = this.add.image(0, 0, 'joystickThumb').setDepth(10).setScale(0.12);
        thumbContainer.add([thumbCircle, thumbImage]);

        this.joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 420,
            y: 285,
            radius: 40,
            base: this.add.circle(0, 0, 40, 0x849ec3).setAlpha(0.3).setStrokeStyle(2, 0x062f69).setDepth(15),
            thumb: thumbContainer.setDepth(15),
            dir: '8dir',
            forceMin: 16,
            enable: true
        }).on('update', this.dumpJoyStickState, this);

        const thumbContainerShoot = this.add.container(0, 0);
        const thumbCircleShoot = this.add.circle(0, 0, 20, 0xa32702);
        const thumbImageShoot = this.add.image(0, 0, 'joystickThumbShoot').setDepth(10).setScale(0.2);
        thumbContainerShoot.add([thumbCircleShoot, thumbImageShoot]);
        this.joystickShoot = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 50,
            y: 300,
            radius: 40,
            base: this.add.circle(0, 0, 40, 0xad3838).setAlpha(0.3).setStrokeStyle(2, 0xa32702), // Aggiunto bordo rosso
            thumb: thumbContainerShoot.setDepth(15),
            dir: '8dir',
            forceMin: 16,
            enable: true
        }).on('update', this.dumpJoyStickStateShoot, this);

        // Abilita input multipli
        this.input.addPointer(2);

        this.cursorKeys = this.joystick.createCursorKeys();
        this.cursorKeysS = this.joystickShoot.createCursorKeys();

    }
    // Funzione per gestire il joystick movimento
    dumpJoyStickState() {
        var cursorKeys = this.cursorKeys;
        this.leftPressed = cursorKeys.left.isDown;
        this.rightPressed = cursorKeys.right.isDown;
        this.upPressed = cursorKeys.up.isDown;
        this.downPressed = cursorKeys.down.isDown;
    }

    // Funzione per gestire il joystick sparo
    dumpJoyStickStateShoot() {
        var cursorKeys = this.cursorKeysS;
        this.leftPressedS = cursorKeys.left.isDown;
        this.rightPressedS = cursorKeys.right.isDown;
        this.upPressedS = cursorKeys.up.isDown;
        this.downPressedS = cursorKeys.down.isDown;
    }

    shoot() {
        const currentTime = this.time.now;
    
        if (canShoot && spam == 0 && bobColpito == 0 && inizioScontro == 1 && currentTime - lastShotTime > 500) {
            spam = 1;
            lastShotTime = currentTime;
            rinculoY += 1;
            rinculoX += 1;
            isShooting = true; // BLOCCA L'ANIMAZIONE DI MOVIMENTO
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();
    
            let shotX = this.omino.x;
            let shotY = this.omino.y;
            let velocityX = 0;
            let velocityY = 0;
            let laserType = '';
            let ominoType = '';
    
            if (this.upPressedS) {
                shotY -= 60;
                velocityY = -300;
                laserType = 'LaserU';
                ominoType = 'up4';
            } else if (this.downPressedS) {
                shotY += 60;
                velocityY = 300;
                laserType = 'LaserD';
                ominoType = 'down4';
            } else if (this.leftPressedS) {
                shotX -= 60;
                velocityX = -300;
                laserType = 'LaserL';
                ominoType = 'left4';
            } else if (this.rightPressedS) {
                shotX += 60;
                velocityX = 300;
                laserType = 'LaserR';
                ominoType = 'right4';
            }
    
            if (laserType !== '') {
                this.omino.anims.play(ominoType, true); // L'ANIMAZIONE ORA SI VEDE
                
                let shot = this.physics.add.sprite(shotX, shotY, laserType).setScale(0.4).setDepth(5);
                shot.setVelocityX(velocityX);
                shot.setVelocityY(velocityY);
                shot.setAcceleration(velocityX * 1.2, velocityY * 1.2);
    
                 // Effetto scia luminosa
                let trail = this.add.particles(0, 0, 'particle', {
                    speed: 50,
                    lifespan: 300,
                    scale: { start: 0.2, end: 0 },
                    blendMode: 'ADD'
                });
                trail.startFollow(shot);

                // Distrugge il proiettile dopo 2 secondi
                this.time.delayedCall(2000, () => {
                    shot.destroy();
                    trail.destroy();
                });

                this.physics.add.overlap(shot, this.monster, (primo, secondo) => {
                    this.handleMonsterHit(primo, secondo, this);
                    shot.destroy();
                    trail.destroy();
                });
    
                // Effetto rinculo
                let recoilForce = 50;
                this.omino.setVelocity(-velocityX / recoilForce, -velocityY / recoilForce);
    
                // Attendi 200ms prima di sbloccare l'animazione di movimento
                setTimeout(() => {
                    isShooting = false;
                }, 700);
    
                shotCounter++;
                if (shotCounter >= 20) {
                    canShoot = false;
                    setTimeout(() => {
                        canShoot = true;
                        shotCounter = 0;
                    }, 2500);
                }
    
                setTimeout(() => {
                    spam = 0;
                }, 200);
            }
        }
    }    
    

    update(){
        if ((this.leftPressedS || this.rightPressedS || this.upPressedS || this.downPressedS)) {
            this.shoot();
        }
        if((this.omino.x>=595 && this.omino.x<=1030) && (this.omino.y>=490 && this.omino.y<=495)&& inizioScontro==0 && cammina==0){
            cammina=1;
            this.omino.setVelocityX(0)
            this.omino.setVelocityY(0)
            this.omino.x=815;
            this.omino.y=492;
            let sblocco3
            let sblocco2
            let dia=this.add.image(this.omino.x-228,this.omino.y+95,"luce").setOrigin(0).setDepth(5).setScale(0.32);
            let sblocco=this.add.text(this.omino.x-210, this.omino.y+105, "Mothman:", {font: "16px Courier", fill: "black"}).setDepth(6);
            if(lingua=="ita"){
                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "Eccoti finalmente! Ti stavo aspettando!", {font: "12px Courier", fill: "black"}).setDepth(6);
            } else if(lingua=="ing"){
                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "Here you are finally! I was waiting for you!", {font: "12px Courier", fill: "black"}).setDepth(6);
            }
            setTimeout(()=>{
                if(lingua=="ita"){
                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+150, "E vedo che sei venuto armato...", {font: "12px Courier", fill: "black"}).setDepth(6);
                } else if(lingua=="ing"){
                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+150, "And I see you came armed...", {font: "12px Courier", fill: "black"}).setDepth(6);
                }
                setTimeout(() =>{
                    let playButton= this.add.image(this.omino.x+173,this.omino.y+115,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                    playButton.setInteractive();
                        playButton.on('pointerdown', ()=>{
                            dia.setVisible(false);
                            sblocco.setVisible(false);
                            sblocco2.setVisible(false);
                            sblocco3.setVisible(false);
                            playButton.setVisible(false);
                            dia=this.add.image(this.omino.x-228,this.omino.y+95,"luce").setOrigin(0).setDepth(5).setScale(0.32);
                            sblocco=this.add.text(this.omino.x-210, this.omino.y+105, "Bob:", {font: "16px Courier", fill: "black"}).setDepth(6);
                            if(lingua=="ita"){
                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "E' arrivata la tua fine!", {font: "12px Courier", fill: "black"}).setDepth(6);
                            } else if(lingua=="ing"){
                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "Your end has come!", {font: "12px Courier", fill: "black"}).setDepth(6);
                            }
                            setTimeout(()=>{
                                if(lingua=="ita"){
                                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+150, "Ti sconfiggerò e salverò la mia famiglia!!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                } else if(lingua=="ing"){
                                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+150, "I will defeat you and save my family!!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                }
                                setTimeout(() =>{
                                    let playButton= this.add.image(this.omino.x+173,this.omino.y+115,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                    playButton.setInteractive();
                                        playButton.on('pointerdown', ()=>{
                                            dia.setVisible(false);
                                            sblocco.setVisible(false);
                                            sblocco2.setVisible(false);
                                            sblocco3.setVisible(false);
                                            playButton.setVisible(false);
                                            dia=this.add.image(this.omino.x-228,this.omino.y+95,"luce").setOrigin(0).setDepth(5).setScale(0.32);
                                            sblocco=this.add.text(this.omino.x-210, this.omino.y+105, "Mothman:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                            if(lingua=="ita"){
                                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "Provaci AH AH AH!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                            } else if(lingua=="ing"){
                                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+130, "Give it a go AH AH AH!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                            }
                                            setTimeout(() =>{
                                                let playButton= this.add.image(this.omino.x+173,this.omino.y+115,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                playButton.setInteractive();
                                                playButton.on('pointerdown', ()=>{
                                                    dia.setVisible(false);
                                                    sblocco.setVisible(false);
                                                    sblocco2.setVisible(false);
                                                    sblocco3.setVisible(false);
                                                    playButton.setVisible(false);
                                                    life.setVisible(true)
                                                    life1.setVisible(true)
                                                    life2.setVisible(true)
                                                    life3.setVisible(true)
                                                    life4.setVisible(true)
                                                    life5.setVisible(true)
                                                    life6.setVisible(true)
                                                    life7.setVisible(true)
                                                    life8.setVisible(true)
                                                    life9.setVisible(true)
                                                    life10.setVisible(true)
                                                    life11.setVisible(true)

                                                    var nomes = this.add.text(82, 4, 'M.M', {
                                                        fontSize: '12px',
                                                        padding: { x: 10, y: 5 },
                                                        fill: '#ffffff',
                                                        stroke: true
                                                    });
                                                    nomes.setScrollFactor(0);
                                                    nomes.setVisible(true)
                                                    nomes.setDepth(18)
                                            
                                                    var nomed = this.add.text(335, 4, 'Bob', {
                                                        fontSize: '12px',
                                                        padding: { x: 10, y: 5 },
                                                        fill: '#ffffff',
                                                        stroke: true
                                                    });
                                                    nomed.setScrollFactor(0);
                                                    nomed.setVisible(true)
                                                    nomed.setDepth(18)
                                            
                                                    var nd=this.add.image(362,15,"nd",{
                                                        padding: { x: 10, y: 5 },
                                                    });
                                                    nd.setScale(0.4)
                                                    nd.setScrollFactor(0);
                                                    nd.setVisible(true)
                                                    nd.setDepth(15)
                                            
                                                    var ns=this.add.image(98,15,"ns",{
                                                        padding: { x: 10, y: 5 },
                                                    });
                                                    ns.setScale(0.4)
                                                    ns.setScrollFactor(0);
                                                    ns.setVisible(true)
                                                    ns.setDepth(15)
                                            
                                                    var versus=this.add.image(230,15,"vs",{
                                                        padding: { x: 10, y: 5 },
                                                    });
                                                    versus.setScale(0.028)
                                                    versus.setScrollFactor(0);
                                                    versus.setVisible(true)
                                                    versus.setDepth(15)

                                                    cammina=0
                                                    inizioScontro=1
                                                })
                                            }, 1000)
                                        })
                                }, 1000)
                            }, 1000)
                        })
                }, 1000)
            }, 1000)
        }

        if(this.mioTasto.space.isUp)
        {
            spam=0
            if(colpito<200 && bobColpito==0 && inizioScontro==1){
                if(Math.abs(this.monster.x-this.omino.x)>Math.abs(this.monster.y-this.omino.y)){
                    if(this.monster.x>this.omino.x){
                        this.monster.anims.play('left2', true);
                        this.monster.setVelocityX(-60)
                    } else{
                        this.monster.anims.play('right2', true);
                        this.monster.setVelocityX(60)
                    }
                } else{
                    if(this.monster.y>this.omino.y){
                        this.monster.anims.play('up2', true);
                        this.monster.setVelocityY(-60)
                    } else{
                        this.monster.anims.play('down2', true);
                        this.monster.setVelocityY(60)
                    }
                }
            }
        }

        if((this.mioTasto.left.isDown || this.leftPressed) && this.mioTasto.space.isDown && spam==0 && bobColpito==0 && inizioScontro==1 && cammina==0)
        {
            spam=1
            rinculoY=rinculoY+1;
            rinculoX=rinculoX+1;
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();

            if(rinculoY%2==0 && rinculoX%2==0){
                this.shot =this.physics.add.sprite(this.omino.x-60, this.omino.y+10, 'LaserL').setScale(0.4).setDepth(5);
                this.shot.setVelocityX(-200)
            } else{
                this.shot =this.physics.add.sprite(this.omino.x-30, this.omino.y, 'LaserL').setScale(0.4).setDepth(5);
                this.shot.setVelocityX(-200)
            }
            this.omino.setVelocityX(-120);
            this.omino.anims.play('left4', true);

            this.physics.add.overlap(this.shot, this.monster, (primo, secondo) => {
                this.handleMonsterHit(primo, secondo, this);
            });
            

        } else if((this.mioTasto.right.isDown || this.rightPressed) && this.mioTasto.space.isDown && spam==0 && bobColpito==0 && inizioScontro==1)
        {
            spam=1
            rinculoY=rinculoY+1;
            rinculoX=rinculoX+1;
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();

            if(rinculoY%2==0 && rinculoX%2==0){
                this.shot =this.physics.add.sprite(this.omino.x+60, this.omino.y+10, 'LaserR').setScale(0.4).setDepth(5);
                this.shot.setVelocityX(+200)
            } else{
                this.shot =this.physics.add.sprite(this.omino.x+30, this.omino.y, 'LaserR').setScale(0.4).setDepth(5);
                this.shot.setVelocityX(+200)
            }
            this.omino.setVelocityX(+120);
            this.omino.anims.play('right4', true);

            this.physics.add.overlap(this.shot, this.monster, (primo, secondo) => {
                this.handleMonsterHit(primo, secondo, this);
            });
            

        } else if((this.mioTasto.up.isDown || this.upPressed) && this.mioTasto.space.isDown && spam==0 && bobColpito==0 && inizioScontro==1)
        {
            spam=1
            rinculoY=rinculoY+1;
            rinculoX=rinculoX+1;
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();

            if(rinculoY%2==0 && rinculoX%2==0){
                this.shot =this.physics.add.sprite(this.omino.x+5, this.omino.y-60, 'LaserU').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(-200)
            } else{
                this.shot =this.physics.add.sprite(this.omino.x-5, this.omino.y-30, 'LaserU').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(-200)
            }
            this.omino.setVelocityY(-120);
            this.omino.anims.play('up4', true);

            this.physics.add.overlap(this.shot, this.monster, (primo, secondo) => {
                this.handleMonsterHit(primo, secondo, this);
            });            

        } else if((this.mioTasto.down.isDown || this.downPressed) && this.mioTasto.space.isDown && spam==0 && bobColpito==0 && inizioScontro==1)
        {
            spam=1
            rinculoY=rinculoY+1;
            rinculoX=rinculoX+1;
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();

            if(rinculoY%2==0 && rinculoX%2==0){
                this.shot =this.physics.add.sprite(this.omino.x+5, this.omino.y+60, 'LaserD').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(200)
            } else{
                this.shot =this.physics.add.sprite(this.omino.x-5, this.omino.y+30, 'LaserD').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(200)
            }
            this.omino.setVelocityY(120);
            this.omino.anims.play('down4', true);

            this.physics.add.overlap(this.shot, this.monster, (primo, secondo) => {
                this.handleMonsterHit(primo, secondo, this);
            });            

        } else if(this.mioTasto.space.isDown && spam==0 && bobColpito==0 && inizioScontro==1)
        {
            spam=1
            rinculoY=rinculoY+1;
            rinculoX=rinculoX+1;
            this.sh = this.sound.add('sh');
            this.sh.setVolume(vol);
            this.sh.play();

            if(rinculoY%2==0 && rinculoX%2==0){
                this.shot =this.physics.add.sprite(this.omino.x+5, this.omino.y+60, 'LaserD').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(200)
            } else{
                this.shot =this.physics.add.sprite(this.omino.x-5, this.omino.y+30, 'LaserD').setScale(0.4).setDepth(5);
                this.shot.setVelocityY(200)
            }

            this.physics.add.overlap(this.shot, this.monster, (primo, secondo) => {
                this.handleMonsterHit(primo, secondo, this);
            });
        }
        if ((this.mioTasto.left.isDown || this.leftPressed) && bobColpito==0 && cammina==0)
        {
            this.omino.setVelocityX(-120);
            if(!isShooting){
                this.omino.anims.play('left4', true);
            }
        }
        else if ((this.mioTasto.right.isDown || this.rightPressed) && bobColpito==0 && cammina==0)
        {
            this.omino.setVelocityX(120);
            if(!isShooting){
                this.omino.anims.play('right4', true);
            }
        }
        else if ((this.mioTasto.down.isDown || this.downPressed) && bobColpito==0 && cammina==0)
        {
            this.omino.setVelocityY(120);
            if(!isShooting){
                this.omino.anims.play('down4', true);
            }
        }
        else if ((this.mioTasto.up.isDown || this.upPressed) && bobColpito==0 && cammina==0)
        {
            this.omino.setVelocityY(-120);
            if(!isShooting){
                this.omino.anims.play('up4', true);
            }
        }
        else if(bobColpito==0)
        {
            this.omino.setVelocityX(0);
            if(!isShooting){
                this.omino.anims.play('turn4', true);
            }
        }

    }

}