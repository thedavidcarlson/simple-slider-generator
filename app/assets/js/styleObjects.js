var defaultStyles = [
{
    name: '.simple-slider',
    styles: {
        width: '100%',
        height: '500px',
        position: 'relative',
        overflow: 'hidden'
    }
},
{
    name: '.simple-slider__slides',
    styles: {
        width: '400%',
        height: '100%',
        position: 'relative',
        '-webkit-animation': 'slide-animation 30s infinite',
        '-moz-animation': 'slide-animation 30s infinite',
        animation: 'slide-animation 30s infinite'
    }
},
{
    name: '.simple-slider__slide',
    styles: {
        width: '25%',
        height: '100%',
        float: 'left',
        position: 'relative',
        'z-index': '1',
        overflow: 'hidden'
    }
},
{
    name: '.simple-slider__image',
    styles: {
        width: '100%',
        height: '100%'
    }
},
{
    name: '.simple-slider__image img',
    styles: {
        width: '100%',
        height: '100%'
    }
},
{
    name: '.simple-slider__text-bg-triangle',
    styles: {
        border: '500px solid transparent',
        'border-left': '800px solid rgba(50, 50, 50, .7)',
        'border-bottom': '0',
        position: 'absolute',
        bottom: '0'
    }
},
{
    name: '.simple-slider__content',
    styles: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        overflow: 'hidden'
    }
},
{
    name: '.simple-slider__text',
    styles: {
        width: '500px',
        height: '150px',
        float: 'left',
        position: 'relative',
        top: '300px',
        'padding-left': '30px',
        'box-sizing': 'border-box',
        'font-family': 'Tahoma, Geneva, sans-serif',
        color: '#fff',
        '-webkit-animation': 'text-animation 7.5s infinite',
        '-moz-animation': 'text-animation 7.5s infinite',
        animation: 'text-animation 7.5s infinite'
    }
},
{
    name: '.simple-slider__text h1',
    styles: {
        'text-transform': 'uppercase',
        'font-size': '28px',
        color: '#fff',
        'padding-bottom': '10px'
    }
},
{
    name: '.simple-slider__text p',
    styles: {
        'font-weight': 'normal',
        'font-size': '16px',
        'font-style': 'italic'
    }
},
{
    name: '.simple-slider__control',
    styles: {
        width: '120px',
        height: '10px',
        position: 'absolute',
        bottom: '50px',
        'z-index': '99',
        left: '30px'
    }
},
    {
    name: '.simple-slider__control > ul',
    styles: {
        'list-style': 'none'
    }
},
{
    name: '.simple-slider__control > ul > li',
    styles: {
        width: '10px',
        height: '10px',
        'border-radius': '50%',
        background: '#111',
        float: 'left',
        'margin-right': '5px',
        cursor: 'pointer'
    }
},
{
    name: '.simple-slider__control ul',
    styles: {
        overflow: 'hidden'
    }
},
{
    name: '.simple-slider__control--on',
    styles: {
        width: '100%',
        height: '100%',
        'border-radius': '50%',
        background: '#fff',
        position: 'relative',
        '-webkit-animation': 'control-animation 30s infinite',
        '-moz-animation': 'control-animation 30s infinite',
        animation: 'control-animation 30s infinite'
    }
}
];

// @TODO: Swap style generation to be done via object
// var defaultStyles = {
//     '~simple-slider': {
//         width: '100%',
//         height: '500px',
//         position: 'relative',
//         overflow: 'hidden'
//     },
//     '~simple-slider__slides': {
//         width: '400%',
//         height: '100%',
//         position: 'relative',
//         '-webkit-animation': 'slide-animation 30s infinite',
//         '-moz-animation': 'slide-animation 30s infinite',
//         animation: 'slide-animation 30s infinite'
//     },
//     '~simple-slider__slide': {
//         width: '25%',
//         height: '100%',
//         float: 'left',
//         position: 'relative',
//         'z-index': '1',
//         overflow: 'hidden'
//     },
//     '~simple-slider__image': {
//         width: '100%',
//         height: '100%'
//     },
//     '~simple-slider__image img': {
//         width: '100%',
//         height: '100%'
//     },
//     '~simple-slider__text-bg-triangle': {
//         border: '500px solid transparent',
//         'border-left': '800px solid rgba(50, 50, 50, .7)',
//         'border-bottom': '0',
//         position: 'absolute',
//         bottom: '0'
//     },
//     '~simple-slider__content': {
//         width: '100%',
//         height: '100%',
//         position: 'absolute',
//         overflow: 'hidden'
//     },
//     '~simple-slider__text': {
//         width: '500px',
//         height: '150px',
//         float: 'left',
//         position: 'relative',
//         top: '300px',
//         'padding-left': '30px',
//         'box-sizing': 'border-box',
//         'font-family': 'Tahoma, Geneva, sans-serif',
//         color: '#fff',
//         '-webkit-animation': 'text-animation 7.5s infinite',
//         '-moz-animation': 'text-animation 7.5s infinite',
//         animation: 'text-animation 7.5s infinite'
//     },
//     '~simple-slider__text h1': {
//         'text-transform': 'uppercase',
//         'font-size': '28px',
//         color: '#fff',
//         'padding-bottom': '10px'
//     },
//     '~simple-slider__text p': {
//         'font-weight': 'normal',
//         'font-size': '16px',
//         'font-style': 'italic'
//     },
//     '~simple-slider__control': {
//         width: '120px',
//         height: '10px',
//         position: 'absolute',
//         bottom: '50px',
//         'z-index': '99',
//         left: '30px'
//     },
//     '~simple-slider__control > ul': {
//         'list-style': 'none'
//     },
//     '~simple-slider__control > ul > li': {
//         width: '10px',
//         height: '10px',
//         'border-radius': '50%',
//         background: '#111',
//         float: 'left',
//         'margin-right': '5px',
//         cursor: 'pointer'
//     },
//     '~simple-slider__control ul': {
//         overflow: 'hidden'
//     },
//     '~simple-slider__control--on': {
//         width: '100%',
//         height: '100%',
//         'border-radius': '50%',
//         background: '#fff',
//         position: 'relative',
//         '-webkit-animation': 'control-animation 30s infinite',
//         '-moz-animation': 'control-animation 30s infinite',
//         animation: 'control-animation 30s infinite'
//     }
// };

var animationStyles = [{
    name: '@keyframes load',
    styles: {
        'from': {
            left: '-100%'
        },
        'to': {
            left: '0'
        }
    }
},
{
    name: '@-webkit-keyframes slide-animation',
    styles: {
        '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '-100%'
        },
        '46%': {
            'margin-left': '-100%'
        },
        '50%': {
            'margin-left': '-200%'
        },
        '71%': {
            'margin-left': '-200%'
        },
        '75%': {
            'margin-left': '-300%'
        },
        '96%': {
            'margin-left': '-300%'
        },
        '100%': {
            'margin-left': '0'
        }
    }
},
{
    name: '@-moz-keyframes slide-animation',
    styles: {
        '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '-100%'
        },
        '46%': {
            'margin-left': '-100%'
        },
        '50%': {
            'margin-left': '-200%'
        },
        '71%': {
            'margin-left': '-200%'
        },
        '75%': {
            'margin-left': '-300%'
        },
        '96%': {
            'margin-left': '-300%'
        },
        '100%': {
            'margin-left': '0'
        }
    }
},
{
    name: '@keyframes slide-animation',
    styles: {
        '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '-100%'
        },
        '46%': {
            'margin-left': '-100%'
        },
        '50%': {
            'margin-left': '-200%'
        },
        '71%': {
            'margin-left': '-200%'
        },
        '75%': {
            'margin-left': '-300%'
        },
        '96%': {
            'margin-left': '-300%'
        },
        '100%': {
            'margin-left': '0'
        }
    }
},
{
    name: '@-webkit-keyframes text-animation',
    styles: {
        '0%': {
            left: '-520px'
        },
        '10%': {
            left: '0'
        },
        '30%': {
            left: '0'
        },
        '40%': {
            left: '0'
        },
        '50%': {
            left: '0'
        },
        '60%': {
            left: '0'
        },
        '70%': {
            left: '0'
        },
        '80%': {
            left: '-520px'
        },
        '90%': {
            left: '-520px'
        },
        '100%': {
            left: '-520px'
        }
    }
},
{
    name: '@-moz-keyframes text-animation',
    styles: {
        '0%': {
            left: '-520px'
        },
        '10%': {
            left: '0'
        },
        '30%': {
            left: '0'
        },
        '40%': {
            left: '0'
        },
        '50%': {
            left: '0'
        },
        '60%': {
            left: '0'
        },
        '70%': {
            left: '0'
        },
        '80%': {
            left: '-520px'
        },
        '90%': {
            left: '-520px'
        },
        '100%': {
            left: '-520px'
        }
    }
},
{
    name: '@keyframes text-animation',
    styles: {
        '0%': {
            left: '-520px'
        },
        '10%': {
            left: '0'
        },
        '15%': {
            left: '0'
        },
        '30%': {
            left: '0'
        },
        '40%': {
            left: '0'
        },
        '50%': {
            left: '0'
        },
        '60%': {
            left: '0'
        },
        '70%': {
            left: '0'
        },
        '80%': {
            left: '-520px'
        },
        '90%': {
            left: '-520px'
        },
        '100%': {
            left: '-520px'
        }
    }
},
{
    name: '@-webkit-keyframes control-animation',
    styles: {
       '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '15px'
        },
        '46%': {
            'margin-left': '15px'
        },
        '50%': {
            'margin-left': '30px'
        },
        '71%': {
            'margin-left': '30px'
        },
        '75%': {
            'margin-left': '45px'
        },
        '96%': {
            'margin-left': '45px'
        },
        '100%': {
            'margin-left': '0'
        }
    }
},
{
    name: '@-moz-keyframes control-animation',
    styles: {
        '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '15px'
        },
        '46%': {
            'margin-left': '15px'
        },
        '50%': {
            'margin-left': '30px'
        },
        '71%': {
            'margin-left': '30px'
        },
        '75%': {
            'margin-left': '45px'
        },
        '96%': {
            'margin-left': '45px'
        },
        '100%': {
            'margin-left': '0'
        }
    }
},
{
    name: '@keyframes control-animation',
    styles: {
        '0%': {
            'margin-left': '0'
        },
        '21%': {
            'margin-left': '0'
        },
        '25%': {
            'margin-left': '15px'
        },
        '46%': {
            'margin-left': '15px'
        },
        '50%': {
            'margin-left': '30px'
        },
        '71%': {
            'margin-left': '30px'
        },
        '75%': {
            'margin-left': '45px'
        },
        '96%': {
            'margin-left': '45px'
        },
        '100%': {
            'margin-left': '0'
        }
    }
}];