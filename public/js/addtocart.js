$(document).ready(function () {
    
    $('.addtocart').on('click', function () {
        // location.reload();
        let prodID = $(this).attr("productID");
        let pName = $('#prod' + prodID).children('#productName').text();
        let price = $('#prod' + prodID).children('#prodPrice').text();
        let imgUrl = $('.content__img').children('img').attr('src');
        const obj = {
            id: prodID,
            prodName: pName,
            imageUrl: imgUrl,
            price: price
        };
        const baseUrl = "http://localhost:3000";
        console.log('aaaaaaaaaaaaaaaa');
        $.ajax({
            url: baseUrl + "/guess/addtocart",
            type: "POST",
            data: obj,
            dataType: "json",
            success: function (res) {
                // location.reload();
                console.log('heloooooo');
                $('#btn-cart::after').css("content","2");

            }
        });
    });
});