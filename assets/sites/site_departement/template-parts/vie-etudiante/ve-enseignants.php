<?php 
    // Requête Wordpress
    query_posts(array(
        'post_type'      => 'post',                                         // S'assurer de ne prendre que les articles ("post")
        'cat'            => get_category_by_slug('enseignant')->term_id,    // Prendre les articles dont la catégorie a le slug "categorie"
        'posts_per_page' => -1                                              // Maximum de posts qu'on veut afficher dans la page
    ));

    // Que faire avec la requête?
    if(have_posts()) : $i = 0;?>
        
        <h1>ENSEIGNANTS</h1>                        <!-- Titre de la section-->
        <div class='container'>
            <div class="conteneur-grid">
                <div class="divProf prof1">
                    <div class="imgProf"><img src="" alt="" ></div>
                    <div class="infoProf"></div>
                </div>
                <div class="divProf prof2">
                    <div class="imgProf"><img src="" alt="" ></div>
                    <div class="infoProf"></div>
                </div>
                <div id="flecheG"><img src="<?php echo get_template_directory_uri(); ?>/images/fleche.png" alt="fleche" ></div>
                <div id="flecheD"><img src="<?php echo get_template_directory_uri(); ?>/images/fleche.png" alt="fleche" ></div>
            </div>

            <div id="requete-enseignants">
            <?php while ( have_posts() ) : the_post(); $i++; ?>
                <span>
                    <span class="enseignants-nom">
                        <h3><?php the_title(); ?></h3>
                        <p><?php the_content(); ?></p>
                    </span>

                    <span class="enseignants-srcImg">
                        <?php//the_content(); ?>
                        <figure>
                            <img src="<?php echo get_the_post_thumbnail_url(get_the_ID()); ?>">
                        </figure>
                    </span>
                </span>
            <?php endwhile; ?>
            </div>
        </div>
    <?php endif;
    wp_reset_query();
?>
