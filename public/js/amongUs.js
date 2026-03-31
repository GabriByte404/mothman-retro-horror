var origine=0
var finito=0
var esci1=0
var esci2=0
var esci3=0
var esci4=0
var temp=0

class amongUs extends Phaser.Scene{
    constructor(){
        super("amongUs")
    }
    preload(){
        this.load.audio('basso', './assets/audio/tempoBasso.mp3');
        this.load.audio('ele', './assets/audio/elett.mp3');

        this.load.image("cav1","./assets/cavi.png");
        this.load.image("bianco","./assets/bianco.png");
        this.load.image('blu', './assets/unisci.png');
        this.load.image('gia', './assets/unisci.png');
        this.load.image('ros', './assets/unisci.png');
        this.load.image('ross', './assets/unisci.png');

        this.load.image('cb1', './assets/unito.png');
        this.load.image('cg1', './assets/unito2.png');
        this.load.image('cra1', './assets/unito3.png');
        this.load.image('cro1', './assets/unito4.png');
    }
    create(){
        //suono
        this.ele = this.sound.add('ele');
        this.ele.setVolume(vol);

        this.sottof = this.sound.add('basso', { loop: -1 });
        this.sottof.setVolume(vol);
        this.sottof.play();

        this.add.image(-20,-8,"cav1").setDepth(0).setScale(0.52).setOrigin(0);
        // definire i 'cavi'
        //BLU
        var cavBlu = this.add.sprite(97, 95, 'blu').setScale(0.5);
        var cB=this.add.image(216,190,"cb1").setDepth(0).setScale(0.63).setVisible(false);
        cavBlu.setInteractive();
        this.input.setDraggable(cavBlu);
        //GIALLO
        var cavGiallo = this.add.sprite(97, 162, 'gia').setScale(0.5);
        var cG=this.add.image(230,124,"cg1").setDepth(0).setScale(0.525).setVisible(false);
        cavGiallo.setInteractive();
        this.input.setDraggable(cavGiallo);
        //ROSA
        var cavRosa = this.add.sprite(97, 228, 'ros').setScale(0.5);
        var cRa=this.add.image(228,190,"cra1").setDepth(0).setScale(0.52).setVisible(false);
        cavRosa.setInteractive();
        this.input.setDraggable(cavRosa);
        //ROSSO
        var cavRosso = this.add.sprite(97, 292, 'ross').setScale(0.5);
        var cRo=this.add.image(216,208,"cro1").setDepth(0).setScale(0.462).setVisible(false);
        cavRosso.setInteractive();
        this.input.setDraggable(cavRosso);

        //funzioni per il collegamento
        this.input.on('dragstart', function (pointer, gameObject) {
            if(gameObject.x==97 && gameObject.y==95){
                gameObject.setTint(0x0000ff);
                origine=1;
            } else if(gameObject.x==97 && gameObject.y==162){
                gameObject.setTint(0xedff21);
                origine=2;
            } else if(gameObject.x==97 && gameObject.y==228){
                gameObject.setTint(0xf400a1);
                origine=3;
            } else if(gameObject.x==97 && gameObject.y==292){
                gameObject.setTint(0xff0000);
                origine=4;
            }
        });
        this.input.on('dragend', function (pointer, gameObject) {

            if(origine==1){
                if((gameObject.x>=320 && gameObject.x<=398) && (gameObject.y>=140 && gameObject.y<=172)){
                    cB.setVisible(true);
                    gameObject.destroy()
                    if(esci1==0){
                        finito=finito+1
                        esci1=1
                    }
                } else{
                    gameObject.x=97;
                    gameObject.y=95;
                    gameObject.clearTint();
                }
            }
            if(origine==2){
                if((gameObject.x>=320 && gameObject.x<=398) && (gameObject.y>=200 && gameObject.y<=250)){
                    cG.setVisible(true);
                    gameObject.destroy()
                    if(esci2==0){
                        finito=finito+1
                        esci2=1
                    }
                } else{
                    gameObject.x=97;
                    gameObject.y=162;
                    gameObject.clearTint();
                }
            }
            if(origine==3){
                if((gameObject.x>=320 && gameObject.x<=398) && (gameObject.y>=272 && gameObject.y<=315)){
                    cRa.setVisible(true);
                    gameObject.destroy()
                    if(esci3==0){
                        finito=finito+1
                        esci3=1
                    }
                } else{
                    gameObject.x=97;
                    gameObject.y=228;
                    gameObject.clearTint();
                }
            }
            if(origine==4){
                if((gameObject.x>=320 && gameObject.x<=398) && (gameObject.y>=62 && gameObject.y<=110)){
                    cRo.setVisible(true);
                    gameObject.destroy()
                    if(esci4==0){
                        finito=finito+1
                        esci4=1
                    }
                } else{
                    gameObject.x=97;
                    gameObject.y=292;
                    gameObject.clearTint();
                }
            }

        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });

    }

    update(time,delta)
    {
        if(finito==4){
            finito=5;
            this.add.image(-20,-8,"bianco").setDepth(0).setScale(2).setOrigin(0);
            this.ele.play();
            setTimeout(() => {
                this.sottof.stop();
                this.ele.stop();
                temp=1;
            }, 2000)
        }

        if(temp==1){
            temp==0;
            this.scene.start("cantina");
        }
    }

}