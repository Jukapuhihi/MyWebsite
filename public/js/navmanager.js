$(document).ready(function () {
    $("li").click(function (event) {
        $("li.nav__item").removeClass("nav__item--active");
        $(this).addClass("nav__item--active");
        event.preventDefault();
        // let tab = $("li.nav__item--active").children().attr("href");
        // (res) => res.redirect(tab);
        let tab = $("a[href~='']");
        tab.click((res)=>{
            res.redirect(tab);
        });
    });
});