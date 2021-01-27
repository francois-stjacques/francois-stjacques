
( function() {
	document.addEventListener("DOMContentLoaded", function(){
		// Aller chercher les élements Menu et Menu Bouton
		let NavMenu = document.getElementById("menu-ul");
		let BtnMenu = document.getElementById("btn-menu");

		// Le bouton est à faux au début
		let Checked = false;
		
		// Lorsqu'on clique sur le bouton ou l'extérieur, le menu se ferme
		window.onclick = function(event) {			
			if (event.target == BtnMenu && !Checked){
				// console.log("Input checked");
				NavMenu.style.transform = "none";
				Checked = true;
			}			
									
			else if((event.target != NavMenu || event.target == BtnMenu) && Checked){
				// console.log("Input unchecked");
				NavMenu.style.transform = "translate(-100%, 0)";
				BtnMenu.checked = false;									
				Checked = false;
			}						
		}
	});
}() );

