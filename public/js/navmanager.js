$(document).ready(function () {
    $(".active").css("color","#408ab4");
    $(".active").css("background-color","white");
    $("a").click(function (event) {
        // loại đi thằng đang nắm active class
        $(".nav__item").removeClass("active"); // ko còn thằng nav__item nào nắm activee

        // thêm class active cho thằng mình mới click
        // thằng hiện tại đang chọn là thằng a, nhưng mình muốn thêm active cho thằng cha (nav__item)
        $(this).parent().addClass("active");
        $(".active").css("color","#408ab4");
        $(".active").css("background-color","white");
    });
});