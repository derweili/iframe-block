<?php
/**
 * Plugin Name: PDF Embed Block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: PDF Block for the Gutenberg Block Editor
 * Author: derweili
 * Author URI: https://derweili.de/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';


/**
 * Load plugin textdomain.
 *
 * @since 1.0.0
 */
function derweili_pdf_block_load_textdomain() {
	load_plugin_textdomain( 'derweili-pdf-block', false, plugin_basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'derweili_pdf_block_load_textdomain' );
