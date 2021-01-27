<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Homoioi
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<!-- <header class="entry-header">
		<?php /*the_title( '<h1 class="entry-title">', '</h1>' );*/ ?>
	</header> -->
	<!-- .entry-header -->

	<?php /*homoioi_post_thumbnail();*/ ?>

	<h1 class="vtTitre">ENSEIGNANTS</h1>
		
	<div class="divProf prof1">
		<div class="imgProf"></div>

		<div class="infoProf">
			<h3></h3>
		</div>
	</div>
	<div class="divProf prof2">
		<div class="imgProf"></div>
		<div class="infoProf">
			<h3></h3>
		</div>
	</div>
	<div id="flecheG"><img src="http://127.0.0.1/homoioiWordpress/wp-content/uploads/2020/11/fleche.png" alt="fleche" ></div>
	<div id="flecheD"><img src="http://127.0.0.1/homoioiWordpress/wp-content/uploads/2020/11/fleche.png" alt="fleche" ></div>

    <div id="requete-enseignants">
        <?php
			$args = array(
				'post_type'      => 'post',
				'category_name'  => 'enseignant',
				'posts_per_page' => -1
			);
			query_posts($args);
			
			while ( have_posts() ) : the_post();
				echo '<span>';

				// Titre du cours 
				echo '<span class="enseignants-nom">';
				the_title();
				echo '</span>';

				// image du prof 
				echo '<span class="enseignants-srcImg">';
				the_content();
				echo '</span>';

				echo '</span>';
			endwhile;
			wp_reset_query();
		?>
    </div>

	<?php if ( get_edit_post_link() && false ) : ?>
		<footer class="entry-footer">
			<?php
			edit_post_link(
				sprintf(
					wp_kses(
						/* translators: %s: Name of current post. Only visible to screen readers */
						__( 'Edit <span class="screen-reader-text">%s</span>', 'homoioi' ),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					wp_kses_post( get_the_title() )
				),
				'<span class="edit-link">',
				'</span>'
			);
			?>
		</footer><!-- .entry-footer -->
	<?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->
