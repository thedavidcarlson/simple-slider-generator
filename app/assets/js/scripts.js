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
    // This is the amount of time (in seconds) the slide is on the screen, including the time it takes to animate to a new slide
    timePerSlide = 7,
    // This is the amount of time (in seconds) it takes to animate to a new slide
    slideAnimationLength = 1.5,
    // This is the amount of time (in seconds) it takes to animate the text in or out
    textAnimationLength = .7,
    // This is the delay (in seconds) between the text animation out and the slide animation 
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

/*
 * @function: Main function for generating slider
 */
const generateSlider = function() {
    let previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' ),
        styleStr = '';

    // Set all dynamic values that are based on variables that draw from the inputs
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

/*
 * @function: Function for setting all styles of slider that are dynamic
 */
const setDynamicStyleValues = function() {
    let numSlides = slideObjs.length;

    // Make sure animation style values are set
    setAnimationLength( numSlides );

    // Set slide widths based on # of slides
    defaultStyles[ '~simple-slider__slides' ].width = ( numSlides * 100 ) + '%';
    defaultStyles[ '~simple-slider__slide' ].width = ( 100 / numSlides ) + '%';

    // Set control width based on # of controls
    defaultStyles[ '~simple-slider__control' ].width = ( 40 + 15 * numSlides ) + 'px';

    // Generate and set all animation keyframe objects
    animationStyles[ '@keyframes slide-animation' ] = createAnimationDefinition( numSlides, true, 'margin-left' );
    animationStyles[ '@keyframes control-animation' ] = createAnimationDefinition( numSlides, false, 'margin-left' );
    animationStyles[ '@keyframes text-animation' ] = createTextAnimation();
};

/*
 * @function: Function for setting the values of the animation styles
 */
const setAnimationLength = function( numSlides ) {
    defaultStyles[ '~simple-slider__slides' ].animation = 'slide-animation ' + ( timePerSlide * numSlides )  + 's infinite';
    defaultStyles[ '~simple-slider__control--on' ].animation = 'control-animation ' + ( timePerSlide * numSlides )  + 's infinite';
    defaultStyles[ '~simple-slider__text' ].animation = 'text-animation ' + timePerSlide  + 's infinite';
};

/*
 * @function: Function for generating an individual animation definition used for the animation keyframe objects
 */
const createAnimationDefinition = function( numSlides, isSlide, propertyName ) {
        // divide the percent of time spent on each animation equally
    let percentIncrement = 100 / numSlides,
        // This is a doozy. This percent of the total slide animation time that one slide animation is supposed to take.
        // So for example, if there are 4 slides where each is active for 7 seconds, then the total slide animation time
        // is 28 seconds. If we have a slide animation length of 1 second, then the animation should take (1/28) * 100 ~ 3.57%
        animationOffset = ( slideAnimationLength / ( timePerSlide * numSlides ) ) * 100,
        // increment (in px) used to move the control around. Currently it is fixed
        controlIncrement = 15,
        animationObj = { '0%, 100%': {} };

    // Always start and end the animations at zero
    animationObj[ '0%, 100%' ][ propertyName ] = '0';

    // For each slide, generate an animation for the slide or control
    for( let i = 1; i < numSlides; i++ ) {
        let currentPercent = ( i * percentIncrement ),
            transitionPercent = ( currentPercent - animationOffset ) + '%';

        currentPercent += '%';

        // Initialize object for the percent that represents the start of the transition
        animationObj[ transitionPercent ] = {};
        
        if( i === 1 ) {
            // Make sure the first animation percent's initial value is zero
            animationObj[ transitionPercent ][ propertyName ] = '0';
        } else {
            if( isSlide ) {
                // For slide animation. Example value: "-200%"
                animationObj[ transitionPercent ][ propertyName ] = '-' + ( 100 * ( i - 1 ) ) + '%';
            } else {
                // For control animation. Example value: "-35px"
                animationObj[ transitionPercent ][ propertyName ] = ( controlIncrement * ( i - 1 ) ) + 'px';
            }
        }
        
        // Initialize object for the percent that represents the end of the transition
        animationObj[ currentPercent ] = {};

        if( isSlide ) {
            // For slide animation. Example value: "-300%"
            animationObj[ currentPercent ][ propertyName ] = '-' + ( 100 * i ) + '%';
        } else {
            // For control animation. Example value: "-45px"
            animationObj[ currentPercent ][ propertyName ] = ( controlIncrement * i ) + 'px';
        }
    }

    // Initialize one final transition object
    animationObj[ ( 100 - animationOffset ) + '%' ] = {};

    if( isSlide ) {
        animationObj[ ( 100 - animationOffset ) + '%' ][ propertyName ] = '-' + ( 100 * ( numSlides - 1 ) ) + '%';
    } else {
        animationObj[ ( 100 - animationOffset ) + '%' ][ propertyName ] = ( controlIncrement * ( numSlides - 1 ) ) + 'px';
    }

    return animationObj;
};

/*
 * @function: Function for generating an the text animation definition used for the text animation keyframe object
 */
const createTextAnimation = function() {
        // Percentage of the entire slide's time that the text animates. So if the text animates in .7 seconds and
        // the time per slide is 7 seconds, then the text slide in animation must be complete at 10%
    let textAnimationPercent = ( textAnimationLength / timePerSlide ) * 100,
        // Percentage at which the text animation must end (where text is all the way off the screen) relative to the total slide time.
        textAnimationEndPercent = ( ( timePerSlide - textSlideAnimationDelay - slideAnimationLength ) / timePerSlide ) * 100,
        // The left value for the text to animate off the screen. Currently a fixed value.
        animationLeftValue = '-520px',
        textAnimation = {
            '0%, 100%': {}
        };

        // This is to make sure the text starts and ends of the screen (since that is when the slide transitions)
        textAnimation[ '0%, 100%' ].left = animationLeftValue;

        // This is what causes the text to animate in
        textAnimation[ ( textAnimationPercent + '%' ) ] = {};
        textAnimation[ ( textAnimationPercent + '%' ) ].left = '0';

        // This is what causes the text to stay on the screen until we want the animation out to start
        textAnimation[ ( ( textAnimationEndPercent - textAnimationPercent ) + '%' ) ] = {};
        textAnimation[ ( ( textAnimationEndPercent - textAnimationPercent ) + '%' ) ].left = '0';

        // This will cause the text to animation out
        textAnimation[ ( textAnimationEndPercent + '%' ) ] = {};
        textAnimation[ ( textAnimationEndPercent + '%' ) ].left = animationLeftValue;

    return textAnimation;
};

/*
 * @function: Helper function for setting the dialog text and showing the dialog (by adding the show dialog class from the body)
 */
const warningDialog = function( dialogText ) {
    document.querySelector( '.ss-gen__warning-dialog-text' ).innerText = dialogText;

    document.body.classList.add( 'show-warning-dialog' );
};

/*
 * @function: Helper function for closing the dialog (by removing the show dialog class from the body)
 */
const closeWarningDialog = function() {
    document.body.classList.remove( 'show-warning-dialog' );
};

const setSlideContentToInputs = function( slideNum, buttonContainer ) {
    buttonContainer.setAttribute( 'data-selected-slide-index', slideNum );

    document.querySelector( '.ss-gen__slide-text--header' ).value = slideObjs[ slideNum ].headerText;
    document.querySelector( '.ss-gen__slide-text--body' ).value = slideObjs[ slideNum ].bodyText;
    document.querySelector( '.ss-gen__slide-image' ).value = slideObjs[ slideNum ].imgLink;   
};

// Event Bindings
/*
 * @function: Event binding for the add slide button
 */
document.querySelector( '.ss-gen__add-slide-control' ).addEventListener( 'click', function( ev ) {
    let numSlides = slideObjs.length;

    // Don't allow more than 10 slides for now
    if( numSlides < 10 ) {
        // Push generic slide object onto slide array. This is static for now
        slideObjs.push( {
            'headerText': 'Some header text',
            'bodyText': 'This is a short description of nothing. This text really has no purpose other than to occupy space. This space must be occupied to showcase the slider.',
            'imgLink': 'https://cdn.pixabay.com/photo/2018/05/13/21/55/water-3398111_1280.jpg'
        } );

        let slideButtons = document.querySelector( '.ss-gen__slide-buttons' ),
            newButton = document.querySelector( '.ss-gen__slide-button' ).cloneNode();

        newButton.setAttribute( 'data-slide-index', numSlides );
        newButton.innerText = 'Slide ' + ( numSlides + 1 );

        slideButtons.appendChild( newButton );

        setSlideContentToInputs( numSlides, slideButtons );

        // After slide is added, regenerate slider
        generateSlider();
    } else {
        // Warn the user that they can no longer add slides
        warningDialog( 'Can\'t add more than 10 slides' );
    }
} );

document.querySelector( '.ss-gen__slide-buttons' ).addEventListener( 'click', function( ev ) {
    let clickedEl = ev.target;

    if( clickedEl && clickedEl.classList.contains( 'ss-gen__slide-button' ) ) {
        let slideNum = clickedEl.getAttribute( 'data-slide-index' );

        setSlideContentToInputs( slideNum, ev.currentTarget );
    }
} );

document.querySelector( '.ss-gen__delete-slide-control' ).addEventListener( 'click', function( ev ) {
    let numSlides = slideObjs.length;
    if( numSlides > 2 ) {
        let currentSlideIndex = +document.querySelector( '.ss-gen__slide-buttons' ).getAttribute( 'data-selected-slide-index' );

        slideObjs.splice( currentSlideIndex, 1 );

        let slideButtons = document.querySelectorAll( '.ss-gen__slide-button' );

        slideButtons[ slideButtons.length - 1 ].outerHTML = '';

        if( numSlides - 1 === currentSlideIndex ) {
            slideButtons[ currentSlideIndex - 1 ].click();
        } else {
            document.querySelector( '.ss-gen__slide-text--header' ).value = slideObjs[ currentSlideIndex ].headerText;
            document.querySelector( '.ss-gen__slide-text--body' ).value = slideObjs[ currentSlideIndex ].bodyText;
            document.querySelector( '.ss-gen__slide-image' ).value = slideObjs[ currentSlideIndex ].imgLink;
        }

        generateSlider();
    } else {
        warningDialog( 'Must have at least 2 slides.' );
    }
} );

document.querySelector( '.ss-gen__set-content' ).addEventListener( 'click', function( ev ) {
    let headerText = document.querySelector( '.ss-gen__slide-text--header' ).value,
        bodyText = document.querySelector( '.ss-gen__slide-text--body' ).value,
        imgLink = document.querySelector( '.ss-gen__slide-image' ).value,
        selectedSlideIndex = document.querySelector( '.ss-gen__slide-buttons' ).getAttribute( 'data-selected-slide-index' );

    slideObjs[ selectedSlideIndex ].headerText = headerText;
    slideObjs[ selectedSlideIndex ].bodyText = bodyText;
    slideObjs[ selectedSlideIndex ].imgLink = imgLink;

    generateSlider();
        
} );

/*
 * @function: Event binding for the generate slideshow button
 */
document.querySelector( '.ss-gen__set-animation' ).addEventListener( 'click', function( ev ) {
    // Extract the values from the inputs
    let timePerSlideControl = document.querySelector( '.ss-gen__time-per-slide' ),
        slideAnimationLengthControl = document.querySelector( '.ss-gen__animation-length--slide' ),
        textAnimationLengthControl = document.querySelector( '.ss-gen__animation-length--text' ),
        animationDelayControl = document.querySelector( '.ss-gen__animation-delay' ),
        timePerSlideVal = +timePerSlideControl.value,
        slideAnimationLengthVal = +slideAnimationLengthControl.value,
        textAnimationLengthVal = +textAnimationLengthControl.value,
        animationDelayVal = +animationDelayControl.value;

    // Validate the inputs, if they are incorrect, show the dialog
    if( timePerSlideVal < ( slideAnimationLengthVal + 2 * textAnimationLengthVal + animationDelayVal ) ) {
        warningDialog( 'Time Per Slide cannot be less than slide animation + 2 x text animation + animation delay' );

        // @TODO: Move these to a special "reset" button in dialog
        // Reset Values
        timePerSlideControl.value = timePerSlide;
        slideAnimationLengthControl.value = slideAnimationLength;
        textAnimationLengthControl.value = textAnimationLength;
        animationDelayControl.value = textSlideAnimationDelay;
    // Else the inputs are correct so set the global variables and generate the slider
    } else {
        // Set global variables using input data
        timePerSlide = timePerSlideVal;
        slideAnimationLength = slideAnimationLengthVal;
        textAnimationLength = textAnimationLengthVal;
        textSlideAnimationDelay = animationDelayVal;

        // Generate slider
        generateSlider();
    }     
} );

// Bind dialog overlay and dialog close button to close dialog function
document.querySelector( '.ss-gen__warning-dialog-overlay' ).addEventListener( 'click', closeWarningDialog );
document.querySelector( '.ss-gen__warning-dialog-button' ).addEventListener( 'click', closeWarningDialog );

// Intialize the slider
generateSlider();