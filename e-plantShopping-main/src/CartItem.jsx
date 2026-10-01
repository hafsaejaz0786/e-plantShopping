import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.cost.substring(1)) * item.quantity), 0);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Total Shopping Cart Amount: ${calculateTotalAmount()}</h2>
            {cart.map(item => (
                <div key={item.name} style={{ display: 'flex', gap: '20px', marginBottom: '15px', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                    <div>
                        <h3>{item.name}</h3>
                        <p>Unit Price: {item.cost}</p>
                        <p>Subtotal: ${parseFloat(item.cost.substring(1)) * item.quantity}</p>
                        <div>
                            <button onClick={() => handleDecrement(item)}>-</button>
                            <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                            <button onClick={() => handleIncrement(item)}>+</button>
                        </div>
                        <button onClick={() => handleRemove(item)} style={{ marginTop: '5px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px' }}>Delete</button>
                    </div>
                </div>
            ))}
            <div style={{ marginTop: '20px' }}>
                <button onClick={onContinueShopping} style={{ marginRight: '10px' }}>Continue Shopping</button>
                <button onClick={() => alert('Checkout Functionality Coming Soon')}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;