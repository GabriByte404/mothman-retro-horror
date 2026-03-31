class dialogoLab extends Phaser.Scene{
    constructor(){
        super("dialogoLab")
    }
    preload(){
        this.load.image("lava","./assets/dialoghi/lava.png");
        this.load.image("luce","./assets/dialoghi/dialogo.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");

        this.load.audio('lavaA', './assets/audio/lava.mp3');
    }

    create(){
        this.lava = this.sound.add("lavaA", { loop: -1 });
        this.lava.setVolume(vol);
        this.lava.play();
        
        this.add.image(0,-80,"lava").setOrigin(0).setDepth(2).setScale(0.4);
        let sblocco2
        let sblocco3
        let dia=this.add.image(0,283,"luce").setOrigin(0).setDepth(3).setScale(0.32);
        let sblocco=this.add.text(15,290, "Bob:", {font: "16px Courier", fill: "black"}).setDepth(6);
        setTimeout(()=>{
            if(lingua=="ita"){
                sblocco2=this.add.text(15,310, "Finalmente ho raggiunto il 'Cube' il labirinto in cui è\nnascosto l'ultimo pezzo dell'arma. ", {font: "12px Courier", fill: "black"}).setDepth(6);
            } else if(lingua=="ing"){
                sblocco2=this.add.text(15,310, "I finally reached the 'Cube' the labyrinth where\nthe last piece of the weapon is hidden.", {font: "12px Courier", fill: "black"}).setDepth(6);
            }
            
            setTimeout(()=>{
                if(lingua=="ita"){
                    sblocco3=this.add.text(15,338, "Il pezzo si trova al centro del labirinto, ma devo far\nattenzione agli sgherri del Mothman! ", {font: "12px Courier", fill: "black"}).setDepth(6);
                } else if(lingua=="ing"){
                    sblocco3=this.add.text(15,338, "The piece is in the center of the maze, but I have to\nbe careful of the Mothman's minions! ", {font: "12px Courier", fill: "black"}).setDepth(6);
                }
                setTimeout(() =>{
                    let playButton= this.add.image(400,305,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                    playButton.setInteractive();
                    playButton.on('pointerdown', ()=>{
                        sblocco.setVisible(false);
                        sblocco2.setVisible(false);
                        sblocco3.setVisible(false);
                        playButton.setVisible(false);
                        sblocco=this.add.text(15,290, "Bob:", {font: "16px Courier", fill: "black"}).setDepth(6);
                        setTimeout(()=>{
                            if(lingua=="ita"){
                                sblocco2=this.add.text(15,310, "Dalle storie che mi hanno raccontato non sembrano molto\nintelligenti.", {font: "12px Courier", fill: "black"}).setDepth(6);
                            } else if(lingua=="ing"){
                                sblocco2=this.add.text(15,310, "From the stories they have told me they don't seem\nvery clever.", {font: "12px Courier", fill: "black"}).setDepth(6);
                            }
                            setTimeout(()=>{
                                if(lingua=="ita"){
                                    sblocco3=this.add.text(15,338, "Però sono comunque molto forti e non devo\nsottovalutarli..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                } else if(lingua=="ing"){
                                    sblocco3=this.add.text(15,338, "But they are still very strong and I must\nnot underestimate them..", {font: "12px Courier", fill: "black"}).setDepth(6);
                                }
                                
                                setTimeout(() =>{
                                    let playButton= this.add.image(400,305,"avanti").setOrigin(0).setDepth(5).setScale(0.075);
                                    playButton.setInteractive();
                                    playButton.on('pointerdown', ()=>{
                                        this.lava.stop();
                                        this.scene.start("lab");
                                    })
                                }, 1000)
                            }, 1000)
                        }, 1000)
                    })
                }, 1000)
            }, 1000)
        }, 1000)
        
    }

    update(){}
}