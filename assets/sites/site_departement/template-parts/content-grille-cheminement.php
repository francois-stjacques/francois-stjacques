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

	<div class="entry-content">
		<div class="cheminement">
			<!-- En-tête de la grille -->
			<h1>Grille de cheminement</h1>
			<div>
				<ul id="choix-session"><h2 class="titre-sessions">SESSIONS</h2><li>Session 1</li><li>Session 2</li><li>Session 3</li><li>Session 4</li><li>Session 5</li><li>Session 6</li></ul>
			</div>

			<!-- Début de la grille -->
			<div class="grille"><!-- Contenu de la grille -->
				<ul id="liste-cours"><!-- Gauche de la grille -->
				</ul>

				<div class="desc-cours"><!-- Droite de la grille -->
					<h2 id="titre-cours"><?php echo get_the_title(); ?></h2>
					<span id="desc-cours">
						<?php
							the_content();

							wp_link_pages(
								array(
									'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'homoioi' ),
									'after'  => '</div>',
								)
							);
						?>
					</span>
				</div>
			</div><!-- Fin de la grille -->
		</div><!-- Fin de la page -->
	</div><!-- .entry-content -->

    <div id="requete-cours">
        <?php
			$args = array(
				'post_type'      => 'post',
				'cat'            => get_category_by_slug('cours')->term_id,
				'posts_per_page' => -1
			);
			query_posts($args);
			while ( have_posts() ) : the_post();
				echo '<span>';

				// Titre du cours
				echo '<span class="cours-titre">';
				the_title();
				echo '</span>';

				// Description du cours
				echo '<span class="cours-description">';
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
