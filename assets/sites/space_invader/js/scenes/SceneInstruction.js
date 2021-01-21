// Importation de la grille de montage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène d'instruction du jeu
 * @extends Phaser.Scene
 */

export class SceneInstruction extends Phaser.Scene {

	constructor() {
		super("SceneInstruction");
	}

	/**
     * Créations et définitions des objets pour la scène d'intro
     */
	create() {
		// Titre des instructions
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
		let leStyle = {
            font: `bold ${tailleTexte}px Monospace`,
            fill: "#ffffff",
            align: "center"
		}
		let titreTxt = this.add.text(this.game.config.width/2, 0, "Instructions", leStyle);
		titreTxt.setOrigin(0.5, 0);

		// Textes des instructions
		tailleTexte = Math.round(32 * GrilleMontage.ajusterRatioX());
		let leTexte = "Détruiser tous les aliens\n en moins de 20 secondes.\n";
		leTexte +=" Vous avez 3 vies.\n Les aliens peuvent aussi \nvous tirer dessus. \nÉvitez leurs tires.\n";
		leTexte +=" S'ils touchent le vaisseau,\n vous perder aussi de la vie\n\n";
		leTexte +=" Appuyer sur les touches\n fléchées Gauche et Droite \npour se déplacer.\n\n";
		leTexte += "Pour tirer les aliens,\n appuyer sur la barre\n d'espacement.\n";

		let InstrucTxt = this.add.text(game.config.width / 2, game.config.height / 2, leTexte, {
			font: `bold ${tailleTexte}px Monospace`,
			color: "#ffffff",
			align: "center"
		});
		InstrucTxt.setOrigin(0.5, 0.6);

		// Appeler la fonction pour afficher le bouton
		this.afficherBoutons();
	}

	/**
	 * Afficher le bouton Jouer
	 */
	afficherBoutons() {
		// Instancier le bouton, le dimensionner
		let posX = game.config.width / 2,
			posY = game.config.height * 0.8,
			leBoutonJouer;

		leBoutonJouer = this.add.image(posX, posY, "jouer", 0);

		// Mettre à l'échelle selon le ratio horizontal
		GrilleMontage.mettreEchelleRatioX(leBoutonJouer);
		let echelleInit = leBoutonJouer.scaleX;

		// Animation du bouton Jouer
		this.tweens.add({
			targets: leBoutonJouer,
			props: {
				scaleX: echelleInit * 1.2,
				scaleY: echelleInit * 1.2
			},
			duration: 750,
			repeat: -1,
			yoyo: true,
		});

		// Aller à l'écran de jeu en cliquant sur le bouton
		leBoutonJouer.setInteractive();
		leBoutonJouer.once("pointerdown", this.allerEcranJeu, this);
	}

	/**
     * Aller à la scène jeu quand le bouton Jouer est cliquer
     */
	allerEcranJeu() {
		// Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}
}