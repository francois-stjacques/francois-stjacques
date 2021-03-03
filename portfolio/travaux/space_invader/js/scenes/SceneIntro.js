// Importation de la grille de montage
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Classe representant la scène d'intro du jeu
 * @extends Phaser.Scene
 */

export class SceneIntro extends Phaser.Scene {

	constructor() {
		super("SceneIntro");
	}

	/**
     * Créations et définitions des objets pour la scène d'intro
     */
	create() {
		// Titre du jeu
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());
		let titreTxt = this.add.text(game.config.width / 2, game.config.height, "Space Invaders", {
			font: `bold ${tailleTexte}px Monospace`,
			color: "#ffffff",
			align: "center"
		});
		titreTxt.setOrigin(0.5, -1);
		titreTxt.setFontFamily("Anton");

		// Image de l'alien
		let imageAlien = this.add.image(game.config.width / 2, game.config.height / 2, "imageAlien");
		GrilleMontage.mettreEchelleLargeurJeu(imageAlien, 0.7);

		// Animer l'image de l'alien
		imageAlien.alpha = 0;
		this.tweens.add({
			targets: imageAlien,
			alpha: 1,
			duration: 2000
		});

		// Animation du titre
		this.tweens.add({
			targets: titreTxt,
			y: 0,
			duration: 1000,
			ease: 'Bounce.easeOut',
			callbackScope: this,
			onComplete: this.afficherBoutons
		});
	}

	/**
	 * Afficher les boutons (Jouer et Instructions)
	 */
	afficherBoutons() {
		// Instancier le bouton, le dimensionner
		let posX = game.config.width / 2,
			posY = game.config.height * 0.75,
			leBoutonJouer, leBoutonInstr;

		// Création et positionnement du bouton Jouer
		leBoutonJouer = this.add.image(posX, posY, "jouer", 0);

		//Position et du positionnement du bouton Instruction
		posY = game.config.height * 0.9,
		leBoutonInstr = this.add.image(posX, posY, "instructions", 0);

		// Mettre à l'échelle selon le ratio horizontal
		GrilleMontage.mettreEchelleRatioX(leBoutonJouer);
		GrilleMontage.mettreEchelleRatioX(leBoutonInstr);
		let echelleInit = leBoutonJouer.scaleX;

		// Animation des 2 boutons 
		this.tweens.add({
			targets: [leBoutonJouer, leBoutonInstr],
			props: {
				scaleX: echelleInit * 1.2,
				scaleY: echelleInit * 1.2
			},
			duration: 750,
			repeat: -1,
			yoyo: true,
		});

		// Aller à l'écran de jeu en cliquant sur le bouton Jouer
		leBoutonJouer.setInteractive();
		leBoutonJouer.once("pointerdown", this.allerEcranJeu, this);

		// Aller à l'écran des instructions en cliquant sur le bouton Instruction
		leBoutonInstr.setInteractive();
		leBoutonInstr.once("pointerdown", this.allerEcranInstruction, this);
	}

	/**
     * Aller à la scène jeu quand le bouton Jouer est cliquer
     */
	allerEcranJeu() {
		// Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}

	/**
     * Aller à la scène jeu quand le bouton Jouer est cliquer
     */
	allerEcranInstruction() {
		// Aller à l'écran de jeu
		this.scene.start("SceneInstruction");
	}
}