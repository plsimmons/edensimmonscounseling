/*!
 * ScrollToSection
 * Version 1.0.0
 *
 * Requires:
 * - jQuery 1.12.x or higher
 *
 * https://github.com/Chandrashekhar09/scroll-to-section
 *
 * Copyright 2019, Chandrashekhar Vadde(chandrashekharvadde09@gmail.com)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function($, window, undefined){
    "use strict";
    var settings;
    window.scrollLock = false;
    var lastScrollTop = 0;
    function scrollToSection(event){
        var rootElem = event.target;
        clearTimeout( $.data( this, "scrollCheck" ) );
        $.data( this, "scrollCheck", setTimeout(function() {
            if(window.scrollLock)
                window.scrollLock = false;
            else{
                var rootTop = $(rootElem).offset().top;
                var rootHeight = $(rootElem).offset().top + $(rootElem).outerHeight();
                var scrollTop = $(rootElem).scrollTop();
                var elemFound = false;
                var scrollTo = undefined;
                $(settings.childList).each(function(key, val){
                    if(scrollTop > lastScrollTop){
                        if($(val).offset().top < rootHeight){
                            scrollTo = $(val).offset().top + scrollTop - rootTop;
                        }
                    }
                    else{
                        if(!elemFound){
                            if(scrollTo == undefined)
                                scrollTo = $(val).outerHeight();
                            else
                                scrollTo += $(val).outerHeight();
                            if(($(val).offset().top + $(val).outerHeight()) > rootTop){
                                scrollTo -= $(val).outerHeight();
                                elemFound = true;
                            }
                        }
                    }
                });
                if(scrollTo != undefined && scrollTo != lastScrollTop){
                    window.scrollLock = true;
                    $(rootElem).animate({
                            scrollTop: scrollTo
                        }, 1000);
                }
                lastScrollTop = scrollTo;
            }
        }, 250) );
    }
    
    $.fn.scrollToSection = function(options){
        settings = $.extend({
            childList: ".block-list"
        }, options);
        
        $(this).bind("scroll", scrollToSection);
    };
}(jQuery, window, undefined));