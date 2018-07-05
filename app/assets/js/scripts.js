// Global vars
let previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' ),
    styleStr = '';

/*
 * @function: Takes in an object that defines styles and converts it to CSS. Object can be standard CSS or a keyframe object.
 */
let convertCssObj = function( cssObj, keyframeStyles ) {
    let styleStr = '';

        for( let selector in cssObj ) {

            // Start the CSS rule set off with the selector (~class-name or @keyframes name)
            styleStr += ( keyframeStyles ) ? selector : '.' + selector.substr( 1 );

            // Open the declaration block
            styleStr += '{';

            let styleObj = cssObj[ selector ];

            // Loop over the styles, adding each declaration
            for( let styleKey in styleObj ) {
                // If keyframe flag is passed, generate the declaration accordingly (using the nested syntax)
                if( keyframeStyles ) {
                    let animationProp = styleObj[ styleKey ];

                    styleStr += styleKey + '{';

                    // Loop over the animation style declarations, appending each
                    for( let animationKey in animationProp ) {
                        styleStr += animationKey + ':' + animationProp[ animationKey ] + ';';
                    }

                    styleStr += '}';
                // Else the object represents standard CSS, so generate a standard declaration
                } else {
                    styleStr += styleKey + ':' + styleObj[ styleKey ] + ';';
                }
            }

            styleStr += '}';

        }

        return styleStr;
};

/*
 * @function: Function that takes in an array of objects that describe a set of slides, generating the slide markup from them and appending it to the DOM.
 */
let addSlides = function( slideArr ) {
    let slideMarkup = '<div class="simple-slider__slide"><div class="simple-slider__text-bg-triangle"></div><div class="simple-slider__content"><div class="simple-slider__text"><h1></h1><p></p></div></div><div class="simple-slider__image"><img/></div></div>',
        docFrag = document.createDocumentFragment();

    // Loop over each slide object in the array
    slideArr.forEach( function( slideObj ) {
        let tempTemplate = document.createElement( 'template' );

        tempTemplate.innerHTML = slideMarkup;

        // Set the content of the slide
        tempTemplate.content.querySelector( 'h1' ).innerText = slideObj.headerText;
        tempTemplate.content.querySelector( 'p' ).innerText = slideObj.bodyText;
        tempTemplate.content.querySelector( 'img' ).setAttribute( 'src', slideObj.imgLink );

        // Append the slide to the document fragment
        docFrag.appendChild( tempTemplate.content.firstChild );
    } );

    // Append the slide markup for the slider
    document.querySelector( '.simple-slider__slides' ).appendChild( docFrag );

    // Create the controls for the slider
    addControls( slideArr.length );

};

/*
 * @function: Function that generates the controls based on the number of slides. The first control is always set to active.
 */
let addControls = function( controlCount ) {
    let controlWrapper = document.createElement( 'ul' );

    for( let i = 0; i < controlCount; i++ ) {
        let control = document.createElement( 'li' );

        // If first control, make it active by appending the "control--on" div.
        if( i === 0 ) {
            let controlOn = document.createElement( 'div' );
            controlOn.className = 'simple-slider__control--on';
            control.appendChild( controlOn );
        }

        controlWrapper.appendChild( control );
    }

    // Append the controls to the control container
    document.querySelector( '.simple-slider__control' ).appendChild( controlWrapper );
};

// Generate the standard styles using an object that represents CSS with class names as properties defined before this file.
styleStr += convertCssObj( defaultStyles );

// Generate the animation styles using an object that represents CSS with animation names as properties defined before this file.
styleStr += convertCssObj( animationStyles, true /*Keyframe Styles*/ );

// Set preview styles
document.querySelector( '.ss-gen__preview-styles' ).innerHTML = styleStr;

// Dummy data representing the slides
let slideObjs = [ 
    {
        'headerText': 'Some header text',
        'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
        'imgLink': 'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450_1280.jpg'
    },
    {
        'headerText': 'Some header text',
        'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
        'imgLink': 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_1280.jpg'
    },
    {
        'headerText': 'Some header text',
        'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
        'imgLink': 'https://cdn.pixabay.com/photo/2018/05/28/23/35/sunset-3437560_1280.jpg'
    },
    {
        'headerText': 'Some header text',
        'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
        'imgLink': 'https://cdn.pixabay.com/photo/2018/05/13/21/55/water-3398111_1280.jpg'
    }
];

// Generate and append the slides
addSlides( slideObjs );

// Add the styles and markup to the textarea
previewTextarea.innerText = '<style type="text/css">' 
                            + styleStr 
                            + '</style>' 
                            + document.querySelector( '.ss-gen__preview-slider' ).innerHTML.trim();

