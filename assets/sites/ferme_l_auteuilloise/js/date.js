function dCourante() {
    var journee = new Date ();
   
    document.getElementById("jourActuel").innerHTML = journee.toLocaleTimeString();
}

function horloge() {
    var journee = new Date ();
    var annee = journee.getFullYear();
    var mois = journee.getMonth();
    var jour = journee.getDate();
    var semaine = journee.getDay();
    var heure = journee.getHours();
    var minute = journee.getMinutes();
    var seconde = journee.getSeconds();
    var arMois = new Array("janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre");
    var arJour = new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");
    // var m = mois[journee.getMonth()];
    // document.getElementById("jourActuel").innerHTML = (journee.getDate() + " " + m + " " + journee.getFullYear() + " " + s);
    var takeDate = arJour[semaine] + " " + jour + " " + arMois[mois] + " " + annee + " ";

if (heure < 10) {
heure = "0" +heure;
}

if (minute < 10) {
minute = "0" +minute;
}

if (seconde < 10) {
seconde = "0" +seconde;
}
takeDate += heure + ":" + minute + ":" + seconde;
document.getElementById("jourActuel").innerHTML = takeDate;
}