module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.quantity = cart.quantity || 0;
    this.total = cart.total || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                precio: 0
            };
        }
        console.log(storedItem, 'stored item');
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