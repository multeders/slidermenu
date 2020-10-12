(function ($) {
    var SliderMenu = function (elem, options) {
        var that = this,
                th = $(elem),
                childDiv = $(elem).children().first(),
                clicked = false,
                clickedPozition = 0,
                childDivPozition = 0,
                offset = parseInt(childDiv.offset().left);
        that.setStyles(th, childDiv, options);
        th.on({
            'mousemove': function (e) {
                clicked && that.updateScrollPos(e, th, childDiv, clickedPozition, childDivPozition, offset);
            },
            'mousedown': function (e) {
                clicked = true;
                clickedPozition = e.pageX;
            },
            'mouseup': function () {
                clicked = false;
                th.css('cursor', 'auto');
                childDivPozition = parseInt(childDiv.css('left'));
            }
        });
    }

    SliderMenu.prototype = {

        constructor: SliderMenu,
        
        updateScrollPos: function (e, th, childDiv, clickedPozition, childDivPozition, offset) {
            let realPos = e.pageX - clickedPozition + childDivPozition;
            let maxScrollLeft = $(childDiv).get(0).scrollWidth - $(childDiv).get(0).clientWidth;
            if (realPos < 0 && realPos > -1 * (maxScrollLeft + 30)) {
                childDiv.css({left: realPos + 'px'})
            }

        },
        setStyles: function (th, childDiv, options) {
            th.css({
                'width': options['width'],
                'overflow': 'hidden',
                'white-space': 'nowrap',
                'cursor': 'pointer',
                'margin': options['margin'],
            });
            childDiv.css({
                'position': 'relative',
                'width': '100%'
            })

        },
    }
    $.fn.sliderMenu = function (opts) {
        return $(this).each(function () {
            var $this = $(this),
                    data = $(this).data('slidermenu'),
                    options = $.extend({}, $.fn.sliderMenu.defaults, $this.data(), typeof opts == 'object' && opts);
            if (!data) {
                $this.data('slidermenu', (data = new SliderMenu(this, options)));
            }
            if (typeof opts == 'string')
                data[opts]();
        });
    }

    $.fn.sliderMenu.defaults = {
        width: '95%',
        margin: 'auto'
    }

    $.fn.sliderMenu.Constructor = SliderMenu;
})(jQuery);