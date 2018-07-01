// Style Object Converter
var convertStyleObj = function( styleObj, keyframeStyles ) {
    var styleStr = '',
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

var previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' ),
    styleStr = '';

defaultStyles.forEach( function( el ) {
    styleStr += convertStyleObj( el );
} );

animationStyles.forEach( function( el ) {
    styleStr += convertStyleObj( el, true /*Keyframe Styles*/ );
} );

previewTextarea.innerText = styleStr;