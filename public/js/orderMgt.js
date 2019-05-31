function order() {
    function bindEvent() {
        $(".orderedit").click(function (e) {
            let params = {
                orderID: $(".orderID").val(),
                userID: $(".userID").val(),
                listprod: $(".listprod").val(),
                createDate: $(".createDate").val(),
                state: $(".state").val()
            };

            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/manager/orderMgt/editorder",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        // location.reload();
                        location.href = "/manager/orderMgt/listorder";
                    }
                }
            });
        });
    }
    bindEvent();
}

$(document).ready(function () {
    new order();
});