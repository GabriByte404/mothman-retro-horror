class DialogSangue extends Phaser.Scene {
    constructor(){
        super("dialogoSangue");
    }

    preload(){
        this.load.image("sangue","./assets/dialoghi/bloodD.jpg");
        this.load.image("nero","./assets/nero.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
        this.load.audio('basso', './assets/audio/tempoBasso.mp3');
        this.load.audio('portaC', './assets/audio/portaChiusa.mp3');
    }

    create(){
        //suono
        this.sottof = this.sound.add('basso', { loop: -1 });
        if(vol==0 || vol==1){
            this.sottof.setVolume(vol);
            this.sottof.play()
        }else if(vol!=1 && vol!=2){
            this.sottof.setVolume(vol-2);
            this.sottof.play();
        } else if(vol==2){
            this.sottof.setVolume(vol-1);
            this.sottof.play();
        }
        
        //
        setTimeout(()=>{
            this.add.image(-55,0,"sangue").setDepth(0).setScale(0.27).setOrigin(0);
            this.add.text(20, 290, "Bob:", {font: "18px Courier", fill: "black"});
        
        setTimeout(() => {
            if(lingua=="ita"){
                this.add.text(20, 315, "Oh no! C'è del sangue che porta in cantina!", {font: "13px Courier", fill: "black"});
            } else if(lingua=="ing"){
                this.add.text(20, 315, "Oh no! There is blood leading to the cellar!", {font: "13px Courier", fill: "black"});
            }
           
            setTimeout(() => {
                if(lingua=="ita"){
                    this.add.text(20, 330, "Devo controllare che i miei genitori stiano bene...", {font: "13px Courier", fill: "black"});
                } else if(lingua=="ing"){
                    this.add.text(20, 330, "I need to check that my parents are okay...", {font: "13px Courier", fill: "black"});
                }
                //avanti
                setTimeout(() => {
                    let playButton= this.add.image(400,293,"avanti").setOrigin(0).setDepth(1).setScale(0.075);
                    playButton.setInteractive();
                    playButton.on('pointerdown', ()=>{
                        this.add.image(0,0,"nero").setDepth(3).setScale(3).setOrigin(0);
                        this.porta = this.sound.add('portaC');
                        this.porta.setVolume(vol);
                        this.porta.play()
                        setTimeout(() => {
                            this.add.image(-55,0,"sangue").setDepth(4).setScale(0.27).setOrigin(0);
                            this.add.text(20, 290, "Bob:", {font: "18px Courier", fill: "black"}).setDepth(4);
                            
                            setTimeout(() => {
                                if(lingua=="ita"){
                                    this.add.text(20, 315, "La porta è chiusa a chiave!", {font: "13px Courier", fill: "black"}).setDepth(4);;
                                } else if(lingua=="ing"){
                                    this.add.text(20, 315, "The door is locked!", {font: "13px Courier", fill: "black"}).setDepth(4);;
                                }
                               
                                setTimeout(() => {
                                    if(lingua=="ita"){
                                        this.add.text(20, 330, "Devo andare a cercarla per poter andare in cantina.", {font: "13px Courier", fill: "black"}).setDepth(4);
                                    } else if(lingua=="ing"){
                                        this.add.text(20, 330, "I have to go look for her to be able to go to the cellar.", {font: "13px Courier", fill: "black"}).setDepth(4);
                                    }
                                    //avanti
                                    setTimeout(() => {
                                        let playButton= this.add.image(400,293,"avanti").setOrigin(0).setDepth(4).setScale(0.075);
                                        playButton.setInteractive();
                                        playButton.on('pointerdown', ()=>{
                                            this.scene.start("TrovaChiave");
                                            this.sottof.stop();
                                        });
                                    }, 2000)
                                }, 1800)
                            }, 1000) 
                        }, 3000)
                    });
                }, 2000)
            }, 1800)
        }, 1000)
    }, 1500)
    }
}