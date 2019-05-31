const cart = [];

$(document).ready(function () {
    
    $('.addtocart').on('click', function () {
        
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
        //check sp co trong gio hay chua
        let flag = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == obj.id) {
                flag = true;
                break;
            }
        }
        //sp chua co trong gio hang
        if (flag === false) {
            obj.quantity = 1;
            cart.push(obj);
        } else {//sp da co trong gio hang
            cart[i].quantity += 1;
        }
    });
});