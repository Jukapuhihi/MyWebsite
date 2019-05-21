function product() {
    function bindEvent() {
        $(".prodedit").click(function (e) {
            let params = {
                productID: $(".productID").val(),
                productName: $(".productName").val(),
                productBrand: $(".productBrand").val(),
                categoryName: $(".categoryName").val(),
                price: $(".price").val(),
                quantity: $(".quantity").val(),
                createDate: $(".createDate").val(),
                productDescribe: $(".productDescribe").val(),
                productImg: $(".productImg").val()
            };

            // const baseUrl = location.protocol + "//" + document.domain + ":" + location.port;
            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/manager/prodMgt/editprod",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        // location.reload();
                        res.render("/manager/prodMgt/listprod");
                    }
                }
            });
        });

        $(".productDelete").on("click", function (e) {
            const self = this;
            $("#myModal").css("display", "block");

            $(".sureDelete").on("click", function (e) {
                const productID = $(self).attr("productID");

                const baseUrl = "http://localhost:3000";
                $.ajax({
                    url: baseUrl + "/manager/prodMgt/delete",
                    type: "DELETE",
                    data: { productID: productID },
                    dataType: "json",
                    success: function (res) {
                        if (res && res.status_code == 200) {
                            location.reload();
                        }
                    }
                });
                $("#myModal").css("display", "none");
            });
            $(".cancelDelete").on("click", function () {
                $("#myModal").css("display", "none");
            });
        });
    }
    bindEvent();
}

$(document).ready(function () {
    new product();
});

$(document).on("keyup","#searchprod", function() {
    let data = $(this).val();
    console.log("Client nhập:" + data)
    const baseUrl = "http://localhost:3000";

    $.ajax({
        async: false,
        type: "POST",
        url: baseUrl + "/manager/prodMgt/listprod/searchprod",
        data: data,
        cache: false,
        success: function(res){
           console.log("Server trả về:" + res);
        }
    });
});