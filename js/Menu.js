var anim=0

class Menu extends Phaser.Scene {
    constructor(){
        super("Menu");
    }

    preload(){
        this.load.image("menu","./assets/menu.png");
        this.load.image("nero","./assets/neroMod.png");
        this.load.image("pa","./assets/pav.png");
        this.load.image("morto","./assets/MenuButtons/morto.png");
        this.load.image("pla","./assets/MenuButtons/PlayButton.png");
        this.load.image("opt","./assets/MenuButtons/OptionsButton.png");
        this.load.audio('aud', './assets/audio/menu.mp3');
        this.load.atlas('in', './assets/monster/n.png', './assets/monster/n.json');
        this.load.atlas('ie', './assets/monster/e.png', './assets/monster/e.json');
        this.load.atlas('iw', './assets/monster/w.png', './assets/monster/w.json');
        this.load.atlas('is', './assets/monster/s.png', './assets/monster/s.json');
        this.load.atlas('t', './assets/monster/t.png', './assets/monster/t.json');
        this.load.atlas('a', './assets/monster/a.png', './assets/monster/a.json');
    }

    create(){
        //mostro
        anim=0
        this.anims.create({ key: 'right2', frames: this.anims.generateFrameNames('ie', { prefix: 'ie', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left2', frames: this.anims.generateFrameNames('iw', { prefix: 'iw', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up2', frames: this.anims.generateFrameNames('in', { prefix: 'in', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down2', frames: this.anims.generateFrameNames('is', { prefix: 'is', end: 12, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn2', frames: this.anims.generateFrameNames('t', { prefix: 't', end: 19, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'att2', frames: this.anims.generateFrameNames('a', { prefix: 'a', end: 23, zeroPad: 4}), frameRate: 10, repeat: -1});

        //suono
        this.aud = this.sound.add('aud', { loop: -1 });
        this.aud.setVolume(vol);
        this.aud.play();
        //start
        this.add.image(220,124,"morto").setOrigin(0).setDepth(1).setScale(3).setVisible(true);
        this.add.image(0,30,"menu").setOrigin(0).setDepth(0).setScale(0.41).setVisible(true);
        this.add.image(0,288,"pa").setOrigin(0).setDepth(2).setScale(0.41).setVisible(true);
        this.add.image(0,-490,"nero").setOrigin(0).setDepth(3).setScale(0.55).setVisible(true);
        let playButton= this.add.image(115,300,"pla").setOrigin(0).setDepth(10).setScale(0.18);
        playButton.setInteractive();
        playButton.on('pointerdown', ()=>{
            this.aud.stop();
            this.scene.start("Presentazione")
        });

        //option
        let optionButton= this.add.image(235,300,"opt").setOrigin(0).setDepth(10).setScale(0.18);
        optionButton.setInteractive();
        optionButton.on('pointerdown', ()=>{
            this.aud.stop();
            this.scene.start("Opz")
        });
    }

    update(){
        if(anim==0){
            anim=1
            this.monster =this.physics.add.sprite(300, 122, 't').setDragX(500).setScale(1).setDepth(2);
            this.monster.anims.play('up2', true,{ loop: -1 });
            setTimeout(() =>{
                this.monster.anims.play('down2', true,{ loop: -1 });
                setTimeout(() =>{
                    this.monster.anims.play('turn2', true,{ loop: -1 });
                    setTimeout(() =>{
                        this.monster.setVisible(false);
                        setTimeout(() =>{
                            this.monster =this.physics.add.sprite(215, 320, 'is').setDragX(500).setScale(4).setDepth(5);
                            this.monster.anims.play('att2', true,{ loop: -1 });
                            setTimeout(() =>{
                                this.monster.anims.play('turn2', true,{ loop: -1 });
                                setTimeout(() =>{
                                    this.monster.setVisible(false)
                                    setTimeout(() =>{
                                        anim=0
                                    }, 1500)
                                }, 800)
                            }, 2000)
                        }, 1500)
                    }, 2000)
                }, 2000)
            }, 4000)
        }
    }
}