/* =================================
------------------------------------
	Namaste - Yoga HTML Template
	Version: 1.0
 ------------------------------------
 ====================================*/
 'use strict';

 $(window).on('load', function() {
     /*------------------
           Preloader
     --------------------*/
     // $(".loader").fadeOut();
     // $("#preloder").delay(400).fadeOut("slow");
     particlesJS.load('particles-js', '/js/particles.json', function() {
       console.log('callback - particles.js config loaded');
     });
 });
 
 (function($) {
     /*------------------
         Navigation
     --------------------*/
     $('.main-menu').slicknav({
         appendTo:'.header-section',
         label: '',
         closedSymbol: '<i class="flaticon-right-arrow"></i>',
         openedSymbol: '<i class="flaticon-down-arrow"></i>'
     });
 
 
     /*------------------
         Background Set
     --------------------*/
     $('.set-bg').each(function() {
         var bg = $(this).data('setbg');
         $(this).css('background-image', 'url(' + bg + ')');
     });
 
 
     /*------------------
         Circle progress
     --------------------*/
     $('.circle-progress').each(function() {
         var cpvalue = $(this).data("cpvalue");
         var cpcolor = $(this).data("cpcolor");
         var cptitle = $(this).data("cptitle");
         var cpid 	= $(this).data("cpid");
 
         $(this).append('<div class="'+ cpid +'"></div><div class="progress-info"><h2>'+ cpvalue +'%</h2><p>'+ cptitle +'</p></div>');
 
         if (cpvalue < 100) {
 
             $('.' + cpid).circleProgress({
                 value: '0.' + cpvalue,
                 size: 214,
                 thickness: 10,
                 fill: cpcolor,
                 emptyFill: "rgba(0, 0, 0, 0)"
             });
         } else {
             $('.' + cpid).circleProgress({
                 value: 1,
                 size: 214,
                 thickness: 10,
                 fill: cpcolor,
                 emptyFill: "rgba(0, 0, 0, 0)"
             });
         }
     });
 
 })(jQuery);
 