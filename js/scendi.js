var cammina=0
var attiva=0
var at=0
var vel=160
var cambia=0

class scendi extends Phaser.Scene{
    constructor(){
        super("scendi")
    }
    preload(){
        this.load.image("tiles3","./assets/cantina.png");
        this.load.tilemapTiledJSON('map',"./assets/map1.json");
        this.load.atlas('bob', './assets/bob/bob.png', './assets/bob/bob.json');
        this.load.atlas('in', './assets/monster/n.png', './assets/monster/n.json');
        this.load.atlas('ie', './assets/monster/e.png', './assets/monster/e.json');
        this.load.atlas('iw', './assets/monster/w.png', './assets/monster/w.json');
        this.load.atlas('is', './assets/monster/s.png', './assets/monster/s.json');
        this.load.atlas('t', './assets/monster/t.png', './assets/monster/t.json');
        this.load.image("n","./assets/nero.png");
        this.load.image("b","./assets/bianco.png");

        this.load.audio('UrloM', './assets/audio/mostro.mp3');
        this.load.audio('sottofondo','./assets/audio/pioggia-fulmini.mp3');
        this.load.audio('porta', './assets/audio/cantina.WAV');
        this.load.image('joystickThumb', './assets/control.png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(){
        //animazioni
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNames('bob', { prefix: 'right', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNames('bob', { prefix: 'left', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('bob', { prefix: 'up', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('bob', { prefix: 'down', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('bob', { prefix: 'idle', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});

        this.omino =this.physics.add.sprite(670, 445, 'bob').setDragX(500).setDragY(500).setScale(1.2).setDepth(5);

        //mostro
        this.monster =this.physics.add.sprite(510, 875, 'monster').setDragX(500).setDragY(500).setScale(0.5).setDepth(5);
        this.anims.create({ key: 'right2', frames: this.anims.generateFrameNames('ie', { prefix: 'ie', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left2', frames: this.anims.generateFrameNames('iw', { prefix: 'iw', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up2', frames: this.anims.generateFrameNames('in', { prefix: 'in', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down2', frames: this.anims.generateFrameNames('is', { prefix: 'is', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn2', frames: this.anims.generateFrameNames('t', { prefix: 't', end: 19, zeroPad: 4}), frameRate: 10, repeat: -1});
        //fine mostro
        setTimeout(() =>{
            cammina=1
            let n= this.add.image(0,0,"n").setOrigin(0).setDepth(6).setScale(4);
            setTimeout(() =>{
                this.porta = this.sound.add('porta');
                this.porta.setVolume(vol);
                this.porta.play();
                setTimeout(() =>{
                    this.porta.stop();
                    //suono
                    this.sottof = this.sound.add('sottofondo', { loop: -1 });
                    this.sottof.setVolume(vol);
                    this.sottof.play();
                    n.setVisible(false);
                    cammina=0
                    //mappa
                    const map = this.make.tilemap({key:"map",tileWidth:35,tileHeight:35});
                    const tileset = map.addTilesetImage("cantina","tiles3");
                    const layer = map.createLayer("sfondoCantina", tileset, 0, 0);
                    const ostacoliCantina = map.createLayer("muriCantina", tileset, 0, 0);

                    this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
                    this.cameras.main.startFollow(this.omino)

                    this.physics.add.collider(this.monster,ostacoliCantina);
                    this.physics.add.collider(this.omino,ostacoliCantina);
                    ostacoliCantina.setCollisionByProperty({colliders:true});
                    ostacoliCantina.setCollision([3056, 3057, 3058, 3083, 3085, 3105, 3106, 3107, 3108, 3109, 3110, 3112, 3113, 3114, 3115, 3116, 3132, 3134, 3135, 3136, 3139, 3140, 3142, 3143, 3157, 3158, 3159, 3169, 3170, 3184, 3185, 3196, 3197, 3211, 3212, 3216, 3224, 3238, 3241, 3250, 3251, 3265, 3268, 3273, 3277, 3278, 3292, 3295, 3298, 3300, 3302, 3305, 3319, 3320, 3324, 3327, 3330, 3332, 3347, 3348, 3359, 3374, 3375, 3378, 3379, 3380, 3381, 3382, 3383, 3386, 3401, 3405, 3406, 3407, 3408, 3409, 3410, 3411, 3412, 3413, 3428, 3431, 3432, 3455, 3456, 3457, 3458, 3459]);
                
                }, 5000)
            }, 300)
        }, 300)

        this.mioTasto=this.input.keyboard.createCursorKeys();

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

        this.cursorKeys = this.joystick.createCursorKeys();

        this.physics.add.collider(this.omino,this.monster,() =>{
            let n2

            if(cammina==0){
                cammina=1
                this.sottof.stop();
                this.urlo.stop();
                this.monster.setVelocityX(0)
                this.monster.setVelocityY(0)
                this.omino.setDepth(0);
                this.monster.setDepth(0);
                n2 = this.add.image(this.omino.x-300,this.omino.y-300,"n").setOrigin(0).setDepth(3).setScale(4).setVisible(true);
                let b=this.add.image(this.omino.x-300,this.omino.y-300,"b").setOrigin(0).setDepth(3.5).setScale(4).setVisible(false);
                setTimeout(() => {
                    b.setVisible(true);
                    setTimeout(() => {
                        b.setVisible(false);
                        setTimeout(() => {
                            b.setVisible(true);
                            setTimeout(() => {
                                b.setVisible(false);
                                setTimeout(() => {
                                    cambia=1
                                },1000)
                            },400)
                        },400)
                    },400)
                },400)
            }
            if(cambia==1){
                // console.log("cambia")
                this.scene.start("Elnath");
            }
        });
    }

    dumpJoyStickState() {
        var cursorKeys = this.cursorKeys;
        this.leftPressed = cursorKeys.left.isDown;
        this.rightPressed = cursorKeys.right.isDown;
        this.upPressed = cursorKeys.up.isDown;
        this.downPressed = cursorKeys.down.isDown;
    }

    update(time,delta){
        
        if(attiva==0 && this.omino.y>=680){
            attiva=1;
            vel=100
            this.monster.anims.play('turn2', true);
            setTimeout(() => {
                this.urlo = this.sound.add('UrloM');
                this.urlo.setVolume(vol);
                this.urlo.play();
                at=1
            },3000)
        }
        if(at==1){
            //movimento mostro
            this.physics.accelerateToObject(this.monster, this.omino);
            if(this.omino.y<this.monster.y){
                this.monster.anims.play('up2', true);
            } else{
                this.monster.anims.play('down2', true);
            }
        }

        if(cammina==1){
            this.joystick.setVisible(false);
        } else {
            this.joystick.setVisible(true);
        }
        
        if ((this.mioTasto.left.isDown || this.leftPressed) && cammina==0)
        {
            this.omino.setVelocityX(-vel);

            this.omino.anims.play('left', true);
        }
        else if ((this.mioTasto.right.isDown || this.rightPressed) && cammina==0)
        {
            this.omino.setVelocityX(vel);
           

            this.omino.anims.play('right', true);
        }
        else if ((this.mioTasto.down.isDown || this.downPressed) && cammina==0)
        {
            this.omino.setVelocityY(vel);

            this.omino.anims.play('down', true);
        }
        else if ((this.mioTasto.up.isDown || this.upPressed) && cammina==0)
        {
            this.omino.setVelocityY(-vel);
            

            this.omino.anims.play('up', true);
        }
        else
        {
            this.omino.setVelocityX(0);

            this.omino.anims.play('turn', true);
        }
    }
}