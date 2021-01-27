<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package homoioi
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<link href="https://fonts.googleapis.com/css2?family=Questrial&family=Yantramanav:wght@400;900&display=swap" rel="stylesheet">

	<?php wp_head(); ?>
</head>

<body <?php body_class(array($pagename)); ?> >
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'homoioi' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="site-branding">
			<?php
			the_custom_logo();
			/*if ( is_front_page() && is_home()) :
				?>
				<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
				<?php
			else :
				?>
				<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php
			endif;*/
			$homoioi_description = get_bloginfo( 'description', 'display' );
			/*if ( $homoioi_description || is_customize_preview() ) :
				?>
				<p class="site-description"><?php echo $homoioi_description; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
			<?php endif; */?>
		</div><!-- .site-branding -->
		
		<!-- La programmation de menu de navigation à été inspiré de plusieurs exemples sur Internet
			 Par Nick Michelle Joseph
		-->
		<nav id="site-navigation">				
			<div id="menu-toggle" > 				
				<input id="btn-menu" type="checkbox"/>
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu-ul">
					<?php
						wp_nav_menu(
							array(
								'theme_location' => 'menu-1',
								'menu_id'        => 'primary-menu',
								'menu_class'     => 'menu',
							)
						);
					?>
					<ul id="primary-menu">
						<li><a href="<?php echo get_site_url(); ?>/la-vie-au-tim/#ve-projet">Galerie des Projets</a></li>
						<li><a href="<?php echo get_site_url(); ?>/la-vie-au-tim/#ve-stages">Stages</a></li>
						<li><a href="<?php echo get_site_url(); ?>/la-vie-au-tim/#ve-evenements">Événements</a></li>
						<li><a href="<?php echo get_site_url(); ?>/la-vie-au-tim/#ve-enseignants">Enseignants</a></li>						
						<div id="TIM">
							<p>Techniques d'Intégration Multimédia</p>
							<a id="M9" href="https://www.cmaisonneuve.qc.ca/" title="Collège de Maisonneuve">Collège de Maisonneuve</a>
						</div>
						<div id="icon">
							<a href="https://www.facebook.com/maisonneuvetim/" target="_blank">
								<img src="<?php echo get_template_directory_uri(); ?>/images/f_logo_RGB-White_58.png" alt="Facebook">
							</a>
							<a href="https://www.youtube.com/user/TIMaisonneuve" target="_blank">
								<img src="<?php echo get_template_directory_uri(); ?>/images/yt_logo_mono_light.png" alt="Youtube">	
							</a>
							<a href="https://www.instagram.com/maisonneuvetim/" target="_blank">
								<img src="<?php echo get_template_directory_uri(); ?>/images/glyph-logo_May2016-Light.png" alt="Instagram">
							</a>
							<a href=" https://discord.gg/53vFvr9" target="_blank">
								<img src="<?php echo get_template_directory_uri(); ?>/images/Discord-Logo-Light.png" alt="Discord">
							</a>					
						</div>
					</ul>																		
				</ul>																
			</div>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->