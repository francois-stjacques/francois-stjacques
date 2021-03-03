// Importation de la grille de montage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";

/**
 * Classe representant la scène de chargement du jeu
 * @extends Phaser.Scene
 */

 export class SceneChargement extends Phaser.Scene {

    constructor() {
        super("SceneChargement");
    }

    preload() {
        // Création de la barre de chargement
		let posX = 0,
        posY = game.config.height / 2,
        largeur = game.config.width,
        hauteur = game.config.height * 0.10;
        this.barre = this.add.rectangle(posX, posY, largeur, hauteur, 0x435AE4);
        this.barre.setOrigin(0, 0.5);

        // Texte pour la progression du chargement
        let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
        this.progressionTxt = this.add.text(game.config.width / 2, game.config.height / 2, "0%", {
            fontFamily: "Anton",
            fontSize: `${tailleTexte}px`,
            fontStyle: "bold",
            color: "#ffffff",
            align: "center"
        });
        this.progressionTxt.setOrigin(0.5);

        // Intégration des images du jeu
        this.load.setPath("medias/img/");
        this.load.image("ballep");
        this.load.image("vaisseaup");
        this.load.image("rejouer");
        this.load.image("jouer");
        this.load.image("instructions");

        //Source: https://fr.wikipedia.org/wiki/Fichier:Space_invaders_alien.svg
        this.load.image("imageAlien");

        // Spritesheet du bouton plein écran
        this.load.spritesheet("pleinEcranBtn", "pleinEcranBtn.png", {
            frameWidth: 64,
            frameHeight: 64
        })

        // Spritesheet du bouton du son
        this.load.spritesheet("sonBtn", "sonBtn.png", {
            frameWidth: 65,
            frameHeight: 64
        });

        // Spritesheet des extraterrestres
        this.load.spritesheet("alien", "alienspritem.png", {
            frameWidth: 58.5,
            frameHeight: 58.5
        });

        // Spritesheet de l'explosion
        this.load.spritesheet("explosion", "explosion.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // Intégration des sons du jeu
        this.load.setPath("medias/sons/");
        this.load.audio("sons", ["tir.mp3", "tir.ogg"]);
        this.load.audio("musique", ["instinct.mp3", "instinct.ogg"]);
        this.load.audio("explose", ["explosion.mp3", "explosion.ogg"]);

        // Gestionnaire d'événement pour suivre la progression du chargement
		this.load.on('progress', this.afficherProgression, this);
    }

    /**
	 * Afficher la progression du chargement
	 * @param {Number} pourcentage Taux de chargement exprimé en nombre décimal
	 */
	afficherProgression(pourcentage) {
		this.progressionTxt.text = Math.floor(pourcentage * 100) + " %";
		this.barre.scaleX = pourcentage;
	}

    /**
     * Aller à la scène d'intro lorsque les médias sont chargés
     */
    create() {
        this.scene.start("SceneIntro");
    }
 }