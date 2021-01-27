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
		<div class="vie-au-tim">
			<?php
			the_content();

			wp_link_pages(
				array(
					'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'homoioi' ),
					'after'  => '</div>',
				)
			);
			?>

			<!-- Ajouter toutes les parties à la page de la vie étudiante -->
			<div id="ve-evenements">
				<?php include 'vie-etudiante/ve-evenements.php'; ?>
			</div>
			<div id="ve-enseignants">
				<?php include 'vie-etudiante/ve-enseignants.php'; ?>
			</div>
			<div id="ve-projet">
				<?php include 'vie-etudiante/ve-projet.php'; ?>
			</div>
			<div id="ve-vie-etudiante">
				<?php include 'vie-etudiante/ve-vie-etudiante.php'; ?>
			</div>
			<div id="ve-stages">
				<?php include 'vie-etudiante/ve-stages.php'; ?>
			</div>
		</div>
	</div><!-- .entry-content -->

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
