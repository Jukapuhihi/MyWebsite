$(document).ready(function () {
    $(".cartDelete").on("click", function (e) {
        const productId = $(this).attr("productId");
        console.log(productId)
        const baseUrl = "http://localhost:3000";
        $.ajax({
            url: baseUrl + "/guest/cart/delete",
            type: "DELETE",
            data: {productId: productId},
            dataType: "json",
            success: function (res) {
                if (res && res.status_code == 200) {
                    location.reload();
                }
            }
        });
    });
});