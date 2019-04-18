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
import { Button, Placeholder, TextControl, Toolbar, IconButton, FormFileUpload, Disabled } from '@wordpress/components';

// import {  } from '@wordpress/block-editor';
const { MediaPlaceholder } = wp.editor;

const attributes = {
  src: {
			type: 'string',
			// source: 'attribute',
			// selector: 'video',
			// attribute: 'src',
	},
  id: {
		type: 'number',
	},
};

const ALLOWED_MEDIA_TYPES = [ 'application/pdf' ];

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
registerBlockType( 'derweili/pdf-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'PDF Embed Block' ), // Block title.
	icon: 'media-default', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'iframe' ),
		__( 'PDF' ),
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
         this.state = {
    				showPreview: this.props.attributes.src ? true : false,
            cannotEmbed: false
  			 };
     }

     /*
      * Save changed URL to attributes
      */
     onUrlChange( newUrl ) {
       this.props.setAttributes( { url: newUrl } );
     }

     /*
      * Validate URL and Toogle Preview
      */
     togglePreview( event ) {
       console.log('togglePreview');
       const { src } = this.props.attributes;
       const { showPreview } = this.state;

       if ( event ) {
         event.preventDefault();
       }

       if(showPreview){
         this.setState( {
           showPreview: false
         } );
       }else if ( ! src ) {
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
        const { src } = attributes;
        const { showPreview } = this.state;

        const onSelectPDF = ( media ) => {
          console.log('onSelectPDF')
          if ( ! media || ! media.url ) {
            console.warn('onSelectPdf', 'media not set');
            // in this case there was an error and we should continue in the editing state
            // previous attributes should be removed because they may be temporary blob urls
            this.props.setAttributes( { src: undefined, id: undefined } );
            // switchToEditing();
            return;
          }
          console.log('onSelectPDF', 'media set')
          // sets the block's attribute and updates the edit component from the
          // selected media, then switches off the editing UI
          this.props.setAttributes( { src: media.url, id: media.id } );
          this.setState( { src: media.url } );
          this.togglePreview();
        };

        const onSelectUrl = ( url ) => {
          if ( ! url ) {
            this.props.setAttributes( { src: undefined, id: undefined } );
            return
          }
          this.props.setAttributes( { src: url, id: undefined } );
          this.setState( { src: url } );
          this.togglePreview();
        };

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

                <MediaPlaceholder
        					className={ className }
        					onSelect={ onSelectPDF }
        					onSelectURL={ onSelectUrl }
        					accept="application/pdf"
        					allowedTypes={ ALLOWED_MEDIA_TYPES }
        					value={ this.props.attributes }
        					onError={ (error) => console.log('onError', error) }
                  labels = { { title: 'PDF Viewer', instructions: 'Drag a PDF, upload a new one or select a file from your library.' } }
        				/>

              }
              { showPreview &&
                <div>
                  <Disabled>
                    <iframe src={src} frameborder="0" height="400"></iframe>
                    <a href={src} className="pdf-download-button">{ __('Download PDF', 'derweili-pdf-block') }</a>
                  </Disabled>
                </div>
              }
            </div>
          </Fragment>
        );
     }
   },

   deprecated: [
      {
          attributes: attributes,

          save: function( props ) {
            const { className } = props;
            const { src } = props.attributes;
        		return (
              <Fragment>
                <div className={`derweili-pdf-block ${className}`}>
                  <iframe src={src} className={className} frameborder="0"></iframe>
                  <a href={src} className="pdf-download-button">Download</a>
                </div>
              </Fragment>
        		);
        	},
      }
  ],

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
    const { className } = props;
    const { src } = props.attributes;
		return (
      <Fragment>
        <div className={`derweili-pdf-block ${className}`}>
          <div className="derweili-pdf-block--iframe-container">
            <iframe src={src} className={className} frameborder="0"></iframe>
          </div>
          <a href={src} className="pdf-download-button">{ __('Download PDF', 'derweili-pdf-block') }</a>
        </div>
      </Fragment>
		);
	},
} );
