var dialSensei=0
var ok=0

class Elnath extends Phaser.Scene{
    constructor(){
        super("Elnath")
    }
    preload(){
        this.load.image("tiles4","./assets/elnath.png");
        this.load.tilemapTiledJSON('map',"./assets/map1.json");
        this.load.image("sensei","./assets/sensei.png");

        this.load.atlas('bob', './assets/bob/bob.png', './assets/bob/bob.json');

        this.load.image("nero","./assets/nero.png");
        this.load.image("luce","./assets/dialoghi/dialogo.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
        this.load.image("achievement","./assets/achievement.png");

        this.load.audio('bird', './assets/audio/bird.wav');
        this.load.image('joystickThumb', './assets/control.png');
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
    }

    create(){
        var esperienza = this.add.text(16, 16, 'XP: '+Xp, {
            fontSize: '20px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff',
            stroke: true
        });
        esperienza.setScrollFactor(0);
        esperienza.setVisible(false)
        esperienza.setDepth(15)

        this.bird = this.sound.add('bird', { loop: -1 });
        this.bird.setVolume(vol);
        this.bird.play();
        cammina=1
        //animazioni
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNames('bob', { prefix: 'right', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNames('bob', { prefix: 'left', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('bob', { prefix: 'up', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('bob', { prefix: 'down', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('bob', { prefix: 'idle', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
 
        this.omino =this.physics.add.sprite(425, 1100, 'bob').setDragX(500).setDragY(500).setScale(1.2).setDepth(3);

       //mappa
        const map = this.make.tilemap({key:"map",tileWidth:35,tileHeight:35});
        const tileset = map.addTilesetImage("elnath","tiles4");
        const layer = map.createLayer("sfondo4", tileset, 0, 0);
        const ostacoli = map.createLayer("ostacoli4", tileset, 0, 0);
        const xp = map.createLayer("xp", tileset, 0, 0);
        const esci = map.createLayer("esci", tileset, 0, 0);

        this.physics.add.collider(this.omino,ostacoli);
        ostacoli.setCollisionByProperty({colliders:true});
        ostacoli.setCollision([3774, 3807, 3808, 3809, 3810, 3843, 3844, 3845, 3846, 3883, 3859, 3860, 3861, 3862, 3863, 3864, 3865, 3866, 3867, 3868, 3869, 3870, 3871, 3872, 3873, 3874, 3875, 3876, 3877, 3878, 3879, 3882, 3919, 3895, 3896, 3955, 3931, 3991, 3967, 4027, 4003, 4063, 4039, 4099, 4075, 4076, 4077, 4081, 4082, 4098, 4135, 4111, 4112, 4118, 4130, 4131, 4132, 4134, 4171, 4147, 4148, 4154, 4166, 4167, 4168, 4170, 4207, 4183, 4184, 4190, 4206, 4243, 4219, 4220, 4221, 4222, 4223, 4224, 4225, 4226, 4242, 4279, 4255, 4315, 4291, 4351, 4327, 4339, 4387, 4363, 4374, 4375, 4376, 4423, 4399, 4410, 4411, 4412, 4413,  4459, 4435, 4446, 4447, 4448, 4495, 4471, 4531, 4507, 4567, 4543, 4603, 4579, 4639, 4610, 4611, 4612, 4613, 4614, 4615, 4616, 4675, 4646, 4647, 4648, 4649, 4650, 4651, 4652, 4711, 4682, 4683, 4684, 4685, 4686, 4687, 4688, 4689, 4690, 4691, 4692, 4693, 4694, 4695, 4747, 4732, 4733, 4734, 4735, 4736, 4737, 4738, 4739, 4740, 4741, 4742, 4743, 4744, 4745, 4746, 4783, 4777, 4778, 4779, 4780, 4781, 4782, 4783]);

        this.physics.add.collider(this.omino,xp,(primo, secondo) =>{
            let sblocco
            let sblocco2
            let sblocco3
            let dia
            if(Xp<99){
                cammina=0
                dia=this.add.image(this.omino.x-228,this.omino.y+90,"luce").setOrigin(0).setDepth(3).setScale(0.32);
                sblocco=this.add.text(this.omino.x-210, this.omino.y+100, "Il Creatore:", {font: "16px Courier", fill: "black"}).setDepth(6);
                if(lingua=="ita"){
                    sblocco2 = this.add.text(this.omino.x-210, this.omino.y+117, "Complimenti hai raccolto i tuoi primi xp!", {font: "12px Courier", fill: "black"}).setDepth(6);
                } else if(lingua=="ing"){
                    sblocco2 = this.add.text(this.omino.x-210, this.omino.y+117, "Congratulations you have collected your first xp!", {font: "12px Courier", fill: "black"}).setDepth(4);
                }
                Xp=100
                esperienza = this.add.text(16, 16, 'XP: '+Xp, {
                    fontSize: '20px',
                    padding: { x: 10, y: 5 },
                    fill: '#ffffff',
                    stroke: true
                });
                esperienza.setScrollFactor(0);
                esperienza.setDepth(15)
                esperienza.setVisible(true)
                setTimeout(()=>{
                    if(lingua=="ita"){
                        sblocco3 = this.add.text(this.omino.x-210, this.omino.y+133, "Essi saranno memorizzati in alto a sinistra e più ne\nraccoglierai più i tuoi attacchi saranno forti nei\ntuoi scontri.", {font: "12px Courier", fill: "black"}).setDepth(4);
                    } else if(lingua=="ing"){
                        sblocco3 = this.add.text(this.omino.x-210, this.omino.y+133, "They will be stored in the upper left corner and the\nmore you collect the more your attacks will be\nstrong in your clashes.", {font: "12px Courier", fill: "black"}).setDepth(4);
                    }
                    setTimeout(() =>{
                        let playButton= this.add.image(this.omino.x+173,this.omino.y+113,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
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
            }
            
        });
        xp.setCollisionByProperty({colliders:true});
        xp.setCollision([4275, 4276]);

        esci.setCollisionByProperty({colliders:true});
        esci.setCollision([3880, 3881]);
        this.physics.add.collider(this.omino,esci,(primo, secondo) =>{
            if(arma==1){
                this.bird.stop();
                this.scene.start("dialogoLab");
            }
        });

        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
        this.cameras.main.startFollow(this.omino)

        this.mioTasto=this.input.keyboard.createCursorKeys();

        this.sensei =this.physics.add.sprite(467,655,"sensei").setOrigin(0).setDepth(1).setScale(1.5);

        esperienza = this.add.text(16, 16, 'XP: '+Xp, {
            fontSize: '20px',
            padding: { x: 10, y: 5 },
            fill: '#ffffff',
            stroke: true
        });
        esperienza.setScrollFactor(0);
        esperienza.setVisible(false)

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

        if ((this.mioTasto.left.isDown || this.leftPressed) && cammina==1)
        {
            this.omino.setVelocityX(-160);

            this.omino.anims.play('left', true);
        }
        else if ((this.mioTasto.right.isDown || this.rightPressed) && cammina==1)
        {
            this.omino.setVelocityX(160);

            this.omino.anims.play('right', true);
        }
        else if ((this.mioTasto.down.isDown || this.downPressed) && cammina==1)
        {
            this.omino.setVelocityY(160);

            this.omino.anims.play('down', true);
        }
        else if ((this.mioTasto.up.isDown || this.upPressed) && cammina==1)
        {
            this.omino.setVelocityY(-160);

            this.omino.anims.play('up', true);
        }
        else
        {
            this.omino.setVelocityX(0);

            this.omino.anims.play('turn', true);
        }
        if((this.omino.x>=469 && this.omino.x<=562) && (this.omino.y>=535 && this.omino.y<=581) && dialSensei==0){
            dialSensei=1
            let nero =this.add.image(50,100,"nero").setDepth(4).setScale(10).setOrigin(0);
            let dia
            let sblocco
            let sblocco2
            let sblocco3
            let playButton
            this.omino.setVelocityX(0)
            this.omino.setVelocityY(0)
            this.omino.x=530
            this.omino.y=650
            this.sensei.x=480
            this.sensei.y=638
            cammina=0
            setTimeout(() => {
                nero.setVisible(false)
                let achv
                dia=this.add.image(300,748,"luce").setOrigin(0).setDepth(3).setScale(0.32);
                sblocco2
                sblocco3
                sblocco = this.add.text(320, 760, "Bob:", {font: "18px Courier", fill: "black"}).setDepth(4);
                setTimeout(()=>{
                    if(lingua=="ita"){
                        sblocco2 = this.add.text(320, 785, "Ei, cos'è successo??", {font: "14px Courier", fill: "black"}).setDepth(4);
                    } else if(lingua=="ing"){
                        sblocco2 = this.add.text(320, 785, "Hi, what happened??", {font: "14px Courier", fill: "black"}).setDepth(4);
                    }
                    setTimeout(() =>{
                        if(lingua=="ita"){
                            sblocco3 = this.add.text(320, 805, "Dove diavolo ci troviamo?", {font: "14px Courier", fill: "black"}).setDepth(4);
                        } else if(lingua=="ing"){
                            sblocco3 = this.add.text(320, 805, "Where the hell are we?", {font: "14px Courier", fill: "black"}).setDepth(4);
                        }
                        setTimeout(() =>{
                            playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                            playButton.setInteractive();
                            playButton.on('pointerdown', ()=>{
                                playButton.setVisible(false);
                                sblocco.setVisible(false);
                                sblocco2.setVisible(false);
                                sblocco3.setVisible(false);
                                dia.setDepth(4);
                                if(lingua=="ita"){
                                sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                sblocco2 = this.add.text(320, 785, "Salve ragazzo..", {font: "14px Courier", fill: "black"}).setDepth(6);
                                }else if(lingua=="ing"){
                                    sblocco=this.add.text(320, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                    sblocco2 = this.add.text(320, 785, "Hi boy..", {font: "14px Courier", fill: "black"}).setDepth(6);
                                }
                                setTimeout(() =>{
                                    if(lingua=="ita"){
                                        sblocco3 = this.add.text(320, 805, "Ci troviamo nell'Elnath, la dimensione del Mothman!", {font: "13px Courier", fill: "black"}).setDepth(6);
                                    } else if(lingua=="ing"){
                                        sblocco3 = this.add.text(320, 805, "We are in Elnath, the dimension of the Mothman!", {font: "13px Courier", fill: "black"}).setDepth(6);
                                    }
                                    setTimeout(() =>{
                                        playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                        playButton.setInteractive();
                                        playButton.on('pointerdown', ()=>{
                                            playButton.setVisible(false);
                                            sblocco.setVisible(false);
                                            sblocco2.setVisible(false);
                                            sblocco3.setVisible(false);
                                            if(lingua=="ita"){
                                                sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                sblocco2 = this.add.text(320, 785, "..ovvero il mostro che ha rapito te e la tua famiglia.", {font: "12px Courier", fill: "black"}).setDepth(6);
                                            }else if(lingua=="ing"){
                                                    sblocco=this.add.text(320, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                    sblocco2 = this.add.text(320, 785, "..that is the monster that kidnapped you and your family.", {font: "12px Courier", fill: "black"}).setDepth(6);
                                            }
                                            setTimeout(() =>{
                                                if(lingua=="ita"){
                                                    sblocco3 = this.add.text(320, 805, "Esso si ciba della paura delle persone e di tanto in ", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                } else if(lingua=="ing"){
                                                    sblocco3 = this.add.text(320, 805, "It feeds on people's fear and he occasionally ", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                }
                                                setTimeout(() =>{
                                                    playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                    playButton.setInteractive();
                                                    playButton.on('pointerdown', ()=>{
                                                        playButton.setVisible(false);
                                                        sblocco.setVisible(false);
                                                        sblocco2.setVisible(false);
                                                        sblocco3.setVisible(false);
                                                        if(lingua=="ita"){
                                                            sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                            sblocco2 = this.add.text(320, 785, "tanto lascia delle persone libere per il suo regno per\npoterle cacciare per divertimento.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                        }else if(lingua=="ing"){
                                                                sblocco=this.add.text(320, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                sblocco2 = this.add.text(320, 785, "leaves people free for his kingdom to be able to hunt\nthem for fun.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                        }
                                                        setTimeout(() =>{
                                                            if(lingua=="ita"){
                                                                sblocco3 = this.add.text(320, 805, "Io sono qua ormai da anni e sono l'unico che è riuscito a\nnon essere catturato di nuovo.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                            } else if(lingua=="ing"){
                                                                sblocco3 = this.add.text(320, 805, "I've been here for years now and I'm the only one who managed\nnot to get caught again.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                            }
                                                            setTimeout(() =>{
                                                                playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                playButton.setInteractive();
                                                                playButton.on('pointerdown', ()=>{
                                                                    playButton.setVisible(false);
                                                                    sblocco.setVisible(false);
                                                                    sblocco2.setVisible(false);
                                                                    sblocco3.setVisible(false);
                                                                    sblocco = this.add.text(320, 760, "Bob:", {font: "18px Courier", fill: "black"}).setDepth(6);
                                                                    if(lingua=="ita"){
                                                                        sblocco2 = this.add.text(320, 785, "Ma è orribile! Deve esserci qualcosa che possiamo fare!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                    }else if(lingua=="ing"){
                                                                        sblocco2 = this.add.text(320, 785, "But it's awful! There must be something we can do!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                    }
                                                                    setTimeout(() =>{
                                                                        if(lingua=="ita"){
                                                                            sblocco3 = this.add.text(320, 805, "Io devo salvare i miei genitori..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                        } else if(lingua=="ing"){
                                                                            sblocco3 = this.add.text(320, 805, "I have to save my parents..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                        }
                                                                        setTimeout(() =>{
                                                                            playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                            playButton.setInteractive();
                                                                            playButton.on('pointerdown', ()=>{
                                                                                playButton.setVisible(false);
                                                                                sblocco.setVisible(false);
                                                                                sblocco2.setVisible(false);
                                                                                sblocco3.setVisible(false);
                                                                                if(lingua=="ita"){
                                                                                    sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                    sblocco2 = this.add.text(320, 785, "Qualcosa ci sarebbe, si tratta di un'arma che è in grado di\ndistruggerlo!", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                }else if(lingua=="ing"){
                                                                                        sblocco=this.add.text(320, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                        sblocco2 = this.add.text(320, 785, "There would be something, it is a weapon that is capable\nof destroying it!", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                }
                                                                                setTimeout(() =>{
                                                                                    if(lingua=="ita"){
                                                                                        sblocco3 = this.add.text(320, 805, "Essa per essere creata ha bisogno di essere assemblata da\npiù pezzi.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                    } else if(lingua=="ing"){
                                                                                        sblocco3 = this.add.text(320, 805, "To be created, it needs to be assembled from\nseveral pieces.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                    }
                                                                                    setTimeout(() =>{
                                                                                        playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                                        playButton.setInteractive();
                                                                                        playButton.on('pointerdown', ()=>{
                                                                                            playButton.setVisible(false);
                                                                                            sblocco.setVisible(false);
                                                                                            sblocco2.setVisible(false);
                                                                                            sblocco3.setVisible(false);
                                                                                            if(lingua=="ita"){
                                                                                                sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                                sblocco2 = this.add.text(320, 785, "Questi pezzi si trovano in luoghi pericolosi protetti dagli\nsgherri del Mothman.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                            }else if(lingua=="ing"){
                                                                                                    sblocco=this.add.text(320, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                                    sblocco2 = this.add.text(320, 785, "These pieces are found in dangerous locations protected\nby the Mothman's thugs.", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                            }
                                                                                            setTimeout(() =>{
                                                                                                if(lingua=="ita"){
                                                                                                    sblocco3 = this.add.text(320, 805, "Io sono riuscito a recuperare un pezzo, ma ormai sono troppo\nvecchio e debole per riuscire a prendere gli altri pezzi..", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                                } else if(lingua=="ing"){
                                                                                                    sblocco3 = this.add.text(320, 805, "I managed to recover a piece, but by now I am too old and\nweak to be able to take the other pieces..", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                                }
                                                                                                setTimeout(() =>{
                                                                                                    playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                                                    playButton.setInteractive();
                                                                                                    playButton.on('pointerdown', ()=>{
                                                                                                        playButton.setVisible(false);
                                                                                                        sblocco.setVisible(false);
                                                                                                        sblocco2.setVisible(false);
                                                                                                        sblocco3.setVisible(false);
                                                                                                        sblocco = this.add.text(320, 760, "Bob:", {font: "18px Courier", fill: "black"}).setDepth(6);
                                                                                                        if(lingua=="ita"){
                                                                                                            sblocco2 = this.add.text(320, 785, "Ci penserò io!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                        }else if(lingua=="ing"){
                                                                                                            sblocco2 = this.add.text(320, 785, "I'll think of it!", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                        }
                                                                                                        setTimeout(() =>{
                                                                                                            if(lingua=="ita"){
                                                                                                                sblocco3 = this.add.text(320, 800, "Raccoglierò tutti i pezzi e lo ucciderò,\ndevo farlo per la mia famiglia.", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                            } else if(lingua=="ing"){
                                                                                                                sblocco3 = this.add.text(320, 800, "I will pick up all the pieces and kill him,\nI have to do this for my family.", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                            }
                                                                                                            setTimeout(() =>{
                                                                                                                playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                                                                playButton.setInteractive();
                                                                                                                playButton.on('pointerdown', ()=>{
                                                                                                                    playButton.setVisible(false);
                                                                                                                    sblocco.setVisible(false);
                                                                                                                    sblocco2.setVisible(false);
                                                                                                                    sblocco3.setVisible(false);
                                                                                                                    if(lingua=="ita"){
                                                                                                                        sblocco=this.add.text(320, 760, "Vecchio Saggio:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                                                        sblocco2 = this.add.text(320, 785, "Sei un ragazzo coraggioso..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                                    }else if(lingua=="ing"){
                                                                                                                            sblocco=this.add.text(148, 760, "Old Wise:", {font: "16px Courier", fill: "black"}).setDepth(6);
                                                                                                                            sblocco2 = this.add.text(148, 785, "You are a brave boy..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                                                                                                    }
                                                                                                                    setTimeout(() =>{
                                                                                                                        let achvm
                                                                                                                        if(lingua=="ita"){
                                                                                                                            achvm = this.add.text(470, 485, "Componente arma trovato", {font: "11px Courier", fill: "white"}).setDepth(4);
                                                                                                                        } else if(lingua=="ing"){
                                                                                                                            achvm = this.add.text(470, 485, "Weapon component found", {font: "11px Courier", fill: "white"}).setDepth(4);
                                                                                                                        }
                                                                                                                        achv=this.add.image(425,450,"achievement").setOrigin(0).setDepth(3).setScale(0.25);
                                                                                                                        if(lingua=="ita"){
                                                                                                                            sblocco3 = this.add.text(320, 805, "Ecco a te il mio pezzo, buona fortuna, ne avrai bisogno!", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                                                        } else if(lingua=="ing"){
                                                                                                                            sblocco3 = this.add.text(320, 805, "Here's my piece, good luck, you'll need it!", {font: "11px Courier", fill: "black"}).setDepth(6);
                                                                                                                        }
                                                                                                                        setTimeout(() =>{
                                                                                                                            playButton= this.add.image(695,765,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                                                                                                            playButton.setInteractive();
                                                                                                                            playButton.on('pointerdown', ()=>{
                                                                                                                                playButton.setVisible(false);
                                                                                                                                dia.setVisible(false);
                                                                                                                                sblocco.setVisible(false);
                                                                                                                                sblocco2.setVisible(false);
                                                                                                                                sblocco3.setVisible(false);
                                                                                                                                achv.setVisible(false);
                                                                                                                                achvm.setVisible(false);
                                                                                                                                cammina=1;
                                                                                                                                arma=1;
                                                                                                                            })
                                                                                                                        }, 1200)
                                                                                                                    }, 1000)
                                                                                                                })
                                                                                                            }, 1000)
                                                                                                        }, 1000)
                                                                                                    })
                                                                                                }, 1000)
                                                                                            }, 1000)
                                                                                        })
                                                                                    }, 1000)
                                                                                }, 1000)
                                                                            })
                                                                        }, 1000)
                                                                    }, 1000)
                                                                })
                                                                }, 1000)
                                                        }, 1000)
                                                    })
                                                }, 1000)
                                            }, 1000)
                                        })
                                    }, 1000)
                                }, 1000)

                            })
                        }, 1000)
                    }, 1000)
                },1200)
            },1000)
        }
    }
}