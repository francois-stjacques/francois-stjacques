<?php 
    // Requête Wordpress
    query_posts(array(
        'post_type'      => 'post',                                     // S'assurer de ne prendre que les articles ("post")
        'cat'            => get_category_by_slug('stages-ve')->term_id, // Prendre les articles dont la catégorie a le slug "evenement"
        'posts_per_page' => 1                                           // Maximum de posts qu'on veut afficher dans la page
    ));

    // Que faire avec la requête?
    if(have_posts()){
        echo "<h1> </h1>";
        while ( have_posts() ) : the_post(); $i++; ?>                         
            <!-- HTML ici-->
            <div class="contenant">
                <div class="conteneur-image">
                    <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>" alt="">
                    <h1 class="texte-stages">À propos des stages</h1>
                </div>
                <?php the_content(); ?>
            </div>
            <!-- Fin du HTML -->
        <?php endwhile;
    }
    wp_reset_query();                          
?>