$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        margin: 50,
        loop: true,
        stagePadding: 50,
        nav: true,
        dotsEach: true,
        autoplay: true,
        stageOuterClass: "owl-stage-outer abc",
        navClass: ["prev", "next"],
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        dotClass: "dot",
        dotsClass: "dots",
        slideSpeed: 300
    });
});

$(document).ready(function () {
    $(".nav__toggler").click(function () {
        $(".nav").toggleClass("nav--active");
    });
    const wd = $(window);
    $(".dropdown").click(function () {
        if (wd.width() < 768) {
            $(".dropdown").toggleClass("dropdown--open");
            $(".dropdown__list").slideToggle(200);
        }
    });
    wd.on("scroll", function () {
        onWindowScroll();
    });
    $(".go-to-top").click(function () {
        $("body, html").animate({
            scrollTop: 0
        }, 1000);
    })

    function onWindowScroll() {
        if (wd.scrollTop() <= 60) {
            $(".header__pagename").css("color", "white");
            $("#btn-cart i").css("color", "white");
            var width = wd.width();
            if (width <= 767) {
                $(".header__pagename").css("color", "var(--primary)");
                $("#btn-cart i").css("color", "var(--primary)");
            }
        }
        if (wd.scrollTop() > 60) {
            $(".nav").removeClass("nav--transparent");
            $(".header__pagename").css("color", "var(--primary)");
            $("#btn-cart i").css("color", "var(--primary)");
        }
        else {
            $(".nav").addClass("nav--transparent");
        }

        if (wd.scrollTop() > wd.height()) {
            $(".go-to-top").fadeIn(200);
        }
        else {
            $(".go-to-top").fadeOut(200);
        }
    }
    onWindowScroll();

});