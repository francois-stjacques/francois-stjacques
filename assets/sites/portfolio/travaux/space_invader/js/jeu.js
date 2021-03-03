// Importation des scènes du jeu
import {
    SceneChargement
} from './scenes/SceneChargement.js';

import {
    SceneIntro
} from './scenes/SceneIntro.js';

import {
    SceneJeu
} from './scenes/SceneJeu.js';

import {
    SceneFinJeu
} from './scenes/SceneFinJeu.js';

import {
    SceneInstruction
} from './scenes/SceneInstruction.js';

// Création du jeu quand la page HTML est chargé
window.addEventListener("load", function () {
    // Définir les dimensions du jeu sur desktop
    let largeur = 576,
        hauteur = 1024;

    // Vérifier si on est pour "Mobile" ou pour "Tablet"
    if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
        largeur = Math.min(window.innerWidth, window.innerHeight);
        hauteur = Math.max(window.innerWidth, window.innerHeight);
    }

    // Configuration du jeu passé en paramètre
    let config = {
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: largeur,
            height: hauteur,
        },
        scene: [SceneChargement, SceneInstruction, SceneIntro, SceneJeu, SceneFinJeu],
        physics: {
            default: 'arcade',
            arcade: {
                // debug: true,
            }
        },
    }

    // Création du jeu pour qu'il soit accessible à toutes les scènes du jeu
    window.game = new Phaser.Game(config);

    // Propriété objet pour identifier et configurer les grandes caractéristiques du jeu
    window.game.Invaders = {
        vies: 3, // Le nombre de vie du vaisseau
        TEMPS_JEU: 30, // Le temps du jeu en secondes
        NB_ALIENS: 42, // Le nombre d'aliens
        NB_COULEURS_ALIENS: 12, // Le nombre de couleurs d'alien du jeu
        score: 0, // Score de la partie 
        meilleurScore: 0, // Meilleur score antérieur enregistré			
        INVADERS_LOCAL_STORAGE: "scoresJeuInvaders" // Sauvegarde et enregistrement du meilleur score pour ce jeu 
    }

    // Objet de configuration pour le chargement des fontes
    let webFontConfig = {
        // La police Google chargée
        google: {
            families: ["Anton"]
        },

        // La police demandée est chargée et rendue
        active: function () {
            console.log("Les polices de caractères sont chargées");
        }
    };

    // Chargement de la police
    WebFont.load(webFontConfig);
}, false);