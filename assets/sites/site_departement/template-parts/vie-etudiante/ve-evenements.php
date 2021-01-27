<?php 
    query_posts(array(
        'post_type'      => 'post',
        'cat'            => get_category_by_slug('evenement')->term_id,
        'posts_per_page' => 3
    ));
    if(have_posts()){
        $i = 0;

        echo "<h1>ÉVÉNEMENTS</h1><div class='container'>";
        while ( have_posts() ) : the_post();
            $i++;
            if($i == 1){
                echo ("<a href='".get_post_permalink()."' class='evenement-premier'>");
                    //echo "<span class='parent-image' style='background-image:url(\"".get_the_post_thumbnail_url(get_the_ID())."\");'>";
                    echo "<span class='parent-evenement'>";
                        echo "<div class='parent-image'>";
                            echo "<span class='img-evenement' style='background-image:url(\"".get_the_post_thumbnail_url(get_the_ID())."\");'>";
                        echo "</div>";
                        echo "<h1>";
                            the_title();
                        echo "</h1>";
                    echo "</span>";
                echo "</a>";
                echo "<div class='autres-evenements'>";
                echo "<a href='".get_post_permalink()."' class='premier-event-secondaire' style='background-image:url(\"".get_the_post_thumbnail_url(get_the_ID())."\");'>";
                    echo "<h2>";
                        the_title();
                    echo "</h2>";
                echo "</a>";
            } else {
                echo "<a href='".get_post_permalink()."' style='background-image:url(\"".get_the_post_thumbnail_url(get_the_ID())."\");'>";
                    echo "<h2>";
                        the_title();
                    echo "</h2>";
                echo "</a>";
            }
        endwhile;
        echo "</div></div>";
    }
    wp_reset_query();
?>