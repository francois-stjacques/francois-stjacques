<?php 
    // Requête Wordpress
    query_posts(array(
        'post_type'      => 'post',                                     // S'assurer de ne prendre que les articles ("post")
        'cat'            => get_category_by_slug('projet-ve')->term_id, // Prendre les articles dont la catégorie a le slug "evenement"
        'posts_per_page' => 4                                           // Maximum de posts qu'on veut afficher dans la page
    ));

    // Que faire avec la requête?
    if(have_posts()){                           // N'afficher la section que si des articles sont trouvés
        $i = 0;
        echo "<h1>PROJETS</h1>";                // Titre de la section
        echo "<div class='img-parent'>";         // <div> avec le contenu de la section
        while ( have_posts() ) : the_post();    // Boucle s'effectuant pour chaque article
            $i++;                               // Incrémenter le compteur ?>                               
            <!-- Intégrer le HTML ici -->
        <div class="projet-enfants">
            <a href="#projet-lightb-<?php echo $i; ?>">
                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="" class="gallerie-img-etudiante">
            </a>
        </div>
        <a href="#_" class="lightbox" id="projet-lightb-<?php echo $i; ?>">
            <?php the_content(); ?>
        </a>
        <?php endwhile;
        echo "</div>";                          // Fin de la section
    }
    wp_reset_query();                           // Vider le cache de la requête Wordpress
?>