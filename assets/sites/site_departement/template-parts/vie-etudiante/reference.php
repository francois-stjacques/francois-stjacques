<?php 
    // Requête Wordpress
    query_posts(array(
        'post_type'      => 'post',                                         // S'assurer de ne prendre que les articles ("post")
        'cat'            => get_category_by_slug('categorie')->term_id,     // Prendre les articles dont la catégorie a le slug "categorie"
        'posts_per_page' => 3                                              // Maximum de posts qu'on veut afficher dans la page (-1 pour l'intégralité des articles)
    ));

    // Que faire avec la requête?
    if(have_posts()) : $i = 0;?>
        
        <h1>SECTION</h1>                        <!-- Titre de la section-->
        <div class='container'>
            <?php while ( have_posts() ) : the_post(); $i++; ?>
                <!-- Début du code HTML -->
                <!-- Code HTML qui sera affiché pour chaque article -->

                <!-- Fin du code HTML -->
            <?php endwhile; ?>
        </div>
    <?php endif;
    wp_reset_query();                           // Vider le cache de la requête Wordpress
?>