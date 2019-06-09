$(document).ready( function() {
    $("li").click(function (event) {
        $("li.nav__item").removeClass("nav__item--active");
        $(this).addClass("nav__item--active");
        // event.preventDefault();
    });
});