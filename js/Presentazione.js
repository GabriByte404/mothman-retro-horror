class Presentazione extends Phaser.Scene {
    constructor(){
        super("Presentazione");
    }
    preload(){
        this.load.audio('urlo', './assets/audio/inizio.mp3');
        this.load.image("dial1","./assets/dialoghi/pres.jpg");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
    }

    create(){
        //suono
        this.urlo = this.sound.add('urlo');
        this.urlo.setVolume(vol);
        this.urlo.play();

        setTimeout(() => {
            this.add.image(-32,-45,"dial1").setDepth(0).setScale(0.32).setOrigin(0);
            this.add.text(20, 290, "Bob:", {font: "18px Courier", fill: "black"});
            setTimeout(() => {
                if(lingua=="ita"){
                    this.add.text(20, 315, "Cos'è stato quel rumore?!", {font: "15px Courier", fill: "black"});
                } else if(lingua=="ing"){
                    this.add.text(20, 315, "What was that noise?!", {font: "15px Courier", fill: "black"});
                }
               
                setTimeout(() => {
                    if(lingua=="ita"){
                        this.add.text(20, 330, "Meglio andare a controllare...", {font: "15px Courier", fill: "black"});
                    } else if(lingua=="ing"){
                        this.add.text(20, 330, "Better go check...", {font: "15px Courier", fill: "black"});
                    }
                    //livello successivo
                    setTimeout(() => {
                        let playButton= this.add.image(380,300,"avanti").setOrigin(0).setDepth(1).setScale(0.075);
                        playButton.setInteractive();
                        playButton.on('pointerdown', ()=>{
                            this.scene.start("Inizio")
                        });
                    }, 2000)
                }, 1500)
            }, 1000) 
        }, 5500)
    }
}