/*
 * jQuery plugin that allows you to have a 
 * responsive full background image inside any relative container
 *
 * Created by: Marko Francekovic
 * 
 * v 0.9.1
 */

(function($) {
	
	var methods = {
    
		// sets the initial css attributes
		setInitialSettings: function(image, mode) {
                    
                    var attributes = {};
                    
                    switch(mode) {
                        case 'wrapper': attributes = {'position': 'absolute', 'z-index': '0', 'max-width': 'none', 'max-height': 'none'}; break
                        default: attributes = {'position': 'fixed', 'z-index': '0', 'max-width': 'none', 'max-height': 'none'}
                    }
                    image.css(attributes);
		},
                
                // set the position of the image
                setPosition: function(image, positionStyle, mode) {
                    
                    switch(positionStyle) {
                        case 'bottom-left': image.css({'bottom': 0, 'left': 0}); break;
                        case 'bottom-right': image.css({'bottom': 0, 'right': 0}); break;
                        case 'top-right': image.css({'top': 0, 'right': 0}); break;
                        case 'top-left': image.css({'top': 0, 'left': 0}); break;
                        case 'center': methods.centerPosition(image, mode); break;
                        default: image.css({'left': 0, 'top': 0});
                    }
                    
                },
                
                centerPosition: function(image, mode) {
            
                    var viewport;
                    
                    switch(mode) {
                        case 'wrapper': viewport = image.parent(); break
                        default: viewport = $(window);
                    }
                 
                    var imageAspectRatio = methods.calculateAspectRatio(image);
                    var viewportAspectRatio = methods.calculateAspectRatio(viewport);
                    
                    if(imageAspectRatio >= viewportAspectRatio) {
                        // center horizontally
                        var offsetLeft = (viewport.outerWidth() - image.outerWidth()) / 2;
                        image.css('left', offsetLeft+'px');
                        image.css('top', '0');
                    } else {
                        // center vertically
                        var offsetTop = (viewport.outerHeight() - image.outerHeight()) / 2;
                        image.css('top', offsetTop+'px');
                        image.css('left', '0');
                    }
                    
                },
                
                // returns the aspect ratio of the element - width/height
                calculateAspectRatio: function(elem) {
                    return elem.outerWidth()/elem.outerHeight();
                },
                
                setByHeight: function(image) {
                    image.css({
                       'height': '100%',
                       'width': 'auto'
                    });
                },
                
                setByWidth: function(image) {
                    image.css({
                       'width': '100%',
                       'height': 'auto'
                    });
                },
                
                resizeImage: function(image, position, mode) {
                                        
                    var viewport;
                    
                    switch(mode) {
                        case 'wrapper': viewport = image.parent(); break
                        default: viewport = $(window);
                    }
                 
                    var imageAspectRatio = methods.calculateAspectRatio(image);
                    var viewportAspectRatio = methods.calculateAspectRatio(viewport);
                    
                    if(imageAspectRatio >= viewportAspectRatio) {
                        methods.setByHeight(image);
                    } else {
                        methods.setByWidth(image);
                    }
                    
                    // set the position
                    methods.setPosition(image, position, mode);
                    
                },
                
                resetOnResize: function(image, position, mode) {

                    $(window).resize(function() { 
                       
                            methods.resizeImage(image, position, mode);
								
                    });
                    
                }
                
    };

    $.fn.astralBackground = function (options) {
         
        var settings = $.extend( {
            position: "top-left",
            mode: "view"
        }, options);
        
        var elements = this;
        
        elements.load(function() {
            
            elements.each(function() {
            
                var element = $(this);

                // set the initial settings
                methods.setInitialSettings(element, settings.mode);

                // init resize image
                methods.resizeImage(element, settings.position, settings.mode);

                // attach the resize event
                methods.resetOnResize(element, settings.position, settings.mode);
            
            });

                
        });
        
        return elements;
     
    };
    	
})(jQuery);



  
   
   
   
