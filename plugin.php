<?php
/**
 * Plugin Name: Iframe Block
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Iframe Block for the Gutenberg Block Editor
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
