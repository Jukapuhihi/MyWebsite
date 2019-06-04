function order() {
    function bindEvent() {
        $(".orderdestroy").click(function (e) {
            let params = {
                orderID: $(".orderID").val(),
                userID: $(".userID").val(),
                listprod: $(".listprod").val(),
                createDate: $(".createDate").val(),
                state: $(".state").val()
            };

            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/member/userdetailorder",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        // location.reload();
                        if(!alert('Đã hủy đơn hàng thành công!')) {
                            location.href = "/member/userlistorder";
                        }
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