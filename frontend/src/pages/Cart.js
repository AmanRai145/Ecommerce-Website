import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../slices/cartSlice';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from Redux state
    const dispatch = useDispatch(); // Redux dispatch function

    // Debugging: Log cart items to console
    console.log('Cart Items:', cartItems);

    // Handle quantity change
    const handleQuantityChange = (id, quantity) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    // Handle item removal
    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <div className="mt-4">
                    {cartItems.map((item) => (
                        <div key={item._id} className="border p-4 rounded mb-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p>${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min="1"
                                    className="border p-1 w-16"
                                    onChange={(e) => handleQuantityChange(item._id, +e.target.value)}
                                />
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="bg-red-500 text-white p-2 rounded ml-4"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right mt-4">
                        <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
