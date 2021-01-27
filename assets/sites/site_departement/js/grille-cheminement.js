(function(){

    let classeSessionActive = `session-active`;
    let classeCoursActif = `cours-actif`;

    // Liste des cours pour chaque session
    let listeCours = [[],[],[],[],[],[]];
    
    let tmpElm;		// Élément HTML temporaire pour la création de la liste de cours
    let tmpSession;	// Variables temporaires pour séparer les cours en sessions

    // Éléments HTML importants
    let elmListeCours, elmTitreCours, elmDescCours, elmSessions;

    document.addEventListener("DOMContentLoaded", () => {
        elmListeCours = document.getElementById("liste-cours");
        elmTitreCours = document.getElementById("titre-cours");
        elmDescCours = document.getElementById("desc-cours");
        elmSessions = document.getElementById("choix-session");
        if(elmListeCours && elmTitreCours && elmDescCours){
            recupererCours();
            afficherListe();
            interactionSessions();
            if(typeof elmSessions.children[1] != `undefined`) sessionActive(elmSessions.children[1]);

            let query = window.matchMedia("(max-width: 960px)");
            query.addListener(MediaQuery);
            MediaQuery(query);

        }else console.error(`Impossible d'afficher la liste des cours,\nau moins un élément avec l'ID suivant est introuvable: "liste-cours", "titre-cours", "desc-cours".`);
    });

    // Récupère la liste des cours venant de la requête Wordpress
    function recupererCours(){
        let requete = document.getElementById("requete-cours").children;

        for(let i = 0; i < requete.length; i++){
            tmpSession = parseInt(requete[i].children[0].innerHTML.charAt(4));
            if(tmpSession && tmpSession != NaN){
                listeCours[tmpSession-1].push({
                    titre: requete[i].children[0].innerHTML,
                    description: requete[i].children[1].innerHTML
                });
            } else console.warn(`Le titre d'un cours ne commence pas par le code du cours contenant le numéro de session.`);
        }
        document.getElementById("requete-cours").remove();
    }

    function afficherListe(session = 1){
        elmListeCours.innerHTML = "";
        for(let i = 0; i < listeCours[session-1].length; i++){
            // Créer un nouvel élément de la liste
            tmpElm = document.createElement("li");
            tmpElm.innerHTML = listeCours[session-1][i].titre.substring(7);

            // Ajouter l'interaction à la liste
            tmpElm.addEventListener("click", (event) => {
                elmTitreCours.innerHTML = listeCours[session-1][i].titre;
                elmDescCours.innerHTML = listeCours[session-1][i].description;
                coursActif(event.target);
            });

            // Ajouter l'élément de la liste à la page
            elmListeCours.appendChild(tmpElm);
        }
    }

    function interactionSessions(){
        for(let i = 1; i < elmSessions.children.length; i++){
            elmSessions.children[i].addEventListener("click", (event) => {
                sessionActive(event.target);
                afficherListe(i);
            });
        }
    }

    function sessionActive(session){
        for(let i = 1; i < elmSessions.children.length; i++){
            elmSessions.children[i].classList.remove(classeSessionActive);
        }
        session.classList.add(classeSessionActive);
    }

    function coursActif(cours){
        for(let i = 0; i < elmListeCours.children.length; i++){
            elmListeCours.children[i].classList.remove(classeCoursActif);
        }
        cours.classList.add(classeCoursActif);
    }

    function MediaQuery(query){
        if(query.matches){
            for(let i = 1; i < elmSessions.children.length; i++){
                elmSessions.children[i].innerHTML = i;
            }
        }else{
            for(let i = 1; i < elmSessions.children.length; i++){
                elmSessions.children[i].innerHTML = `Session ${i}`;
            }
        }
    }
})();