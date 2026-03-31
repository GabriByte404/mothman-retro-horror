document.addEventListener('DOMContentLoaded', function() {
    var gameContainer = document.getElementById('game-container');

    function calculateZoom() {
        var containerWidth = gameContainer.clientWidth;
        var containerHeight = gameContainer.clientHeight;
        var aspectRatio = containerWidth / containerHeight;
        var zoom = Math.min(containerWidth / 482, containerHeight / 369);

        // Controlla se il rapporto scende sotto 16:9 (1.77)
        if (aspectRatio < 16 / 9) {
            zoom = Math.min(zoom, containerHeight / 369);
        }

        return zoom;
    }

    var config = {
        parent: 'game-container',
        width: 482,
        height: 369,
        zoom: calculateZoom(),
        backgroundColor: 0x0000,
        physics: {
            default: "arcade",
            arcade: { debug: false },
        },
        scene: [Menu, Presentazione, Inizio, DialogSangue, Opz, TrovaChiave, blackOut, amongUs, cantina, scendi, Elnath, dialogoLab, lab, finalFight]
    };

    var game;

    document.getElementById('playButton').addEventListener('click', function() {
        if (!game) {
            game = new Phaser.Game(config);
            game.scale.setZoom(calculateZoom());
        }
    });

    window.addEventListener('resize', function() {
        if (game) {
            game.scale.setZoom(calculateZoom());
        }
    });
});

var vol = 0;
var lingua = "ita";
var on_off = "aN";
var arma = 0;
var Xp = 0;