$('#mygallery').justifiedGallery({
    lastRow: 'justify',
    //maxRowsCount:4,
    rowHeight: 213,
    margins: 10
}).magnificPopup({
    type: 'image',
    delegate: '.gallery-image',
    gallery:{
        enabled:true
    },
    zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
            // openerElement is the element on which popup was initialized, in this case its <a> tag
            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
            return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
    }
});
