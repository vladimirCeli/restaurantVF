module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.quantity = oldCart.quantity || 0;
    this.total = oldCart.total || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        console.log(storedItem, 'stor');
        if (!storedItem) {
            console.log('no hay store');
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                precio: 0
            };
        }
        storedItem.qty++;
        storedItem.precio = storedItem.item.precio * storedItem.qty;
        this.quantity++;
        this.total += storedItem.item.precio;
    };

    this.decrease = function (id) {
        this.items[id].qty--;
        this.items[id].precio -= this.items[id].item.precio;
        this.quantity--;
        this.total -= this.items[id].item.precio;
        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };

    this.delete = function (id) {
        this.quantity -= this.items[id].qty;
        this.total -= this.items[id].precio;
        delete this.items[id];
    };

    this.generateArray = function () {
        var arr = [];
        for (const id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    }



}