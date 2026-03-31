class Inizio extends Phaser.Scene {
    constructor() {
        super("Inizio");
    }

    preload() {
        this.load.audio('sottofondo', './assets/audio/pioggia-fulmini.mp3');
        this.load.image("tiles", "./assets/casa.png");
        this.load.tilemapTiledJSON('map', "./assets/map1.json");
        this.load.atlas('bob', './assets/bob/bob.png', './assets/bob/bob.json');
        this.load.image('leftButton', './assets/dialoghi/freccia.png');
        this.load.image('rightButton', './assets/dialoghi/freccia.png');
        this.load.image('upButton', './assets/dialoghi/freccia.png');
        this.load.image('downButton', './assets/dialoghi/freccia.png');
        this.load.image('joystickThumb', './assets/control.png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create() {
        // suono
        this.sottof = this.sound.add('sottofondo', { loop: -1 });
        this.sottof.setVolume(vol);
        this.sottof.play();

        // mappa
        const map = this.make.tilemap({ key: "map", tileWidth: 35, tileHeight: 35 });
        const tileset = map.addTilesetImage("casa", "tiles");
        const layer = map.createLayer("sfondo", tileset, 0, 0);
        const ostacoli = map.createLayer("ostacoli", tileset, 0, 0);
        const sangue = map.createLayer("sangue", tileset, 0, 0);
        const elettricita = map.createLayer("elettricita", tileset, 0, 0);
        const ch = map.createLayer("chiave", tileset, 0, 0);

        // animazioni
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNames('bob', { prefix: 'right', end: 5, zeroPad: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNames('bob', { prefix: 'left', end: 5, zeroPad: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('bob', { prefix: 'up', end: 5, zeroPad: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('bob', { prefix: 'down', end: 5, zeroPad: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('bob', { prefix: 'idle', end: 5, zeroPad: 4 }), frameRate: 10, repeat: -1 });

        this.omino = this.physics.add.sprite(413, 450, 'bob').setDragX(500).setDragY(500).setScale(1.2);

        this.mioTasto = this.input.keyboard.createCursorKeys();

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.omino);

        this.physics.add.collider(this.omino, ostacoli);
        ostacoli.setCollisionByProperty({ colliders: true });
        ostacoli.setCollisionBetween(164, 180);
        ostacoli.setCollisionBetween(388, 392);
        ostacoli.setCollisionBetween(420, 429);
        ostacoli.setCollisionBetween(205, 211);
        ostacoli.setCollisionBetween(436, 439);
        ostacoli.setCollisionBetween(712, 729);
        ostacoli.setCollision([456, 488, 213, 196, 197, 198, 199, 228, 229, 230, 260, 261, 262, 263, 264, 292, 293, 294, 295, 296, 324, 325, 326, 327, 328, 356, 267, 204, 236, 268, 333, 364, 301, 269, 237, 239, 272, 273, 304, 336, 368, 400, 431, 432, 433, 465, 245, 277, 309, 341, 373, 405, 472, 504, 530, 531, 532, 503, 535, 568, 536, 537, 569, 601, 632, 665, 697, 728, 696, 596, 597, 628, 629, 630, 685, 620, 621, 622, 590, 591, 592, 593, 594, 684, 652, 588, 589, 557, 617, 618, 619, 649, 650, 651, 681, 682, 683, 553, 521, 526, 527, 558, 559, 560]);

        this.physics.add.collider(this.omino, sangue, (primo, secondo) => {
            this.scene.start("dialogoSangue");
            this.sottof.stop();
        });
        sangue.setCollisionByProperty({ colliders: true });
        sangue.setCollision(271, 303);

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
    }

    dumpJoyStickState() {
        var cursorKeys = this.cursorKeys;
        this.leftPressed = cursorKeys.left.isDown;
        this.rightPressed = cursorKeys.right.isDown;
        this.upPressed = cursorKeys.up.isDown;
        this.downPressed = cursorKeys.down.isDown;
    }

    update(time, delta) {
        if (this.mioTasto.left.isDown || this.leftPressed) {
            this.omino.setVelocityX(-160);
            this.omino.anims.play('left', true);
        } else if (this.mioTasto.right.isDown || this.rightPressed) {
            this.omino.setVelocityX(160);
            this.omino.anims.play('right', true);
        } else if (this.mioTasto.down.isDown || this.downPressed) {
            this.omino.setVelocityY(160);
            this.omino.anims.play('down', true);
        } else if (this.mioTasto.up.isDown || this.upPressed) {
            this.omino.setVelocityY(-160);
            this.omino.anims.play('up', true);
        } else {
            this.omino.setVelocityX(0);
            this.omino.setVelocityY(0);
            this.omino.anims.play('turn', true);
        }
    }
}