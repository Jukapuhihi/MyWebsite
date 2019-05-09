$(document).ready(function () {
    $('#list').click(function (event) {
        event.preventDefault();
        $('#products .item').addClass('list-group-item');
        $(".item-heading").css("margin-top: 1.5rem", "margin-left: 1.5rem");
    });
    $('#grid').click(function (event) {
        event.preventDefault(); 
        $('#products .item').removeClass('list-group-item'); 
        $('#products .item').addClass('grid-group-item'); });
});