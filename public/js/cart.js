
$(document).ready(function () {
    $(".btn-ck").on("click", function (e) {
        if ($('tbody tr').length === 0) {
            alert('Không có sản phẩm trong giỏ hàng')
            return;
        }
        location.href = '/member/checkout'
    });
});