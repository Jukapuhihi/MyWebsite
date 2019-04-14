function user() {
    function bindEvent() {
        $(".edituser").click(function (e) {
            let params = {
                userID: $(".userID").val(),
                username: $(".username").val(),
                email: $(".email").val(),
                phone: $(".phone").val(),
                address: $(".address").val(),
                createDate: $(".createDate").val(),
                roleID: $(".roleID").val()
            };

            // const baseUrl = location.protocol + "//" + document.domain + ":" + location.port;
            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/admin/userMgt/edituser",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        location.reload();
                    }
                }
            });
        });

        $(".userDelete").on("click", function (e) {
            const self = this;
            $("#myModal").css("display", "block");

            $(".sureDelete").on("click", function (e) {

                const userID = $(self).attr("userID");

                const baseUrl = "http://localhost:3000";
                $.ajax({
                    url: baseUrl + "/admin/userMgt/delete",
                    type: "DELETE",
                    data: { userID: userID },
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
    new user();
});