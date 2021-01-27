(function(){
    document.addEventListener("DOMContentLoaded", function(){
        let actif = true;

        let query = window.matchMedia("(max-width: 960px)");
        query.addListener(MediaQuery);
        MediaQuery(query);

        // Sélecteur CSS pour récupérer l'élément HTML
        let selecteur = ".logo-site";// insert logo class or id here
        // "Multiplicateur" pour le déplacement de l'élément
        let facteur1 = 0.03;
        let facteur2 = 0.03;
        let diffX, diffY;
        let transform = `
            translateX(-50%) 
            translateY(-50%) 
            rotate(30deg)
        `;
        let elements = document.querySelectorAll(selecteur);
        function offsetObjects(mouseEvent){
            if(actif){
                diffX = window.innerWidth/2 - mouseEvent.pageX;
                diffY = window.innerHeight/2 - mouseEvent.pageY;
                transform = `
                    translateX(calc(${diffX * facteur1}px - 50%)) 
                    translateY(calc(${diffY * facteur2}px - 50%)) 
                    rotate(30deg)
                `;
            } else{
                transform = `
                    translateX(-50%) 
                    translateY(-50%) 
                    rotate(30deg)
                `;
            }
            for(let i = 0; i < elements.length; i++){
                elements[i].style.transform = transform;
                elements[i].style.msTransform = transform;
                elements[i].style.webkitTransform = transform;
            }
        }

        if(elements) {
            for(let i = 0; i < elements.length; i++){
                elements[i].style.transform = transform;
                elements[i].style.msTransform = transform;
                elements[i].style.webkitTransform = transform;
            }
            document.addEventListener("mousemove", offsetObjects);
        }
        else console.warn(`Aucun élément répondant au sélecteur ${selecteur} n'a été trouvé.`);

        function MediaQuery(query){
            actif = !query.matches;
        }
    }, false);
})();