(function(){
	
	/* Prend la classe */
	var jouer = document.getElementsByClassName("photo");
	var dJouer = jouer.length;
	
	/*Les boutons contenu sur la barre principale*/
	var ajout = document.querySelector(".icone li:nth-child(1)");
	var retrait = document.querySelector(".icone li:nth-child(5)");
	
	/*Le premier bouton fait jouer l'effet sur la page*/
	ajout.addEventListener("click", function (){
	
		for (let i = 0; i < dJouer; i++) {
			jouer[i].classList.add("lumiere");
		}
	}, false);
	
	/*Le deuxième bouton enlève l'effet, remet la page à son état initial*/
	retrait.addEventListener("click", function (){
				
		for (let i = 0; i < dJouer; i++) {
			jouer[i].classList.remove("lumiere");
		}
	}, false);
})();

(function(){
	
	/* Prend la classe */
	var peinture = document.getElementsByClassName("photo");
	var dPeinture = peinture.length;
	
	/*Les boutons contenu sur la barre principale*/
	var appliquer = document.querySelector(".icone li:nth-child(2)");
	var retirer = document.querySelector(".icone li:nth-child(5)");
	
	/*Le premier bouton fait jouer l'effet sur la page*/
	appliquer.addEventListener("click", function (){
	
		for (let i = 0; i < dPeinture; i++) {
			peinture[i].classList.add("pinceau");
		}
	}, false);
	
	/*Le deuxième bouton enlève l'effet, remet la page à son état initial*/
	retirer.addEventListener("click", function (){
				
		for (let i = 0; i < dPeinture; i++) {
			peinture[i].classList.remove("pinceau");
		}
	}, false);
})();

(function(){
	
	/* Prend la classe */
	var changement = document.getElementsByClassName("photo");
	var dChangement = changement.length;
	
	/*Les boutons contenu sur la barre principale*/
	var mettre = document.querySelector(".icone li:nth-child(3)");
	var enlever = document.querySelector(".icone li:nth-child(5)");
	
	/*Le premier bouton fait jouer l'effet sur la page*/
	mettre.addEventListener("click", function (){
	
		for (let i = 0; i < dChangement; i++) {
			changement[i].classList.add("rotation");
		}
	}, false);
	
	/*Le deuxième bouton enlève l'effet, remet la page à son état initial*/
	enlever.addEventListener("click", function (){
				
		for (let i = 0; i < dChangement; i++) {
			changement[i].classList.remove("rotation");
		}
	}, false);
})();

(function(){
	
	/* Prend la classe */
	var grossir = document.getElementsByClassName("photo");
	var dGrossir = grossir.length;
	
	/*Les boutons contenu sur la barre principale*/
	var elargir = document.querySelector(".icone li:nth-child(4)");
	var retrecir = document.querySelector(".icone li:nth-child(5)");
	
	/*Le premier bouton fait jouer l'effet sur la page*/
	elargir.addEventListener("click", function (){
	
		for (let i = 0; i < dGrossir; i++) {
			grossir[i].classList.add("zoom");
		}
	}, false);
	
	/*Le deuxième bouton enlève l'effet, remet la page à son état initial*/
	retrecir.addEventListener("click", function (){
				
		for (let i = 0; i < dGrossir; i++) {
			grossir[i].classList.remove("zoom");
		}
	}, false);
})();