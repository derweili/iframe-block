/**
 * BLOCK: iframe-embed-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const { Component } = wp.element;
const { BlockControls } = wp.editor;

import { Fragment } from '@wordpress/element';
import { Button, Placeholder, TextControl, Toolbar, IconButton } from '@wordpress/components';


const attributes = {
  url: {
    type: 'string',
    default: ''
  },
};

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'derweili/iframe-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Iframe Embed Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'iframe-embed-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],

  attributes,

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
   edit: class extends Component {

     constructor(props) {
         super(...arguments);
         this.props = props;
         console.log('beforeSetState ', this.props.attributes.url );
         this.state = {
    				showPreview: this.props.attributes.url ? true : false,
            cannotEmbed: false
  			 };
     }

     /*
      * Save changed URL to attributes
      */
     onUrlChange( newUrl ) {
       console.log('new URL', newUrl);
       this.props.setAttributes( { url: newUrl } );
     }

     /*
      * Validate URL and Toogle Preview
      */
     togglePreview( event ) {
       console.log('tooglePreview', this);
       const { url } = this.props.attributes;
       const { showPreview } = this.state;

       if ( event ) {
         event.preventDefault();
       }

       if(showPreview){
         this.setState( {
           showPreview: false
         } );
       }else if ( ! url ) {
         this.setState( { cannotEmbed: true } );
       }else{
         this.setState( {
           cannotEmbed: false,
           showPreview: true
         } );
       }

     }

     render() {

        const { className, attributes } = this.props;
        const { url } = attributes;
        const { showPreview } = this.state;

        return (
          <Fragment>
            <BlockControls>
              <Toolbar>
      					{ showPreview && (
      						<IconButton
      							className="components-toolbar__control"
      							label={ __( 'Edit URL' ) }
      							icon="edit"
      							onClick={ (event) => this.togglePreview(event) }
      						/>
      					) }
      				</Toolbar>
            </BlockControls>
            <div className={className}>
              { ! showPreview &&
                <Placeholder
                  icon="wordpress-alt"
                  label="Placeholder"
                >
                  <form onSubmit={ (event) => this.togglePreview(event) }>
                    <TextControl
                      label=""
                      type="url"
                      value={ url }
                      required
                      onChange={ (input) => this.onUrlChange(input) }
                    />
            				<Button
            					isLarge
            					type="submit">
            					Embed
            				</Button>
            				{ this.state.cannotEmbed &&
            					<p className="components-placeholder__error">
            						{ __( 'Please enter a URL.' ) }<br />
            					</p>
            				}
            			</form>
                </Placeholder>
              }
              { showPreview &&
                <iframe src={url} frameborder="0" height="400"></iframe>
              }
            </div>
          </Fragment>
        );
     }
   },

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>iframe-embed-block</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );
