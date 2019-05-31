$(document).ready(function () {
    $(".btn-ck").on("click", function (e) {
        const address = $("input.addressdeli").val().trim()
        
        const baseUrl = "http://localhost:3000";
        if (address == "") {
            alert('Vui lòng điền địa chỉ giao hàng');
            return;
        }
        $.ajax({
            url: baseUrl + "/member/checkout#",
            type: "POST",
            data: {address: address},
            dataType: "json",
            success: function (res) {
                console.log('12312313');
                console.log('res.status_code: ', res)
                if (res && res.status_code == 200) {
                    console.log('hihihihohohohohoho');

                    if(!alert('Đặt hàng thành công!')) {
                        location.href = '/member/home';
                    }
                }

                if (res && res.status_code == 500) {
                    alert(res.message)
                }
            },
            error: function (err) {
                alert(err.message)
            }
        });
    });
});