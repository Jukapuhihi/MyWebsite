function news() {
    function bindEvent() {
        $(".newsedit").click(function (e) {
            let params = {
                newsID: $(".newsID").val(),
                newsTitle: $(".newsTitle").val().trim(),
                newsContent: $(".newsContent").val().trim(),
                createDate: $(".createDate").val()
            };

            // const baseUrl = location.protocol + "//" + document.domain + ":" + location.port;
            const baseUrl = "http://localhost:3000";

            $.ajax({
                url: baseUrl + "/manager/newsMgt/editnews",
                type: "PUT",
                data: params,
                dataType: "json",
                success: function (res) {
                    if (res && res.status_code == 200) {
                        // location.reload();
                        res.redirect("/manager/newsMgt/listnews");                
                    }
                }
            });
        });

        $(".newsDelete").on("click", function (e) {
            const self = this;
            $("#myModal").css("display", "block");

            $(".sureDelete").on("click", function (e) {
                const newsID = $(self).attr("newsID");

                const baseUrl = "http://localhost:3000";
                $.ajax({
                    url: baseUrl + "/manager/newsMgt/delete",
                    type: "DELETE",
                    data: { newsID: newsID },
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
    new news();
});