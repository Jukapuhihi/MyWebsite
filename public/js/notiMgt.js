function noti() {
    function bindEvent() {
        $(".notiedit").click(function (e) {
            let params = {
                notiID: $(".notiID").val(),
                notiTitle: $(".notiTitle").val().trim(),
                notiContent: $(".notiContent").val().trim(),
                createDate: $(".createDate").val()
            };

            // const baseUrl = location.protocol + "//" + document.domain + ":" + location.port;
            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/manager/notiMgt/editnoti",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        // location.reload();
                        res.redirect("/manager/notiMgt/listnoti");                
                    }
                }
            });
        });

        $(".notiDelete").on("click", function (e) {
            const self = this;
            $("#myModal").css("display", "block");

            $(".sureDelete").on("click", function (e) {
                const notiID = $(self).attr("notiID");

                const baseUrl = "http://localhost:3000";
                $.ajax({
                    url: baseUrl + "/manager/notiMgt/delete",
                    type: "DELETE",
                    data: { notiID: notiID },
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
    new noti();
});

$(document).on("keyup","#searchnoti", function() {
    let data = $(this).val();
    console.log("Client nhập:" + data)
    const baseUrl = "http://localhost:3000";

    $.ajax({
        async: false,
        type: "POST",
        url: baseUrl + "/manager/notiMgt/listnoti/searchnoti",
        data: data,
        cache: false,
        success: function(res){
           console.log("Server trả về:" + res);
        }
    });
});