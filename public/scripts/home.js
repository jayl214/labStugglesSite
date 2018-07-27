$(window).on('load', function() {
    // When the page has loaded
  $("main").fadeIn(500);
  $(".home-comic").on("mouseenter", ()=>{
    $(".home-comic").find("img").attr('src','docs/images/buttoncloud1hover.png')
  })
  $(".home-comic").on("mouseleave", ()=>{
    $(".home-comic").find("img").attr('src','docs/images/buttoncloud1.png')
  })


  $(".home-foster").on("mouseenter", ()=>{
    $(".home-foster").find("img").attr('src','docs/images/buttoncloud2hover.png')
  })
  $(".home-foster").on("mouseleave", ()=>{
    $(".home-foster").find("img").attr('src','docs/images/buttoncloud2.png')
  })

});
