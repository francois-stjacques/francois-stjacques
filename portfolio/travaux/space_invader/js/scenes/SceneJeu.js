// Importation de la grille de montage
import {
    GrilleMontage
} from "../utils/GrilleMontage.js";

/**
 * Classe representant la scène du jeu au complet
 */
export class SceneJeu extends Phaser.Scene {
    constructor() {
        super("SceneJeu");

        this.lesAlliens = null; // Groupe physiques pour les alliens
        this.lescouleurAliens = []; // Tableau pour les couleurs des aliens
        this.lesBalles = null; // Groupe physiques pour les balles
        this.minuterie = null; // Minuterie pour les balles
        this.tempsMinuterie = null; // Minuterie pour le temps du jeu
        this.tempsRestant = null; // Temps restant pour le jeu
        this.tempTxt; // Texte pour le temps du jeu
        this.scoreTxt; // Texte pour le score du jeu
        this.vieTxt; // Texte pour la vie du vaisseau
        this.vaisseau = null; // Le vaisseau
        this.vitesse = 10; // Vitesse de déplacement du vaisseau
        this.fleches = null; // Les touches de clavier fléchés
        this.sonBalle = null; // Son des balles lancés
        this.sonAmbianceJeu = null // Son d'ambiance du jeu
        this.sonExplosion = null; // Son de l'explosion
        this.boutonSon = null; // Le bouton pour gérer le son
        this.boutonPleinEcran = null; // Bouton plein écran

        // Vitesse des alliens
        this.vitesseAllien = 20 * GrilleMontage.ajusterRatioX();
    }

    /**
     * Initialise les propriétés de la scène du jeu
     */
    init() {
        // Initialiser le temps restant
        this.tempsRestant = game.Invaders.TEMPS_JEU;
        // Initialiser le score
        game.Invaders.score = 0;
        // Initialiser les vies
        game.Invaders.vies = 3;
        // Initialiser le groupe des aliens
        this.lesAlliens = this.physics.add.group();
        // Initialiser le tableau des couleurs à trouver
        this.lescouleurAliens = [];
    }

    /**
     * Création des objets et définir les principales fonctionnalités de la scène du jeu
     */
    create() {
        // Création de la grille de montage
        this.laGrille = new GrilleMontage(this, 8, 12);
        // this.laGrille.afficherGrille();

        // Créations des balles des aliens
        this.elmTir = this.physics.add.group()

        // Placer le texte du temps et du score
        let tailleTexte = Math.round(34 * GrilleMontage.ajusterRatioX());
        let leStyle = {
            font: `bold ${tailleTexte}px Monospace`,
            fill: "#ffffff",
            align: "center"
        }

        // Créer et afficher l'objet de type Text
        this.tempsTxt = this.add.text(this.game.config.width / 2, 0, "Temps restant: " + this.tempsRestant, leStyle);
        this.tempsTxt.setOrigin(0.9, -0.2)
        this.scoreTxt = this.add.text(game.config.width / 2, 0, "Score: " + game.Invaders.score, leStyle);
        this.scoreTxt.setOrigin(1.8, -1.2);
        this.vieTxt = this.add.text(game.config.width / 2, 0, "Vies: " + game.Invaders.vies, leStyle);
        this.vieTxt.setOrigin(-1.4, -0.2);

        // Changer les caractères
        this.tempsTxt.setFontFamily("Anton");
        this.scoreTxt.setFontFamily("Anton");
        this.vieTxt.setFontFamily("Anton");

        // Listes des aliens
        for (let i = 0; i < game.Invaders.NB_COULEURS_ALIENS; i++) {
            this.lescouleurAliens[i] = i;
        }

        // Placer les aliens
        this.placerAliens();

        // Positionnement du vaisseau, détection du contour de la page, ajustement des proportions
        this.vaisseau = this.physics.add.image(game.config.width, game.config.height, "vaisseaup");
        this.vaisseau.setOrigin(0.5, 0.5);
        this.vaisseau.setCollideWorldBounds(true);
        this.laGrille.mettreEchelleProportionMaximale(this.vaisseau, 1.5);

        // Création du groupe pour les balles
        this.lesBalles = this.physics.add.group();

        // Instancier un objet pour détecter les touches du clavier
        this.fleches = this.input.keyboard.createCursorKeys();

        // Détection des collisions
        this.physics.add.collider(this.lesAlliens, this.lesBalles, this.detruireAliens, null, this);
        this.physics.add.collider(this.lesAlliens, this.vaisseau, this.vieVaisseau, null, this);

        // Animation de l'explosion
        this.anims.create({
            key: "animExplosion",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 15,
        });

        // Minuterie pour les balles
        this.minuterie = this.time.addEvent({
            delay: 100,
            callback: this.fire,
            callbackScope: this,
            paused: true,
            loop: true
        });

        // Minuterie pour le temps du jeu
        this.tempsMinuterie = this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: this.diminuerTemps,
            callbackScope: this
        });

        // Partir le son d'ambiance, s'il n'a pas déjà été créé
        if (this.sonAmbianceJeu === null) {
            this.sonAmbianceJeu = this.sound.add("musique");
            this.sonAmbianceJeu.play({
                loop: true,
                volume: 0.3
            })
        }

        // Bouton pour gérer le son d'ambiance du jeu
        this.boutonSon = this.add.image(0, 0, "sonBtn", 0);
        this.laGrille.placerIndexCellule(0, this.boutonSon);
        this.laGrille.mettreEchelleProportionMaximale(this.boutonSon, 0.6);
        this.boutonSon.setInteractive({
            useHandCursor: true
        });

        // Gestionnaire d'événement sur le bouton du son
        this.boutonSon.on("pointerup", this.gererSon, this);

        // Gérer l'aspect du bouton si on rejoue
        (this.sonAmbianceJeu.isPlaying) ? this.boutonSon.setFrame(0): this.boutonSon.setFrame(1);

        // Info sur l'orientation
        // Gestion de l'orientation de l'écran si on n'est pas sur un ordinateur de bureau
        if (!this.sys.game.device.os.desktop === true) { // Pas un ordinateur de bureau
            // Gestion de l'orientation de l'écran sur mobile
            this.verifierOrientation();
            // Vérifier l'orientation pendant le jeu
            this.scale.on('resize', this.verifierOrientation, this);
        }

        // Permet le support du plein écran quand l'utilisateur n'utilise pas un appareil iOS
        // et si le plein écran est supporté par le navigateur
        if (!this.sys.game.device.os.iOS) {
            if (this.sys.game.device.fullscreen.available) {
                // Gestion du bouton plein écran
                this.boutonPleinEcran = this.add.image(0, 0, "pleinEcranBtn", 0);
                this.laGrille.placerIndexCellule(7, this.boutonPleinEcran);
                this.laGrille.mettreEchelleProportionMaximale(this.boutonPleinEcran, 0.5);

                // Utiliser le curseur "main"
                this.boutonPleinEcran.setInteractive({
                    useHandCursor: true
                });

                // Gestionnaire d'événement sur le bouton
                this.boutonPleinEcran.on("pointerup", this.mettreOuEnleverPleinEcran, this)
            }
        }

        // Rendre le vaisseau intéractif
        this.vaisseau.setInteractive({
            draggable: true
        });

        // Déplacer le vaisseau
        this.input.on('drag', this.glisserVaisseau, this);
    }

    /**
     * Tir aléatoire des aliens sur le vaisseau
     * @param {Phaser.Pointer} tirAleatoire 
     */

    /**
     * Placer les aliens
     */
    placerAliens() {
        let unAlien,
            couleurAlien,
            cellule = 8,
            nbColonnes = 7,
            nbLignes = 12;

        for (var i = 0; i < game.Invaders.NB_ALIENS; i++) {
            // Instancier les aliens et les dimensionner - ils sont créés directement dans le groupe
            unAlien = this.lesAlliens.create(0, 0, "alien");
            this.laGrille.placerIndexCellule(cellule, unAlien);
            this.laGrille.mettreEchelleProportionMaximale(unAlien, 0.8);

            // Chaque Allien mémorise sa colonne
            unAlien.colonne = i % nbColonnes;
            console.log(unAlien.colonne);

            // Mettre tous les aliens de couleurs différentes d'une manière aléatoire
            couleurAlien = Phaser.Utils.Array.GetRandom(this.lescouleurAliens);
            unAlien.setFrame(couleurAlien);
            unAlien.couleurAlien = couleurAlien;

            // Modifier la position du point d'ancrage de chaque Alien
            unAlien.setOrigin(0);

            // Ajuster le no de la cellule et gérer le no pour ne pas en mettre dans la dernière colonne
            cellule += 1;
            if (cellule === 15 || cellule === 23 || cellule === 31 || cellule === 39 || cellule === 47) {
                cellule++;
            }
        }

        // Attribuer la vitesse à tous les aliens du groupe
        this.lesAlliens.setVelocityX(this.vitesseAllien);
        this.lesAlliens.setVelocityY(2);
    }

    /**
     * Déplacer le vaisseau lorsqu'on est sur mobile
     * @param {*} pointer 
     * @param {*} vaisseauChoisi 
     * @param {*} dragX 
     */
    glisserVaisseau(pointer, vaisseauChoisi, dragX){
        vaisseauChoisi.x = dragX;
    }

    /**
     * Création d'une nouvelle balle dans le groupe
     */
    fire() {
        let uneBalle = this.lesBalles.create(this.vaisseau.x, this.vaisseau.y, "ballep");
        uneBalle.setVelocityY(-400);
        uneBalle.depth = -1
    }

    /**
     * Vérifier l'orientation de l'écran
     */
    verifierOrientation() {
        // Si l'orientation est a 90 degrée
        if (window.orientation === 90 || window.orientation === -90) {
            // On met le jeu en pause et on arrête le son
            this.scene.pause(this);
            // On affiche la balise <div>
            document.getElementById("orientation").style.display = "block";
        } else {
            // On repart le jeu et le son
            this.scene.resume(this);
            // On enlève l'affichage de la balise <div>
            document.getElementById("orientation").style.display = "none";
        }
    }

    /**
     * Gère le son d'ambiance pour le mettre en pause ou non
     * @param {Phaser.Pointer} pointeur Le dispositif de pointage (souris, doigt...)
     */
    gererSon(pointeur) {
        if (this.sonAmbianceJeu.isPlaying) {
            this.sonAmbianceJeu.pause();
            this.boutonSon.setFrame(1);
            // Mémoriser qu'on a arrêté le son au cas où il y aurait un changement d'orientation
            game.sonJoue = false;
        } else {
            this.sonAmbianceJeu.resume();
            this.sonExplosion.play();
            this.boutonSon.setFrame(0);
            // Mémoriser qu'on a reparti le son au cas où il y aurait un changement d'orientation
            game.sonJoue = true;
        }
    }

    /**
     * Gère le mode plein-écran sur un ordinateur de bureau
     * @param {Phaser.Pointer} pointeur Le dispositif de pointage (souris, doigt...)
     */
    mettreOuEnleverPleinEcran() {
        // Si on n'est pas en mode plein écran on le met, sinon on l'enlève
        if (!this.scale.isFullscreen) {
            this.scale.startFullscreen();
        } else {
            this.scale.stopFullscreen();
        }
    }

    /**Détection des touches gauche et droite pour animer le vaisseau
     * Détection de la barre d'espace pour tirer avec, son de tir
     * Gestion de l'aspect des bouton pour le plein écran au cas où le joueur aurait enlevé le plein-écran avec la touche ESC
     */
    update() {
        if (!this.sys.game.device.os.iOS && this.sys.game.device.fullscreen.available) {
            (!this.scale.isFullscreen) ? this.boutonPleinEcran.setFrame(0): this.boutonPleinEcran.setFrame(1);
        }

        if (this.fleches.right.isDown) {
            this.vaisseau.x += this.vitesse;
        } else if (this.fleches.left.isDown) {
            this.vaisseau.x -= this.vitesse;
        }

        if (this.fleches.space.isDown) {
            let sonBalle = this.sound.add("sons", {
                volume: 1
            });
            sonBalle.play();

            this.minuterie.paused = false;
        } else if (this.fleches.space.isUp) {
            this.minuterie.paused = true;

        }

        // Gérer la vitesse et le déplacement des alliens
        this.gererVitesseEtDeplacementAlliens();
    }

    /**
     * Destruction des aliens avec la balle
     */
    detruireAliens(unAlien, uneBalle) {
        uneBalle.disableBody(true, true);

        // On détruit l'alien
        unAlien.destroy();

        // Incrémenter le score et l'afficher
        game.Invaders.score += 1;
        this.scoreTxt.text = "Score: " + game.Invaders.score;

        // Animation de l'explosion lorsqu'un alien est touché
        let sonExplose = this.sound.add("explose", {volume: 1});
        sonExplose.play();
        let uneExplosion = this.add.sprite(unAlien.x, unAlien.y, "explosion");
        uneExplosion.anims.play("animExplosion");
    }

    /**
     * Gestion de la vie du vaisseau
     */
    vieVaisseau(){
        // Diminuer la vie du vaisseau
        game.Invaders.vies -= 1;
        this.vieTxt.text = "Vies: " + game.Invaders.vies;

        // Si le vaisseau n'a plus de vie, alors le jeu est fini
        if (game.Invaders.vies === 0) {
            this.scene.start("SceneFinJeu");
        }
    }


    /**
     * Gérer la vitesse et le déplacement des alliens
     */ 
    gererVitesseEtDeplacementAlliens() {
        // Boucler sur tous les aliens restants pour connaître l'index minimal et maximal des colonnes
        // où il reste des aliens
        let indexDesColonnes = []; //Index des colonnes des aliens restants
        for (let unAlien of this.lesAlliens.getChildren()) {
            indexDesColonnes.push(unAlien.colonne);
        };

        // Enregistrer les index les plus élevés vers la gauche ou vers la droite
        let indexColonneGauche = Math.min(...indexDesColonnes);
        let indexColonneDroite = Math.max(...indexDesColonnes);
        console.log("indexColonneGauche:", indexColonneGauche, "indexColonneDroite", indexColonneDroite);

        // Si la vitesse est positive, les aliens vont vers la droite donc on va vérifier la position
        // du premier alien qui a la valeur trouvée pour indexColonneDroite et vice versa

        // Variable pour indiquer après la boucle for si on peut changer la vitesse ou non
        let peutChangerVitesse = false;

        for (let unAlien of this.lesAlliens.getChildren()) {
            if (this.vitesseAllien > 0) {
                if (unAlien.colonne === indexColonneDroite) {
                        if (unAlien.x + unAlien.displayWidth > game.config.width) {
                            // On pourra changer la vitesse et on sort de la boucle
                            peutChangerVitesse = true;
                            break;
                        }
                }
            } else { // Autrement c'est un déplacement vers la gauche
                if (unAlien.colonne === indexColonneGauche) {
                    if (unAlien.x < 0) {
                        // On pourra changer la vitesse et on sort de la boucle
                        peutChangerVitesse = true;
                        break;
                    }
                }
            }
        };

        // Inversion de la vitesse
        if (peutChangerVitesse === true) {
            this.vitesseAllien *= -1;
            this.lesAlliens.setVelocityX(this.vitesseAllien);
            this.lesAlliens.setVelocityY(2);
        }
    }

    /**
     * Temps restant pour le jeu
     */
    diminuerTemps() {
        this.tempsRestant--;
        this.tempsTxt.text = "Temps restant: " + this.tempsRestant;

        // Si toutes les secondes sont écoulées, c'est la fin du jeu
        if (this.tempsRestant === 0) {
            // Arrêter la minuterie du jeu
            this.tempsMinuterie.destroy();

            // On va à la scène de la fin du jeu
            this.scene.start("SceneFinJeu");
        }
    }
}