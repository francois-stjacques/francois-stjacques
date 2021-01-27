<?php 
    // Requête Wordpress
    query_posts(array(
        'post_type'      => 'post',                                     // S'assurer de ne prendre que les articles ("post")
        'cat'            => get_category_by_slug('galerie-ve')->term_id,// Prendre les articles dont la catégorie a le slug "galerie-ve"
        'posts_per_page' => 24                                          // Maximum de posts qu'on veut afficher dans la page
    ));

    // Que faire avec la requête?
    if(have_posts()){                                                   // N'afficher la section que si des articles sont trouvés
        $i = 0;
        echo "<h1>VIE ÉTUDIANTE</h1>";                                  // Titre de la section
        echo "<div class='container img-parent'>";                      // <div> avec le contenu de la section
        while ( have_posts() ) : the_post(); $i++;?>
        <!-- Début du code HTML pour chaque article -->
        <div class="img-enfants">
            <a href="#img-lightb-<?php echo formatterID($i); ?>">
                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="" class="gallerie-img-etudiante img-<?php echo formatterID($i); ?>">
            </a>
        </div>
        <a href="#_" class="lightbox" id="img-lightb-<?php echo formatterID($i); ?>">
            <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="">
        </a>
        <!-- Fin du code HTML -->
        <?php endwhile;
        echo "</div>";                                                  // Fin de la section
    }                       
    wp_reset_query();                                                   // Vider le cache de la requête Wordpress

    // get_the_post_thumbnail_url(get_the_ID())
    // Permet d'obtenir l'URL de l'image de mise à l'avant (thumbnail) de l'article, à partir de son ID
    
    // Renvoie un ID formatté avec un 0 devant s'il est plus petit que 10.
    // Exemples: 1 -> 01
    //          15 -> 15
    //           9 -> 09
    function formatterID($id){
        return ($id < 10 ? "0{$id}" : $id);
    }
?>