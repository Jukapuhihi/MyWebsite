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
        drawCheckout();
    });
    function drawCheckout() {
        $('tbody').empty();
        let ckUnit = "";
        let totalMoney = 0;
        for (let i = 0; i < cart.length; i++) {
            totalMoney += cart[i].price * cart[i].quantity;
            ckUnit += `
                <tr>
                    <td>${cart[i].id}</td>
                    <td>${cart[i].prodName}</td>
                    <td style="height: 10rem; width: 10rem;">
                        <img src="${cart[i].imageUrl}" alt="">
                    </td>
                    <td>
                        <input type="number" name="" value="${cart[i].quantity}" min="0" step="1">
                        <button type="button" class="btn btn-xs btn-danger">
                        <span class="glyphicon glyphicon-remove>X</span>
                    </td>
                    <td>
                        <b><span class="unit-price">${cart[i].price * cart[i].quantity}</span></b>
                    </td>

                </tr>
            `;
        }
        ckUnit += `
            <tr style="display: block;">
                <td colspan="4">Total Price</td>
                <td>${totalMoney}đ</td>
            </tr>
        `;
        $('tbody').append(ckUnit);
    }
});