import { toast } from "react-hot-toast";

export function getCart(){
    let cartString = localStorage.getItem('cart'); //get cart string from local storage

    if(cartString == null){
        localStorage.setItem('cart', "[]");
        return []; 
    } else {
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity){
    const cart = getCart();

    //check if product already in cart
    const index = cart.findIndex(
        (item)=>{
            return item.productID == product.productID;
        }
    );
    
    if(index == -1){ // Product NOT found, add new item
        cart.push({
            productID: product.productID,
            name: product.name,
            price: product.price,
            labelledPrice: product.labelledPrice,
            quantity: quantity,
            image: product.images[0]
        });
        toast.success(`${product.name} added to cart`);
    } else { // Product found, update quantity
        const newQty = cart[index].quantity + quantity;

        if(newQty <= 0){
            cart.splice(index, 1); //remove item from cart
            toast.success(`${product.name} removed from cart`);
        } else {
            cart[index].quantity = newQty;
            toast.success(`Updated ${product.name} quantity to ${newQty}`);
        }
    }
    
    const cartString = JSON.stringify(cart);
    localStorage.setItem('cart', cartString);
}

export function emptyCart(){
    localStorage.setItem('cart', "[]");
}

export function getCartTotal(){
    let total = 0;
    const cart = getCart();
    cart.forEach((item)=>{
        total += item.price * item.quantity;
    });
    return total;
}