
$(document).ready(function() {
      $("#niiuAppmenu").mmenu();
   });

jQuery('#news-demo').slippry({
  // general elements & wrapper
  slippryWrapper: '<div class="sy-box news-slider" />', // wrapper to wrap everything, including pager
  elements: 'article', // elments cointaining slide content

  // options
  adaptiveHeight: false, // height of the sliders adapts to current 
  captions: false,
  controls: false,

  // pager
  pagerClass: 'news-pager',

  // transitions
  transition: 'fade', // fade, horizontal, kenburns, false
  speed: 1200,
  pause: 8000,

  // slideshow
  autoDirection: 'next'
});
