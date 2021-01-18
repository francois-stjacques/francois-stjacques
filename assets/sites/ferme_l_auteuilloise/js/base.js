function cacheImg() {
    var cacher = document.getElementById("photo");
    if (cacher.style.display ==="none") {
        cacher.style.display = "block";
    } else {
        cacher.style.display = "none";
    }
}

    document.getElementById("clair").addEventListener("click", function() {
        var i;
        var j;
        let body = document.querySelector('body');
        let titre = document.querySelectorAll('h3');
        let cCouleur = document.querySelector('.carreCouleur');
        let textuel = document.querySelectorAll('p');
        body.style.backgroundColor = "peachpuff";
        cCouleur.style.backgroundColor = "paleturquoise";

        for (i = 0; i < titre.length; i++){
            titre[i].style.color = "darkgoldenrod";
        }

        for (j = 0; j < textuel.length; j++){
            textuel[j].style.backgroundColor = "burlywood";
        }
    });

    document.getElementById("sombre").addEventListener("click", function() {
        var k;
        var l;
        let body1 = document.querySelector('body');
        let titre1 = document.querySelectorAll('h3');
        let cCouleur1 = document.querySelector('.carreCouleur');
        let textuel1 = document.querySelectorAll('p');
        body1.style.backgroundColor = "black";
        cCouleur1.style.backgroundColor = "grey";

        for (k = 0; k < titre1.length; k++){
            titre1[k].style.color = "white";
        }
        
        for (l = 0; l < textuel1.length; l++){
            textuel1[l].style.backgroundColor = "grey";
        }
    });

    function dCourante() {
        var journee = new Date();
        var mois = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
        var arJour = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");
        // var semaine = journee.getDay();
        var js = arJour[journee.getDay()];
        var m = mois[journee.getMonth()];
        var s = journee.toLocaleTimeString();
        document.getElementById("jourActuel").innerHTML = (js + " " + journee.getDate() + " " + m + " " + journee.getFullYear() + " " + s);
    }