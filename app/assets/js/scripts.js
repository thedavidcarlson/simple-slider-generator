// Global Variables
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
    ],
    timePerSlide = 7,
    slideAnimationLength = 1.5,
    textAnimationLength = .7,
    textSlideAnimationDelay = .3;

/*
 * @function: Takes in an object that defines styles and converts it to CSS. Object can be standard CSS or a keyframe object.
 */
const convertCssObj = function( cssObj, keyframeStyles ) {
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
const addSlides = function( slideArr ) {
    const slideMarkup = '<div class="simple-slider__slide"><div class="simple-slider__text-bg-triangle"></div><div class="simple-slider__content"><div class="simple-slider__text"><h1></h1><p></p></div></div><div class="simple-slider__image"><img/></div></div>';
    let docFrag = document.createDocumentFragment();

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

    // Create the controls for the slider
    let controls = document.createElement( 'div' );

    controls.className = 'simple-slider__control';
    controls.appendChild( addControls( slideArr.length ) );

    // Append the slide markup for the slider
    let slides = document.createElement( 'div' );

    slides.className = 'simple-slider__slides';
    slides.appendChild( docFrag );

    let tempContainer = document.createElement( 'div' );

    tempContainer.appendChild( slides );
    tempContainer.appendChild( controls );

    document.querySelector( '.simple-slider' ).innerHTML = tempContainer.innerHTML;
};

/*
 * @function: Function that generates the controls based on the number of slides. The first control is always set to active.
 */
const addControls = function( controlCount ) {
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
    return controlWrapper;
};

const generateSlider = function() {
    let previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' ),
        styleStr = '';

    setDynamicStyleValues();

    // Generate the standard styles using an object that represents CSS with class names as properties defined before this file.
    styleStr += convertCssObj( defaultStyles );

    // Generate the animation styles using an object that represents CSS with animation names as properties defined before this file.
    styleStr += convertCssObj( animationStyles, true /*Keyframe Styles*/ );

    // Set preview styles
    document.querySelector( '.ss-gen__preview-styles' ).innerHTML = styleStr;

    // Generate and append the slides
    addSlides( slideObjs );

    // Add the styles and markup to the textarea
    previewTextarea.innerText = '<style type="text/css">' 
                                + styleStr 
                                + '</style>' 
                                + document.querySelector( '.ss-gen__preview-slider' ).innerHTML.trim();
};

const setDynamicStyleValues = function() {
    let numSlides = slideObjs.length;

    setAnimationLength( numSlides );

    // Set slide widths based on # of slides
    defaultStyles[ '~simple-slider__slides' ].width = ( numSlides * 100 ) + '%';
    defaultStyles[ '~simple-slider__slide' ].width = ( 100 / numSlides ) + '%';

    // Set control width based on # of controls
    defaultStyles[ '~simple-slider__control' ].width = ( 40 + 15 * numSlides ) + 'px';

    animationStyles[ '@keyframes slide-animation' ] = createAnimationDefinition( numSlides, true, 'margin-left' );
    animationStyles[ '@keyframes control-animation' ] = createAnimationDefinition( numSlides, false, 'margin-left' );
    animationStyles[ '@keyframes text-animation' ] = createTextAnimation();
};

const setAnimationLength = function( numSlides ) {
    defaultStyles[ '~simple-slider__slides' ].animation = 'slide-animation ' + ( timePerSlide * numSlides )  + 's infinite';
    defaultStyles[ '~simple-slider__control--on' ].animation = 'control-animation ' + ( timePerSlide * numSlides )  + 's infinite';
    defaultStyles[ '~simple-slider__text' ].animation = 'text-animation ' + timePerSlide  + 's infinite';
};

const createAnimationDefinition = function( numSlides, isSlide, propertyName ) {
    let percentIncrement = 100 / numSlides,
        // This is a doozy. This percent of the total slide animation time that one slide animation is supposed to take.
        // So for example, if there are 4 slides where each is active for 7 seconds, then the total slide animation time
        // is 28 seconds. If we have a slide animation length of 1 second, then the animation should take (1/28) * 100 ~ 3.57%
        animationOffset = ( slideAnimationLength / ( timePerSlide * numSlides ) ) * 100,
        controlIncrement = 15,
        animationObj = { '0%': {} };

    animationObj[ '0%' ][ propertyName ] = '0';

    for( let i = 1; i < numSlides; i++ ) {
        let currentPercent = ( i * percentIncrement ),
            transitionPercent = ( currentPercent - animationOffset ) + '%';

        currentPercent += '%';

        animationObj[ transitionPercent ] = {};
        if( i === 1 ) {
            animationObj[ transitionPercent ][ propertyName ] = '0';
        } else {
            if( isSlide ) {
                animationObj[ transitionPercent ][ propertyName ] = '-' + ( 100 * ( i - 1 ) ) + '%';
            } else {
                animationObj[ transitionPercent ][ propertyName ] = ( controlIncrement * ( i - 1 ) ) + 'px';
            }
        }
        
        animationObj[ currentPercent ] = {};
        if( isSlide ) {
            animationObj[ currentPercent ][ propertyName ] = '-' + ( 100 * i ) + '%';
        } else {
            animationObj[ currentPercent ][ propertyName ] = ( controlIncrement * i ) + 'px';
        }
    }

    animationObj[ ( 100 - animationOffset ) + '%' ] = {};
    if( isSlide ) {
        animationObj[ ( 100 - animationOffset ) + '%' ][ propertyName ] = '-' + ( 100 * ( numSlides - 1 ) ) + '%';
    } else {
        animationObj[ ( 100 - animationOffset ) + '%' ][ propertyName ] = ( controlIncrement * ( numSlides - 1 ) ) + 'px';
    }

    animationObj[ '100%' ] = {};
    animationObj[ '100%' ][ propertyName ] = '0';

    return animationObj;
};

let createTextAnimation = function() {
        // Percentage of the entire slide's time that the text animates. So if the text animates in .7 seconds and
        // the time per slide is 7 seconds, then the text slide in animation must be complete at 10%
    let textAnimationPercent = ( textAnimationLength / timePerSlide ) * 100,
        // Percentage at which the text animation must end (where text is all the way off the screen) relative to the total slide time.
        textAnimationEndPercent = ( ( timePerSlide - textSlideAnimationDelay - slideAnimationLength ) / timePerSlide ) * 100,
        animationLeftValue = '-520px',
        textAnimation = {
            '0%, 100%': {}
        };

        textAnimation[ '0%, 100%' ].left = animationLeftValue;

        textAnimation[ ( textAnimationPercent + '%' ) ] = {};
        textAnimation[ ( textAnimationPercent + '%' ) ].left = '0';

        textAnimation[ ( ( textAnimationEndPercent - textAnimationPercent ) + '%' ) ] = {};
        textAnimation[ ( ( textAnimationEndPercent - textAnimationPercent ) + '%' ) ].left = '0';

        textAnimation[ ( textAnimationEndPercent + '%' ) ] = {};
        textAnimation[ ( textAnimationEndPercent + '%' ) ].left = animationLeftValue;

    return textAnimation;
};

// Event Bindings
document.querySelector( '.ss-gen__add-slide-control' ).addEventListener( 'click', function( ev ) {
    if( slideObjs.length < 10 ) {
        slideObjs.push( {
            'headerText': 'Some header text',
            'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
            'imgLink': 'https://cdn.pixabay.com/photo/2018/05/13/21/55/water-3398111_1280.jpg'
        } );

        generateSlider();
    } else {
        console.log( 'Can\'t add more than 10 slides' );
    }
} );

document.querySelector( '.ss-gen__generate-slideshow' ).addEventListener( 'click', function( ev ) {
    timePerSlide = +document.querySelector( '.ss-gen__time-per-slide' ).value;
    slideAnimationLength = +document.querySelector( '.ss-gen__animation-length--slide' ).value;
    textAnimationLength = +document.querySelector( '.ss-gen__animation-length--text' ).value;
    textSlideAnimationDelay = +document.querySelector( '.ss-gen__animation-delay' ).value;
    generateSlider();
} );

generateSlider();