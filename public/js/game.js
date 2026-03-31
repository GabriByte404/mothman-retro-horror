/* ---------------------------------------------------------
   1. VARIABILI GLOBALI (Scope Globale)
   Queste devono stare fuori per essere lette da tutte le scene
   --------------------------------------------------------- */
var vol = 1;         // Volume (da 0 a 1)
var lingua = "ita";  // Lingua predefinita
var on_off = "aN";   // Stato opzioni
var arma = 0;        // Stato arma (0 = no, 1 = sì)
var Xp = 0;          // Punti esperienza

// Variabili per il minigioco dei cavi (amongUs)
var origine = 0;
var finito = 0;
var esci1 = 0, esci2 = 0, esci3 = 0, esci4 = 0;
var temp = 0;

// Variabile per il movimento/interazione globale
var cammina = 0;

/* ---------------------------------------------------------
   2. LOGICA DI INIZIALIZZAZIONE (DOM Ready)
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
    var gameContainer = document.getElementById('game-container');
    var playBtn = document.getElementById('playButton'); 

    // Funzione per calcolare lo zoom corretto in base allo schermo
    function calculateZoom() {
        var containerWidth = window.innerWidth;
        var containerHeight = window.innerHeight;
        // Basato sulla tua risoluzione nativa 482x369
        var zoom = Math.min(containerWidth / 482, containerHeight / 369);
        return zoom;
    }

    // Configurazione del motore Phaser
    var config = {
        parent: 'game-container',
        width: 482,
        height: 369,
        pixelArt: true, // Mantiene la pixel art nitida durante lo zoom
        backgroundColor: '#000000',
        physics: {
            default: "arcade",
            arcade: { debug: false },
        },
        // Elenco di tutte le scene importate
        scene: [
            Menu, 
            Presentazione, 
            Inizio, 
            DialogSangue, 
            Opz, 
            TrovaChiave, 
            blackOut, 
            amongUs, 
            cantina, 
            scendi, 
            Elnath, 
            dialogoLab, 
            lab, 
            finalFight
        ]
    };

    var game;

    // Gestione del click sul pulsante "GIOCA ORA"
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Mostriamo il div del gioco (che nel CSS è display:none)
            gameContainer.style.display = "flex";
            
            // Attiviamo il Fullscreen (standard e webkit per compatibilità)
            if (gameContainer.requestFullscreen) {
                gameContainer.requestFullscreen();
            } else if (gameContainer.webkitRequestFullscreen) {
                gameContainer.webkitRequestFullscreen();
            }

            // Creiamo l'istanza del gioco solo alla prima pressione
            if (!game) {
                game = new Phaser.Game(config);
            }
        });
    } else {
        console.error("ERRORE: Pulsante 'playButton' non trovato nell'HTML. Controlla l'ID!");
    }

    /* ---------------------------------------------------------
       3. GESTIONE EVENTI DI SISTEMA (Resize & Fullscreen)
       --------------------------------------------------------- */

    // Adatta il gioco se l'utente ridimensiona la finestra
    window.addEventListener('resize', function() {
        if (game) {
            game.scale.setZoom(calculateZoom());
        }
    });

    // Gestione dell'uscita dal Fullscreen (tasto ESC)
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement) {
            // Se l'utente esce, nascondiamo il contenitore
            gameContainer.style.display = "none";
            
            // Opzionale: Se vuoi fermare l'audio all'uscita
            if (game) {
                game.sound.pauseAll();
            }
        } else {
            // Se entra in fullscreen, forziamo il ricalcolo dello zoom
            if (game) {
                game.sound.resumeAll();
                game.scale.setZoom(calculateZoom());
            }
        }
    });
});