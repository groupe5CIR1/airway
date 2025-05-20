/*--------------- https://webdeasy.de/en/css-loading-animations/ ------------------*/

$(document).ready(function() {
    // Fonction pour centrer l'image du loader
    function centerLoaderImage() {
        const windowHeight = $(window).height();
        const windowWidth = $(window).width();
        const imgHeight = $('.loading img').height();
        const imgWidth = $('.loading img').width();
        
        $('.loading img').css({
            'margin-top': (windowHeight - imgHeight) / 2,
            'margin-left': (windowWidth - imgWidth) / 2
        });
    }
    
    // Initialisation
    centerLoaderImage();
    
    // Recentrage lors du redimensionnement
    $(window).resize(centerLoaderImage);
    
    // Animation de la souris personnalisée
    $(document).mousemove(function(e) {
        $(".original").css({
            left: e.pageX - 12,
            top: e.pageY - 12
        });
    });
    
    // Effet de clic
    $("body").on("click", function(e) {
        $(".original").clone(true)
            .appendTo("body")
            .css({
                left: e.pageX - 12,
                top: e.pageY - 12
            })
            .removeClass("original")
            .fadeOut(500, function() {
                $(this).remove();
            });
    });
    
    $(window).on('load', function() {
        // Cache le loader avec une animation de fondu
        $('.loading').fadeOut(2000, function() {
            // Affiche le contenu principal
            $('#main-content').fadeIn(1000);
            
            // Rétablit le curseur par défaut
            $('*').css('cursor', 'auto');
            
            // Supprime le curseur personnalisé
            $('.mouse').remove();
            
            // Désactive les écouteurs d'événements du curseur personnalisé
            $(document).off('mousemove');
            $('body').off('click');

            //Supprime le loader et réactive la possibilité de scroll
            $('.loader').remove();
            $('body').css('overflow', 'auto');

            //Ajoute image en background
            $('body').css('background-image','url("../images/Mont\ Blanc\ .jpg")');
            $('body').css('background-size','cover');
        });
    });
});

// Fallback après 5 secondes au cas où
setTimeout(function() {
    if ($('.loading').is(':visible')) {
        $('.loading').fadeOut(500, function() {
            $('#main-content').fadeIn(1000);
            $('*').css('cursor', 'auto');
            $('.mouse').remove();
            $(document).off('mousemove');
            $('body').off('click');
            $('.loader').remove();
            $('body').css('overflow', 'auto');
            $('body').css('background-image','url("../images/Mont\ Blanc\ .jpg")');
            $('body').css('background-size','cover');
        });
    }
}, 5000);
