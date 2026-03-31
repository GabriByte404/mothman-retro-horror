var li=0;
var conta=0;

class Opz extends Phaser.Scene {
    constructor(){
        super("Opz");
    }

    preload(){
        this.load.image("mn","./assets/MenuButtons/MenuButton.png");
        this.load.image("cas","./assets/MenuButtons/casella.png");
        this.load.image("pla","./assets/MenuButtons/PlayButton.png");
        this.load.image("plaI","./assets/MenuButtons/PlayButtonI.png");
        this.load.image("aS","./assets/MenuButtons/volume/audioS.jpg");
        this.load.image("aN","./assets/MenuButtons/volume/audioN.jpg");
        this.load.image("background","./assets/MenuButtons/background.jpg");
        this.load.image("ita","./assets/MenuButtons/ita.jpg");
        this.load.image("ing","./assets/MenuButtons/ing.jpg");
        this.load.image("1","./assets/MenuButtons/volume/1.png");
        this.load.image("2","./assets/MenuButtons/volume/2.png");
        this.load.image("3","./assets/MenuButtons/volume/3.png");
        this.load.image("4","./assets/MenuButtons/volume/4.png");
        this.load.image("5","./assets/MenuButtons/volume/5.png");
        this.load.image("6","./assets/MenuButtons/volume/6.png");
        this.load.image("7","./assets/MenuButtons/volume/7.png");
        this.load.image("8","./assets/MenuButtons/volume/8.png");
        this.load.image("9","./assets/MenuButtons/volume/9.png");
        this.load.image("10","./assets/MenuButtons/volume/10.png");
        this.load.image("0","./assets/MenuButtons/volume/0.png");
        this.load.image("piu","./assets/MenuButtons/volume/plus.png");
        this.load.image("men","./assets/MenuButtons/volume/minus.png");
        this.load.audio('aud', '../assets/audio/menu.mp3');
    }

    create(){
        //suono
        this.aud = this.sound.add('aud', { loop: -1 });
        this.aud.setVolume(vol);
        this.aud.play();

        this.add.image(0,0,"background").setOrigin(0).setDepth(0);
        this.add.image(110,25,"cas").setOrigin(0).setDepth(1).setScale(0.8);
        this.add.image(15,125,"cas").setOrigin(0).setDepth(1).setScale(0.6);
        this.add.image(15,225,"cas").setOrigin(0).setDepth(1).setScale(0.6);

        if(lingua=="ita"){
            this.add.text(163, 38, "OPZIONI", {font: "30px Courier", fill: "black"}).setDepth(1);
            this.add.text(73, 138, "AUDIO", {font: "18px Courier", fill: "black"}).setDepth(1);
            this.add.text(65, 238, "LINGUA", {font: "18px Courier", fill: "black"}).setDepth(1);
        } else{
            this.add.text(163, 38, "OPTIONS", {font: "30px Courier", fill: "black"}).setDepth(1);
            this.add.text(73, 138, "SOUND", {font: "18px Courier", fill: "black"}).setDepth(1);
            this.add.text(58, 238, "LANGUAGE", {font: "18px Courier", fill: "black"}).setDepth(1);
        }
        
        //audio
        let ads= this.add.image(368,128,on_off).setOrigin(0).setDepth(1).setScale(0.5);
        ads.setInteractive();
        ads.on('pointerdown', ()=>{
            if(conta%2==0){
                on_off="aN"
                ads= this.add.image(368,128,on_off).setOrigin(0).setDepth(1).setScale(0.5);
                this.add.image(250,128,0).setOrigin(0).setDepth(1).setScale(0.6);
                vol=0;

            } else{
                on_off="aS"
                ads= this.add.image(368,128,on_off).setOrigin(0).setDepth(1).setScale(0.5);
                this.add.image(250,128,4).setOrigin(0).setDepth(1).setScale(0.6);
                vol=4;
            }
            conta=conta+1;
            this.aud.setVolume(vol);
            this.aud.stop();
            this.aud.play();
        });

        let meno= this.add.image(215,128,"men").setOrigin(0).setDepth(1).setScale(0.6);
        meno.setInteractive();
        meno.on('pointerdown', ()=>{
            if(vol==1){
                on_off="aN"
                ads= this.add.image(368,128,on_off).setOrigin(0).setDepth(1).setScale(0.5);
                conta=conta+1;
            }
            if(vol!=0){
                vol=vol-1;
            } else if(vol=0){
                vol=0;
            }
            this.add.image(250,128,vol).setOrigin(0).setDepth(1).setScale(0.6);
            this.aud.setVolume(vol);
            this.aud.stop();
            this.aud.play();
        });
        this.add.image(250,128,vol).setOrigin(0).setDepth(1).setScale(0.6);
        let piu= this.add.image(338,128,"piu").setOrigin(0).setDepth(1).setScale(0.6);
        piu.setInteractive();
        piu.on('pointerdown', ()=>{
            if(vol!=10){
                vol=vol+1;
                on_off="aS"
                ads= this.add.image(368,128,on_off).setOrigin(0).setDepth(1).setScale(0.5);
                conta=conta+1;
            } else if(vol=10){
                vol=10
            }
            this.add.image(250,128,vol).setOrigin(0).setDepth(1).setScale(0.6);
            this.aud.setVolume(vol);
            this.aud.stop();
            this.aud.play();
        });
        //lingua
        let it= this.add.image(253,226,lingua).setOrigin(0).setDepth(1).setScale(0.06);
        it.setInteractive();
        it.on('pointerdown', ()=>{
            
            li=li+1;
            if(li%2==0){
                this.add.image(110,25,"cas").setOrigin(0).setDepth(1).setScale(0.8);
                this.add.image(15,125,"cas").setOrigin(0).setDepth(1).setScale(0.6);
                this.add.image(15,225,"cas").setOrigin(0).setDepth(1).setScale(0.6);
                this.add.image(253,226,"ita").setOrigin(0).setDepth(1).setScale(0.06);
                lingua="ita";
                this.add.text(163, 38, "OPZIONI", {font: "30px Courier", fill: "black"}).setDepth(1);
                this.add.text(73, 138, "AUDIO", {font: "18px Courier", fill: "black"}).setDepth(1);
                this.add.text(65, 238, "LINGUA", {font: "18px Courier", fill: "black"}).setDepth(1);
            } else{
                this.add.image(110,25,"cas").setOrigin(0).setDepth(1).setScale(0.8);
                this.add.image(15,125,"cas").setOrigin(0).setDepth(1).setScale(0.6);
                this.add.image(15,225,"cas").setOrigin(0).setDepth(1).setScale(0.6);
                this.add.image(253,226,"ing").setOrigin(0).setDepth(1).setScale(0.06);
                lingua="ing";
                this.add.text(163, 38, "OPTIONS", {font: "30px Courier", fill: "black"}).setDepth(1);
                this.add.text(73, 138, "SOUND", {font: "18px Courier", fill: "black"}).setDepth(1);
                this.add.text(58, 238, "LANGUAGE", {font: "18px Courier", fill: "black"}).setDepth(1);
            }
            
        });

        //menu play
        let menuButton= this.add.image(175,300,"mn").setOrigin(0).setDepth(1).setScale(0.5);
        menuButton.setInteractive();
        menuButton.on('pointerdown', ()=>{
            this.aud.stop();
            this.scene.start("Menu")
        });
        let playButton= this.add.image(225,300,"plaI").setOrigin(0).setDepth(1).setScale(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', ()=>{
            this.scene.start("Presentazione")
            this.aud.stop();
        });

    }
}