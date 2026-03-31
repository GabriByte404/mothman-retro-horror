var attivo=0
var menuButton

class lab extends Phaser.Scene{
    constructor(){
        super("lab");
    }

    preload(){
        this.load.image("tiles5","./assets/labirinto.png");
        this.load.tilemapTiledJSON('map',"./assets/map1.json");
        this.load.atlas('bob', './assets/bob/bob.png', '/assets/bob/bob.json');
        this.load.atlas('sgherro', './assets/monster/sgherro.png', '/assets/monster/sgherro.json');
        this.load.atlas('coin', './assets/coin.png', '/assets/coin.json');
        this.load.audio('coinA','assets/audio/coin.mp3');
        this.load.image("chest","./assets/chest.png");
        this.load.image("vuota","./assets/vuota.png");
        this.load.image("luce","./assets/dialoghi/dialogo.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
        this.load.image("achievement","./assets/achievement.png");
        this.load.audio('lava', './assets/audio/lava.mp3');
        this.load.audio('chestO', './assets/audio/chestOpen.wav');
        this.load.audio('colpito', './assets/audio/colpito.wav');
        this.load.audio('over', './assets/audio/gameOver.wav');
        this.load.image("gameOver", "./assets/gameOverG.png");
        this.load.image("MN", "./assets/MenuButtons/menuButton.png");
        this.load.image('joystickThumb', './assets/control.png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(){
        this.lava = this.sound.add("lava", { loop: -1 });
        this.lava.setVolume(vol);
        this.lava.play();
        cammina=1
        var esperienza = this.add.text(16, 16, 'XP: '+Xp, {
            fontSize: '20px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff',
            stroke: true
        });
        esperienza.setScrollFactor(0);
        esperienza.setVisible(true)
        esperienza.setDepth(15)
        //pezzo arma
        this.arma=this.add.image(786,790,"chest").setOrigin(0).setDepth(3).setScale(0.06);
       
        //animazioni
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNames('bob', { prefix: 'right', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNames('bob', { prefix: 'left', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('bob', { prefix: 'up', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('bob', { prefix: 'down', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('bob', { prefix: 'idle', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
 
        this.omino =this.physics.add.sprite(225, 760, 'bob').setDragX(500).setDragY(500).setScale(1.0).setDepth(5);
        
        //sgherri
        this.monster1 =this.physics.add.sprite(470, 1300, 'sgherro').setScale(1).setDepth(5);
        this.monster2 =this.physics.add.sprite(420, 293, 'sgherro').setScale(1).setDepth(5);
        this.monster3 =this.physics.add.sprite(800, 570, 'sgherro').setScale(1).setDepth(5);
        this.monster4 =this.physics.add.sprite(1310, 570, 'sgherro').setScale(1).setDepth(5);
        this.anims.create({ key: 'right3', frames: this.anims.generateFrameNames('sgherro', { prefix: 'right', end: 6, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left3', frames: this.anims.generateFrameNames('sgherro', { prefix: 'left', end: 6, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down3', frames: this.anims.generateFrameNames('sgherro', { prefix: 'down', end: 4, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up3', frames: this.anims.generateFrameNames('sgherro', { prefix: 'up', end: 6, zeroPad: 4}), frameRate: 10, repeat: -1});

        this.monster1.setVelocityX(140);
        this.monster1.anims.play('right3', true);
        this.monster2.setVelocityX(140);
        this.monster2.anims.play('right3', true);
        this.monster3.setVelocityX(140);
        this.monster3.anims.play('right3', true);
        this.monster4.setVelocityY(140);
        this.monster4.anims.play('down3', true);
        //fine mostro

        // monete
        this.anims.create({ key: 'moneta', frames: this.anims.generateFrameNames('coin', { prefix: 'coin', end: 9, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.monete=this.physics.add.sprite(290, 425, 'coin').setScale(1).setDepth(5);
        this.monete.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        this.monete2=this.physics.add.sprite(480, 760, 'coin').setScale(1).setDepth(5);
        this.monete2.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete2,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        this.monete3=this.physics.add.sprite(865, 980, 'coin').setScale(1).setDepth(5);
        this.monete3.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete3,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        this.monete4=this.physics.add.sprite(1000, 1310, 'coin').setScale(1).setDepth(5);
        this.monete4.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete4,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        this.monete5=this.physics.add.sprite(1200, 285, 'coin').setScale(1).setDepth(5);
        this.monete5.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete5,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        this.monete6=this.physics.add.sprite(1315, 700, 'coin').setScale(1).setDepth(5);
        this.monete6.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete6,(primo, secondo) =>{
            secondo.destroy();
            Xp=Xp+10;
            esperienza.setVisible(false)
            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                fontSize: '20px',
                padding: { x: 10, y: 5 },
                fill: '#ffffff',
                stroke: true
            });
            esperienza.setScrollFactor(0);
            esperienza.setVisible(true)
            this.coin = this.sound.add('coinA');
            this.coin.setVolume(vol);
            this.coin.play();
        })

        //moneta invisibile per attivare i rinforzi
        this.monete7=this.physics.add.sprite(800, 835, 'coin').setScale(1).setDepth(5).setVisible(false);
        this.monete7.anims.play('moneta', true);

        this.physics.add.collider(this.omino,this.monete7,(primo, secondo) =>{
            secondo.destroy();
            this.monster5 =this.physics.add.sprite(1310, 750, 'sgherro').setScale(1).setDepth(5);
            this.monster6 =this.physics.add.sprite(1310, 850, 'sgherro').setScale(1).setDepth(5); 
            this.monster5.setVelocityY(140);
            this.monster5.anims.play('down3', true);
            this.monster6.setVelocityY(-140);
            this.monster6.anims.play('up3', true);

            var nRandom5
            this.physics.add.collider(this.monster5,ostacoli,(primo, secondo) =>{
                nRandom5 = Phaser.Math.Between(1, 4);
                switch(nRandom5) {
                    case 1:
                        this.monster5.setVelocityY(140);
                        this.monster5.anims.play('down3', true);
                    break;
                    case 2:
                        this.monster5.setVelocityY(-140);
                        this.monster5.anims.play('up3', true);
                    break;
                    case 3:
                        this.monster5.setVelocityX(140);
                        this.monster5.anims.play('right3', true);
                    break;
                    case 4:
                        this.monster5.setVelocityX(-140);
                        this.monster5.anims.play('left3', true);
                    break;
                }
                });
                var nRandom6
                this.physics.add.collider(this.monster6,ostacoli,(primo, secondo) =>{
                    nRandom6 = Phaser.Math.Between(1, 4);
                    switch(nRandom6) {
                        case 1:
                            this.monster6.setVelocityY(140);
                            this.monster6.anims.play('down3', true);
                        break;
                        case 2:
                            this.monster6.setVelocityY(-140);
                            this.monster6.anims.play('up3', true);
                        break;
                        case 3:
                            this.monster6.setVelocityX(140);
                            this.monster6.anims.play('right3', true);
                        break;
                        case 4:
                            this.monster6.setVelocityX(-140);
                            this.monster6.anims.play('left3', true);
                        break;
                    }
                });

                //5
                this.physics.add.collider(this.omino,this.monster5,(primo, secondo) =>{
                    this.colp = this.sound.add('colpito');
                    this.colp.setVolume(vol);
                    this.colp.play();

                    this.monster5.x=1310;
                    this.monster5.y=750;
                    cammina=0
                    if(Xp>0){
                        Xp=Xp-20;
                        if(Xp>0){
                            esperienza.setVisible(false)
                            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                                fontSize: '20px',
                                padding: { x: 10, y: 5 },
                                fill: '#ffffff',
                                stroke: true
                            });
                            esperienza.setScrollFactor(0);
                            esperienza.setVisible(true)
                            this.monster5.setVelocityX(0);
                            this.monster5.setVelocityY(0);
                            cammina=1
                            setTimeout(() =>{
                                this.monster5.setVelocityX(140);
                                this.monster5.anims.play('right3', true);
                            }, 1000)
                        } else{
                            esperienza.setVisible(false)
                            esperienza = this.add.text(16, 16, 'XP: '+0, {
                                fontSize: '20px',
                                padding: { x: 10, y: 5 },
                                fill: '#ffffff',
                                stroke: true
                            });
                            this.omino.setVisible(false)
                            this.lava.stop();
                            setTimeout(() =>{
                                esperienza.setScrollFactor(0);
                                this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                                this.Gover = this.sound.add('over');
                                this.Gover.setVolume(vol);
                                this.Gover.play();
                                this.monster5.setVelocityX(0);
                                this.monster5.setVelocityY(0);
                                this.monster5.anims.stop('right3', true);
                                menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                                menuButton.setInteractive();
                                menuButton.on('pointerdown', ()=>{
                                    Xp=0
                                    this.scene.start("Menu")
                                });
                            }, 600)
                            
                        }
                    } else{
                        esperienza.setVisible(false)
                        esperienza = this.add.text(16, 16, 'XP: '+0, {
                            fontSize: '20px',
                            padding: { x: 10, y: 5 },
                            fill: '#ffffff',
                            stroke: true
                        });
                        this.omino.setVisible(false)
                        this.lava.stop();
                        setTimeout(() =>{
                            esperienza.setScrollFactor(0);
                            this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                            this.Gover = this.sound.add('over');
                            this.Gover.setVolume(vol);
                            this.Gover.play();
                            this.monster5.setVelocityX(0);
                            this.monster5.setVelocityY(0);
                            this.monster5.anims.stop('right3', true);
                            menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                            menuButton.setInteractive();
                            menuButton.on('pointerdown', ()=>{
                                Xp=0
                                this.scene.start("Menu")
                            });
                        }, 600)
                    }
                });

                //6
                this.physics.add.collider(this.omino,this.monster6,(primo, secondo) =>{
                    this.colp = this.sound.add('colpito');
                    this.colp.setVolume(vol);
                    this.colp.play();

                    this.monster6.x=1310;
                    this.monster6.y=850;
                    cammina=0
                    if(Xp>0){
                        Xp=Xp-20;
                        if(Xp>0){
                            esperienza.setVisible(false)
                            esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                                fontSize: '20px',
                                padding: { x: 10, y: 5 },
                                fill: '#ffffff',
                                stroke: true
                            });
                            esperienza.setScrollFactor(0);
                            esperienza.setVisible(true)
                            this.monster6.setVelocityX(0);
                            this.monster6.setVelocityY(0);
                            cammina=1
                            setTimeout(() =>{
                                this.monster6.setVelocityX(140);
                                this.monster6.anims.play('right3', true);
                            }, 1000)
                        } else{
                            esperienza.setVisible(false)
                            esperienza = this.add.text(16, 16, 'XP: '+0, {
                                fontSize: '20px',
                                padding: { x: 10, y: 5 },
                                fill: '#ffffff',
                                stroke: true
                            });
                            this.omino.setVisible(false)
                            this.lava.stop();
                            setTimeout(() =>{
                                esperienza.setScrollFactor(0);
                                this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                                this.Gover = this.sound.add('over');
                                this.Gover.setVolume(vol);
                                this.Gover.play();
                                this.monster6.setVelocityX(0);
                                this.monster6.setVelocityY(0);
                                this.monster6.anims.stop('right3', true);
                                menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                                menuButton.setInteractive();
                                menuButton.on('pointerdown', ()=>{
                                    Xp=0
                                    this.scene.start("Menu")
                                });
                            }, 600)
                            
                        }
                    } else{
                        this.omino.setVisible(false)
                        esperienza.setVisible(false)
                        esperienza = this.add.text(16, 16, 'XP: '+0, {
                            fontSize: '20px',
                            padding: { x: 10, y: 5 },
                            fill: '#ffffff',
                            stroke: true
                        });
                        this.lava.stop();
                        setTimeout(() =>{
                            esperienza.setScrollFactor(0);
                            this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                            this.Gover = this.sound.add('over');
                            this.Gover.setVolume(vol);
                            this.Gover.play();
                            this.monster6.setVelocityX(0);
                            this.monster6.setVelocityY(0);
                            this.monster6.anims.stop('right3', true);
                            menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                            menuButton.setInteractive();
                            menuButton.on('pointerdown', ()=>{
                                XP=0
                                this.scene.start("Menu")
                            });
                        }, 600)
                    }
                });
        })

        //mappa
        const map = this.make.tilemap({key:"map",tileWidth:35,tileHeight:35});
        const tileset = map.addTilesetImage("labirinto","tiles5");
        const layer = map.createLayer("sfondoLabirinto", tileset, 0, 0);
        const ostacoli = map.createLayer("muriLabirinto", tileset, 0, 0);
        const fine = map.createLayer("fineLab", tileset, 0, 0);

        fine.setCollisionByProperty({colliders:true});
        fine.setCollision([5579, 5615])
        this.physics.add.collider(this.omino,fine,(primo, secondo) =>{
            if(attivo==1){
                this.lava.stop();
                cammina=0
                this.scene.start("finalFight");
            }
        });
        //collisione sgherro-bob
        this.physics.add.collider(this.omino,this.monster1,(primo, secondo) =>{
            this.colp = this.sound.add('colpito');
            this.colp.setVolume(vol);
            this.colp.play();

            this.monster1.x=470;
            this.monster1.y=1300;
            cammina=0
            if(Xp>0){
                Xp=Xp-20;
                if(Xp>0){
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    esperienza.setScrollFactor(0);
                    esperienza.setVisible(true)
                    this.monster1.setVelocityX(0);
                    this.monster1.setVelocityY(0);
                    cammina=1
                    setTimeout(() =>{
                        this.monster1.setVelocityY(140);
                        this.monster1.anims.play('down3', true);
                    }, 1000)
                } else{
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+0, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    this.omino.setVisible(false)
                    this.lava.stop();
                    setTimeout(() =>{
                        esperienza.setScrollFactor(0);
                        this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                        this.Gover = this.sound.add('over');
                        this.Gover.setVolume(vol);
                        this.Gover.play();
                        this.monster1.setVelocityX(0);
                        this.monster1.setVelocityY(0);
                        this.monster1.anims.stop('right3', true);
                        menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                        menuButton.setInteractive();
                        menuButton.on('pointerdown', ()=>{
                            Xp=0
                            this.scene.start("Menu")
                        });
                    }, 600)
                    
                }
            } else{
                this.omino.setVisible(false)
                esperienza.setVisible(false)
                esperienza = this.add.text(16, 16, 'XP: '+0, {
                    fontSize: '20px',
                    padding: { x: 10, y: 5 },
                    fill: '#ffffff',
                    stroke: true
                });
                this.lava.stop();
                setTimeout(() =>{
                    esperienza.setScrollFactor(0);
                    this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                    this.Gover = this.sound.add('over');
                    this.Gover.setVolume(vol);
                    this.Gover.play();
                    this.monster1.setVelocityX(0);
                    this.monster1.setVelocityY(0);
                    this.monster1.anims.stop('right3', true);
                    menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                    menuButton.setInteractive();
                    menuButton.on('pointerdown', ()=>{
                        Xp=0
                        this.scene.start("Menu")
                    });
                }, 600)
            }
        });

        //2
        this.physics.add.collider(this.omino,this.monster2,(primo, secondo) =>{
            this.colp = this.sound.add('colpito');
            this.colp.setVolume(vol);
            this.colp.play();

            this.monster2.x=420;
            this.monster2.y=293;
            cammina=0
            if(Xp>0){
                Xp=Xp-20;
                if(Xp>0){
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    esperienza.setScrollFactor(0);
                    esperienza.setVisible(true)
                    this.monster2.setVelocityX(0);
                    this.monster2.setVelocityY(0);
                    cammina=1
                    setTimeout(() =>{
                        this.monster2.setVelocityY(140);
                        this.monster2.anims.play('down3', true);
                    }, 1000)
                } else{
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+0, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    this.omino.setVisible(false)
                    this.lava.stop();
                    setTimeout(() =>{
                        esperienza.setScrollFactor(0);
                        this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                        this.Gover = this.sound.add('over');
                        this.Gover.setVolume(vol);
                        this.Gover.play();
                        this.monster2.setVelocityX(0);
                        this.monster2.setVelocityY(0);
                        this.monster2.anims.stop('right3', true);
                        menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                        menuButton.setInteractive();
                        menuButton.on('pointerdown', ()=>{
                            Xp=0
                            this.scene.start("Menu")
                        });
                    }, 600)
                    
                }
            } else{
                this.omino.setVisible(false)
                esperienza.setVisible(false)
                esperienza = this.add.text(16, 16, 'XP: '+0, {
                    fontSize: '20px',
                    padding: { x: 10, y: 5 },
                    fill: '#ffffff',
                    stroke: true
                });
                this.lava.stop();
                setTimeout(() =>{
                    esperienza.setScrollFactor(0);
                    this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                    this.Gover = this.sound.add('over');
                    this.Gover.setVolume(vol);
                    this.Gover.play();
                    this.monster2.setVelocityX(0);
                    this.monster2.setVelocityY(0);
                    this.monster2.anims.stop('right3', true);
                    menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                    menuButton.setInteractive();
                    menuButton.on('pointerdown', ()=>{
                        Xp=0
                        this.scene.start("Menu")
                    });
                }, 600)
            }
        });

        //3
        this.physics.add.collider(this.omino,this.monster3,(primo, secondo) =>{
            this.colp = this.sound.add('colpito');
            this.colp.setVolume(vol);
            this.colp.play();

            this.monster3.x=800;
            this.monster3.y=570;
            cammina=0
            if(Xp>0){
                Xp=Xp-20;
                if(Xp>0){
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    esperienza.setScrollFactor(0);
                    esperienza.setVisible(true)
                    this.monster3.setVelocityX(0);
                    this.monster3.setVelocityY(0);
                    cammina=1
                    setTimeout(() =>{
                        this.monster3.setVelocityY(140);
                        this.monster3.anims.play('down3', true);
                    }, 1000)
                } else{
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+0, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    this.omino.setVisible(false)
                    this.lava.stop();
                    setTimeout(() =>{
                        esperienza.setScrollFactor(0);
                        this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                        this.Gover = this.sound.add('over');
                        this.Gover.setVolume(vol);
                        this.Gover.play();
                        this.monster3.setVelocityX(0);
                        this.monster3.setVelocityY(0);
                        this.monster3.anims.stop('right3', true);
                        menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                        menuButton.setInteractive();
                        menuButton.on('pointerdown', ()=>{
                            Xp=0
                            this.scene.start("Menu")
                        });
                    }, 600)
                    
                }
            } else{
                this.omino.setVisible(false)
                esperienza.setVisible(false)
                esperienza = this.add.text(16, 16, 'XP: '+0, {
                    fontSize: '20px',
                    padding: { x: 10, y: 5 },
                    fill: '#ffffff',
                    stroke: true
                });
                this.lava.stop();
                setTimeout(() =>{
                    esperienza.setScrollFactor(0);
                    this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                    this.Gover = this.sound.add('over');
                    this.Gover.setVolume(vol);
                    this.Gover.play();
                    this.monster3.setVelocityX(0);
                    this.monster3.setVelocityY(0);
                    this.monster3.anims.stop('right3', true);
                    menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                    menuButton.setInteractive();
                    menuButton.on('pointerdown', ()=>{
                        Xp=0
                        this.scene.start("Menu")
                    });
                }, 600)
            }
        });

        //4
        this.physics.add.collider(this.omino,this.monster4,(primo, secondo) =>{
            this.colp = this.sound.add('colpito');
            this.colp.setVolume(vol);
            this.colp.play();

            this.monster4.x=1310;
            this.monster4.y=570;
            cammina=0
            if(Xp>0){
                Xp=Xp-20;
                if(Xp>0){
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    esperienza.setScrollFactor(0);
                    esperienza.setVisible(true)
                    this.monster4.setVelocityX(0);
                    this.monster4.setVelocityY(0);
                    cammina=1
                    setTimeout(() =>{
                        this.monster4.setVelocityX(140);
                        this.monster4.anims.play('right3', true);
                    }, 1000)
                } else{
                    esperienza.setVisible(false)
                    esperienza = this.add.text(16, 16, 'XP: '+0, {
                        fontSize: '20px',
                        padding: { x: 10, y: 5 },
                        fill: '#ffffff',
                        stroke: true
                    });
                    this.omino.setVisible(false)
                    this.lava.stop();
                    setTimeout(() =>{
                        esperienza.setScrollFactor(0);
                        this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                        this.Gover = this.sound.add('over');
                        this.Gover.setVolume(vol);
                        this.Gover.play();
                        this.monster4.setVelocityX(0);
                        this.monster4.setVelocityY(0);
                        this.monster4.anims.stop('right3', true);
                        menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                        menuButton.setInteractive();
                        menuButton.on('pointerdown', ()=>{
                            Xp=0
                            this.scene.start("Menu")
                        });
                    }, 600)
                    
                }
            } else{
                this.omino.setVisible(false)
                esperienza.setVisible(false)
                esperienza = this.add.text(16, 16, 'XP: '+0, {
                    fontSize: '20px',
                    padding: { x: 10, y: 5 },
                    fill: '#ffffff',
                    stroke: true
                });
                this.lava.stop();
                setTimeout(() =>{
                    esperienza.setScrollFactor(0);
                    this.add.image(this.omino.x-365,this.omino.y-200,"gameOver").setOrigin(0).setDepth(5).setScale(0.32);
                    this.Gover = this.sound.add('over');
                    this.Gover.setVolume(vol);
                    this.Gover.play();
                    this.monster4.setVelocityX(0);
                    this.monster4.setVelocityY(0);
                    this.monster4.anims.stop('right3', true);
                    menuButton= this.add.image(this.omino.x-60,this.omino.y+120,"MN").setOrigin(0).setDepth(6).setScale(0.2);
                    menuButton.setInteractive();
                    menuButton.on('pointerdown', ()=>{
                        Xp=0
                        this.scene.start("Menu")
                    });
                }, 600)
            }
        });

        //fine collisione sgherro-bob

        var nRandom
        this.physics.add.collider(this.monster1,ostacoli,(primo, secondo) =>{
            nRandom = Phaser.Math.Between(1, 4);
            switch(nRandom) {
                case 1:
                    this.monster1.setVelocityY(140);
                    this.monster1.anims.play('down3', true);
                break;
                case 2:
                    this.monster1.setVelocityY(-140);
                    this.monster1.anims.play('up3', true);
                break;
                case 3:
                    this.monster1.setVelocityX(140);
                    this.monster1.anims.play('right3', true);
                break;
                case 4:
                    this.monster1.setVelocityX(-140);
                    this.monster1.anims.play('left3', true);
                break;
              }
        });
        var nRandom2
        this.physics.add.collider(this.monster2,ostacoli,(primo, secondo) =>{
            nRandom2 = Phaser.Math.Between(1, 4);
            switch(nRandom2) {
                case 1:
                    this.monster2.setVelocityY(140);
                    this.monster2.anims.play('down3', true);
                break;
                case 2:
                    this.monster2.setVelocityY(-140);
                    this.monster2.anims.play('up3', true);
                break;
                case 3:
                    this.monster2.setVelocityX(140);
                    this.monster2.anims.play('right3', true);
                break;
                case 4:
                    this.monster2.setVelocityX(-140);
                    this.monster2.anims.play('left3', true);
                break;
              }
        });
        var nRandom3
        this.physics.add.collider(this.monster3,ostacoli,(primo, secondo) =>{
            nRandom3 = Phaser.Math.Between(1, 4);
            switch(nRandom3) {
                case 1:
                    this.monster3.setVelocityY(140);
                    this.monster3.anims.play('down3', true);
                break;
                case 2:
                    this.monster3.setVelocityY(-140);
                    this.monster3.anims.play('up3', true);
                break;
                case 3:
                    this.monster3.setVelocityX(140);
                    this.monster3.anims.play('right3', true);
                break;
                case 4:
                    this.monster3.setVelocityX(-140);
                    this.monster3.anims.play('left3', true);
                break;
              }
        });
        var nRandom4
        this.physics.add.collider(this.monster4,ostacoli,(primo, secondo) =>{
            nRandom4 = Phaser.Math.Between(1, 4);
            switch(nRandom4) {
                case 1:
                    this.monster4.setVelocityY(140);
                    this.monster4.anims.play('down3', true);
                break;
                case 2:
                    this.monster4.setVelocityY(-140);
                    this.monster4.anims.play('up3', true);
                break;
                case 3:
                    this.monster4.setVelocityX(140);
                    this.monster4.anims.play('right3', true);
                break;
                case 4:
                    this.monster4.setVelocityX(-140);
                    this.monster4.anims.play('left3', true);
                break;
              }
        });
        this.physics.add.collider(this.omino,ostacoli);
        ostacoli.setCollisionByProperty({colliders:true});
        ostacoli.setCollision([4970, 4971, 4972, 4973, 4974, 4975, 4976, 4977, 4978, 4979, 4980, 4981, 4982, 4983, 4984, 4985, 4986, 4987, 4988, 4989, 4990, 4991, 4992, 4993, 4994, 4995, 4996, 4997, 4998, 4999, 5000, 5001, 5002, 5006, 5038, 5042, 5074, 5078, 5081, 5082, 5083, 5084, 5085, 5088, 5089, 5090, 5091, 5092, 5093, 5094, 5095, 5096, 5097, 5098, 5099, 5100, 5101, 5102, 5103, 5104, 5105, 5106, 5107, 0, 0, 5110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5114, 0, 0, 5117, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5139, 0, 0, 0, 0, 5144, 0, 5146, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5150, 0, 0, 5153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5175, 0, 0, 0, 0, 5180, 0, 5182, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5186, 0, 0, 5189, 0, 0, 5192, 5193, 5194, 5195, 5196, 5197, 5198, 5199, 5200, 5201, 5202, 5203, 5204, 5205, 5206, 5207, 5210, 5211, 5212, 5213, 5216, 5218, 5222, 5225, 5228, 5242, 5249, 5252, 5254, 5258, 5261, 5264, 5267, 5268, 5269, 0, 0, 5272, 5273, 5274, 5275, 5276, 5277, 5278, 5279, 5280, 5281, 0, 0, 0, 5285, 0, 0, 5288, 0, 5290, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5294, 0, 0, 5297, 0, 0, 5300, 0, 5302, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5318, 0, 0, 5321, 0, 0, 0, 0, 5326, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5330, 0, 0, 5333, 0, 0, 5336, 0, 5338, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5354, 0, 0, 5357, 0, 0, 0, 0, 5362, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5366, 0, 0, 5369, 0, 0, 5372, 0, 5374, 0, 0, 5377, 5378, 5379, 5380, 0, 0, 5383, 5384, 5385, 5386, 5387, 0, 0, 5390, 0, 0, 5393, 0, 0, 5396, 0, 5398, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5402, 0, 0, 5405, 0, 0, 5408, 5409, 5410, 0, 0, 5413, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5423, 0, 0, 5426, 0, 0, 5429, 0, 0, 5432, 0, 5434, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5438, 0, 0, 5441, 0, 0, 5444, 0, 5446, 0, 0, 5449, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5459, 0, 0, 5462, 0, 0, 5465, 0, 0, 5468, 0, 5470, 5473, 5474, 0, 0, 5477, 0, 0, 5480, 0, 5482, 0, 0, 5485, 5488, 5489, 5490, 5491, 5492, 5493, 5495, 5498, 5501, 5504, 5506, 5509, 5509, 5513, 5516, 5518, 5521, 5524])
        ostacoli.setCollision([5529, 5531, 5534, 5537, 5540, 5542, 5543, 5544, 5545, 5545, 5549, 5552, 5554, 5557, 5560, 5565, 5567, 5570, 5573, 5576, 5580, 5581, 5582, 5585, 5588, 5590, 5593, 5594, 5595, 5596, 5601, 5603, 5609, 5612, 5616, 5618, 5621, 5624, 5626, 0, 0, 5629, 0, 0, 5632, 5637, 0, 5639, 5645, 0, 0, 5648, 0, 5650, 5651, 5652, 5654, 0, 0, 5657, 0, 0, 5660, 5665, 5668, 5669, 0, 0, 5672, 5673, 0, 5675, 0, 0, 5678, 5679, 5680, 5681, 0, 0, 5684, 0, 5686, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5690, 0, 0, 5693, 0, 0, 5696, 0, 0, 0, 0, 5701, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5711, 0, 0, 5714, 5715, 5716, 5717, 0, 0, 5720, 0, 5722, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5726, 0, 0, 5729, 0, 0, 5732, 0, 0, 0, 0, 5737, 5738, 5739, 5740, 5741, 5742, 5743, 5746, 5747, 5750, 5753, 5756, 5758, 5762, 5765, 5766, 5767, 5768, 5770, 5777, 5786, 5792, 5794, 5798, 5801,, 5804, 0, 5806, 0, 0, 0, 0, 0, 0, 5813, 0, 0, 0, 0, 0, 0, 0, 0, 5822, 0, 0, 0, 0, 0, 5828, 0, 5830, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5834, 0, 0, 5837, 0, 0, 5840, 0, 5842, 5843, 5844, 5845, 5846, 5847, 5848, 5849, 5850, 5851, 5852, 5853, 5854, 5855, 5856, 5857, 5858, 0, 0, 5861, 0, 0, 5864, 0, 5866, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5870, 0, 0, 5873, 0, 0, 5876, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5897, 0, 0, 5900, 0, 5902, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5906, 0, 0, 5909, 0, 0, 5912, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5933, 0, 0, 5936, 0, 5938, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5942, 0, 0, 5945, 0, 0, 5948, 5949, 5950, 0, 0, 5953, 5954, 5955, 5956, 5957, 5958, 5959, 5960, 5961, 5962, 5963, 5964, 5965, 5966, 5967, 5968, 5969, 0, 0, 5972, 0, 5974, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5978, 0, 0, 5981, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5991, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6008, 0, 6010, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6014, 0, 0, 6017, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6027, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6044, 0, 6046, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6050, 0, 0, 0, 6054, 6055, 6056, 6057, 6058, 6059, 6060, 6061, 6062, 6063, 6064, 6065, 6066, 0, 0, 6069, 6070, 6071, 6072, 6073, 6074, 6075, 6076, 6077, 6078, 6079, 0, 0, 6082, 6086, 6118, 6122, 6123, 6124, 6125, 6126, 6127, 6128, 6129, 6130, 6131, 6132, 6133, 6134, 6135, 6136, 6137, 6138, 6139, 6140, 6141, 6142, 6143, 6144, 6145, 6146, 6147, 6148, 6149, 6150, 6151, 6152, 6153, 6154]);

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.omino)

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
    }

    dumpJoyStickState() {
        var cursorKeys = this.cursorKeys;
        this.leftPressed = cursorKeys.left.isDown;
        this.rightPressed = cursorKeys.right.isDown;
        this.upPressed = cursorKeys.up.isDown;
        this.downPressed = cursorKeys.down.isDown;
    }

    update(){
        if((this.omino.x>=766 && this.omino.x<=842)&&(this.omino.y>=766 && this.omino.y<=824)&& attivo==0){
            this.open = this.sound.add('chestO');
            this.open.setVolume(vol);
            this.open.play();

            this.omino.setVelocityX(0)
            this.omino.setVelocityY(0)
            cammina=0
            attivo=1
            this.omino.x=800
            this.omino.y=835
            this.arma.setVisible(false);
            this.arma=this.add.image(786,780,"vuota").setOrigin(0).setDepth(3).setScale(0.1).setVisible(true);
            let sblocco3
            let sblocco2
            let achv
            setTimeout(()=>{
                let dia=this.add.image(this.omino.x-228,this.omino.y+80,"luce").setOrigin(0).setDepth(5).setScale(0.32);
                let sblocco=this.add.text(this.omino.x-210, this.omino.y+90, "Bob:", {font: "16px Courier", fill: "black"}).setDepth(6);
                if(lingua=="ita"){
                    sblocco2 = this.add.text(this.omino.x-210, this.omino.y+107, "Ho raccolto anche l'ultimo pezzo dell'arma!", {font: "12px Courier", fill: "black"}).setDepth(6);
                } else if(lingua=="ing"){
                    sblocco2 = this.add.text(this.omino.x-210, this.omino.y+107, "I also collected the last piece of the weapon!", {font: "12px Courier", fill: "black"}).setDepth(6);
                }
                setTimeout(()=>{
                    let achvm
                    if(lingua=="ita"){
                        achvm = this.add.text(this.omino.x-53, this.omino.y-163, "Componente arma trovato", {font: "11px Courier", fill: "white"}).setDepth(4);
                    } else if(lingua=="ing"){
                        achvm = this.add.text(this.omino.x-53, this.omino.y-163, "Weapon component found", {font: "11px Courier", fill: "white"}).setDepth(4);
                    }
                    achv=this.add.image(this.omino.x-100, this.omino.y-198,"achievement").setOrigin(0).setDepth(3).setScale(0.25);
                    if(lingua=="ita"){
                        sblocco3 = this.add.text(this.omino.x-210, this.omino.y+123, "Ora sono pronto per affrontare il Mothman.", {font: "12px Courier", fill: "black"}).setDepth(6);
                    } else if(lingua=="ing"){
                        sblocco3 = this.add.text(this.omino.x-210, this.omino.y+123, "I am now ready to take on the Mothman.", {font: "12px Courier", fill: "black"}).setDepth(6);
                    }
                    setTimeout(() =>{
                        let playButton= this.add.image(this.omino.x+173,this.omino.y+103,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                        playButton.setInteractive();
                            playButton.on('pointerdown', ()=>{
                            dia.setVisible(false);
                            sblocco.setVisible(false);
                            sblocco2.setVisible(false);
                            sblocco3.setVisible(false);
                            playButton.setVisible(false);
                            achv.setVisible(false);
                            achvm.setVisible(false);
                            dia=this.add.image(this.omino.x-228,this.omino.y+80,"luce").setOrigin(0).setDepth(5).setScale(0.32);
                            sblocco=this.add.text(this.omino.x-210, this.omino.y+90, "Bob:", {font: "16px Courier", fill: "black"}).setDepth(6);
                            if(lingua=="ita"){
                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+107, "Oh no! Stanno arrivando altri sgherri!", {font: "12px Courier", fill: "black"}).setDepth(6);
                            } else if(lingua=="ing"){
                                sblocco2 = this.add.text(this.omino.x-210, this.omino.y+107, "Oh no! More henchmen are coming!", {font: "12px Courier", fill: "black"}).setDepth(6);
                            }
                            setTimeout(()=>{
                                if(lingua=="ita"){
                                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+123, "Meglio andarsene..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                } else if(lingua=="ing"){
                                    sblocco3 = this.add.text(this.omino.x-210, this.omino.y+123, "Better to leave..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                }
                                setTimeout(() =>{
                                    let playButton= this.add.image(this.omino.x+173,this.omino.y+103,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                    playButton.setInteractive();
                                        playButton.on('pointerdown', ()=>{
                                        dia.setVisible(false);
                                        sblocco.setVisible(false);
                                        sblocco2.setVisible(false);
                                        sblocco3.setVisible(false);
                                        playButton.setVisible(false);
                                        cammina=1
                                             
                                    })
                                }, 1000)
                            }, 1000)
                        })
                    }, 1000)
                }, 1000)
            }, 500)
        }

        if ((this.mioTasto.left.isDown || this.leftPressed) && cammina==1) {
            this.omino.setVelocityX(-160);
            this.omino.anims.play('left', true);
        } else if ((this.mioTasto.right.isDown || this.rightPressed) && cammina==1) {
            this.omino.setVelocityX(160);
            this.omino.anims.play('right', true);
        } else if ((this.mioTasto.down.isDown || this.downPressed) && cammina==1) {
            this.omino.setVelocityY(160);
            this.omino.anims.play('down', true);
        } else if ((this.mioTasto.up.isDown || this.upPressed) && cammina==1) {
            this.omino.setVelocityY(-160);
            this.omino.anims.play('up', true);
        } else {
            this.omino.setVelocityX(0);
            this.omino.anims.play('turn', true);
        }
    }
}