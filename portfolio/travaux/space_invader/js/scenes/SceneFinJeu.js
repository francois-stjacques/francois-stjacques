// Importation de la grille de montage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe representant la scène de fin du jeu
 */
export class SceneFinJeu extends Phaser.Scene {

	constructor() {
		super("SceneFinJeu");
	}


	create() {
		console.log("FinJeu")
		// Titre de fin de jeu
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
		let titreTxt = this.add.text(game.config.width / 2, 0, "Fin du jeu!", {
			font: `bold ${tailleTexte}px Monospace`,
			color: "#ffffff",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);
		titreTxt.setFontFamily("Anton");

		// Vérification et enregistrement du meilleur score
		console.log(game.Invaders.score, game.Invaders.meilleurScore);
		game.Invaders.meilleurScore = Math.max(game.Invaders.score, game.Invaders.meilleurScore);
		localStorage.setItem(game.Invaders.INVADERS_LOCAL_STORAGE, game.Invaders.meilleurScore);

		// Texte du score et meilleur score
		tailleTexte = Math.round(40 * GrilleMontage.ajusterRatioX());
		let leTexte = "Votre score:\n";
		leTexte += game.Invaders.score + " aliens détruit(s)\n\n";
		leTexte += "Meilleur score:\n";
		leTexte += game.Invaders.meilleurScore + " aliens détruit(s)";

		let finJeuTxt = this.add.text(game.config.width / 2, game.config.height / 2, leTexte, {
			font: `bold ${tailleTexte}px Monospace`,
			color: "#ffffff",
			align: "center"
		});
		finJeuTxt.setOrigin(0.5, 1);
		finJeuTxt.setFontFamily("Anton");

		// Le bouton Rejouer
		let leBouton = this.add.image(game.config.width / 2, game.config.height, "rejouer", 0);
		leBouton.setOrigin(0.5, 3);
        GrilleMontage.mettreEchelleRatioX(leBouton);
        let echelleInit = leBouton.scaleX;
        
        // Animation du bouton Rejouer
		this.tweens.add({
			targets: leBouton,
			props: {
				scaleX: echelleInit * 1.2,
				scaleY: echelleInit * 1.2
			},
			duration: 750,
			repeat: -1,
			yoyo: true,
		});

		// Interactivité du bouton Rejouer
		leBouton.setInteractive();

		// Gestionnaires d'événement pour rejouer au jeu
		leBouton.once("pointerdown", this.rejouer, this);
	}

	rejouer(pointer) {
		// Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}
}