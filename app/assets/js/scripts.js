// Global vars
let previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' ),
    styleStr = '';

// Style Object Converter
let convertStyleObj = function( styleObj, keyframeStyles ) {
    let styleStr = '',
        styleClassName = styleObj.name;

        styleStr += styleClassName;

        styleStr += '{';

        let tempStyles = styleObj.styles;

        for( let styleKey in tempStyles ) {
            if( keyframeStyles ) {
                let animationProp = tempStyles[ styleKey ];

                styleStr += styleKey + '{';

                for( let animationKey in animationProp ) {
                    styleStr += animationKey + ':' + animationProp[ animationKey ] + ';';
                }

                styleStr += '}';
            } else {
                styleStr += styleKey + ':' + tempStyles[ styleKey ] + ';';
            }
        }

        styleStr += '}';

        return styleStr;
};

let addSlides = function( slideArr ) {
    let slideMarkup = '<div class="simple-slider__slide"><div class="simple-slider__text-bg-triangle"></div><div class="simple-slider__content"><div class="simple-slider__text"><h1></h1><p></p></div></div><div class="simple-slider__image"><img/></div></div>',
        docFrag = document.createDocumentFragment();

    slideArr.forEach( function( slideObj ) {
        let tempTemplate = document.createElement( 'template' );

        tempTemplate.innerHTML = slideMarkup;

        tempTemplate.content.querySelector( 'h1' ).innerText = slideObj.headerText;
        tempTemplate.content.querySelector( 'p' ).innerText = slideObj.bodyText;

        tempTemplate.content.querySelector( 'img' ).setAttribute( 'src', slideObj.imgLink );

        docFrag.appendChild( tempTemplate.content.firstChild );
    } );

    document.querySelector( '.simple-slider__slides' ).appendChild( docFrag );

    addControls( slideArr.length );

};

let addControls = function( controlCount ) {
    let controlWrapper = document.createElement( 'ul' );

    for( let i = 0; i < controlCount; i++ ) {
        let control = document.createElement( 'li' );

        if( i === 0 ) {
            let controlOn = document.createElement( 'div' );
            controlOn.className = 'simple-slider__control--on';
            control.appendChild( controlOn );
        }

        controlWrapper.appendChild( control );
    }

    document.querySelector( '.simple-slider__control' ).appendChild( controlWrapper );
};

defaultStyles.forEach( function( el ) {
    styleStr += convertStyleObj( el );
} );

animationStyles.forEach( function( el ) {
    styleStr += convertStyleObj( el, true /*Keyframe Styles*/ );
} );

// Set preview styles
document.querySelector( '.ss-gen__preview-styles' ).innerHTML = styleStr;

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

addSlides( slideObjs );

previewTextarea.innerText = '<style type="text/css">' 
                            + styleStr 
                            + '</style>' 
                            + document.querySelector( '.ss-gen__preview-slider' ).innerHTML.trim();

