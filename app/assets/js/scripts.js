// Style Object Converter
var converStyleObj = function( styleObj ) {
    var styleStr = '',
        styleClassName = styleObj.name;

        styleStr += '.' + styleClassName;

        styleStr += '{';

        let tempStyles = styleObj.styles;

        for( let styleProp in tempStyles ) {
            styleStr += styleProp + ':' + tempStyles[ styleProp ] + ';';
        }

        styleStr += '}';

        return styleStr;
};

var testStyles = {
    name: 'simple-slider',
    styles: {
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden'
    } 
};

var previewTextarea = document.querySelector( '.ss-gen__preview-code textarea' );
debugger;
previewTextarea.innerText = converStyleObj(testStyles);