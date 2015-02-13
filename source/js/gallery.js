(function($){
  // Caption
  $('.entry-content').each(function(i){
    $(this).find('img').each(function(){
      var alt = this.alt;

      if (alt){
        $(this).after('<span class="caption">' + alt + '</span>');
      }

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox" rel="gallery' + i + '" />');
    });
  });

  // Gallery
  var play = function(parent, item, callback){
    var width = parent.width();

    item.imagesLoaded(function(){
      var _this = this[0],
        nWidth = _this.naturalWidth,
        nHeight = _this.naturalHeight;

      callback();
      this.removeClass('hidden');
      parent.animate({height: width * nHeight / nWidth}, 500);
    });
  };

  var
    galleries = $('.gallery'),
    autoplayInterval
  ;

  var setAutoPlay = function setAutoPlay(){
    if(galleries.size() < 2){
      autoplayInterval = window.setInterval(
        function(){
          console.log('Ticked');
          if(!loading){console.log('Clicked');$next.click();}},
        3000
      );
    }
  }


  galleries.each(function(){
    var $this = $(this),
      current = 0,
      photoset = $this.children('.photoset').children().addClass('hidden'),
      all = photoset.length,
      loading = true,
      $prev = $this.find('.prev'),
      $next = $this.find('.next')
    ;

    photoset.first().removeClass('hidden');

    play($this, photoset.eq(0), function(){
      loading = false;
    });

    $prev.on('click', function(){
      if (!loading){
        var next = (current - 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).addClass('hidden');
          loading = false;
          current = next;
        });
      }
    });
    $next.on('click', function(){
      if (!loading){
        var next = (current + 1) % all;
        loading = true;

        play($this, photoset.eq(next), function(){
          photoset.eq(current).addClass('hidden');
          loading = false;
          current = next;
        });
      }
    });
  });



})(jQuery);
