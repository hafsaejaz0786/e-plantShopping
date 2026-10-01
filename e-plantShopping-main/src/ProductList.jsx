import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';

const plantsArray = [
    {
        category: "Air Purifying",
        plants: [
            { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
            { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
            { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes indoor toxins.", cost: "$18" },
            { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity indoors.", cost: "$14" },
            { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to maintain.", cost: "$20" },
            { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/09/16/aloe-vera-3283296_1280.jpg", description: "Healing properties.", cost: "$10" }
        ]
    },
    {
        category: "Aromatic",
        plants: [
            { name: "Lavender", image: "https://cdn.pixabay.com/photo/2016/07/22/09/59/lavender-1534496_1280.jpg", description: "Calming scent.", cost: "$22" },
            { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/05/16/18/16/jasmine-3406642_1280.jpg", description: "Sweet floral fragrance.", cost: "$25" },
            { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Aromatic herb.", cost: "$12" },
            { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/27/18/30/mint-1165008_1280.jpg", description: "Fresh minty aroma.", cost: "$8" },
            { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2017/02/07/16/47/eucalyptus-2046487_1280.jpg", description: "Refreshing scent.", cost: "$18" },
            { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/05/28/11/33/lemon-balm-2350810_1280.jpg", description: "Citrus scent.", cost: "$14" }
        ]
    },
    {
        category: "Medicinal",
        plants: [
            { name: "Tulsi", image: "https://cdn.pixabay.com/photo/2016/08/18/11/00/holy-basil-1602633_1280.jpg", description: "Boosts immunity.", cost: "$10" },
            { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/07/12/31/peppermint-2481358_1280.jpg", description: "Aids digestion.", cost: "$9" },
            { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2017/06/18/21/37/chamomile-2417282_1280.jpg", description: "Promotes sleep.", cost: "$11" },
            { name: "Thyme", image: "https://cdn.pixabay.com/photo/2016/09/20/12/38/thyme-1682431_1280.jpg", description: "Antimicrobial qualities.", cost: "$12" },
            { name: "Calendula", image: "https://cdn.pixabay.com/photo/2015/07/02/20/37/marigold-829562_1280.jpg", description: "Soothes skin.", cost: "$13" },
            { name: "Lemongrass", image: "https://cdn.pixabay.com/photo/2016/11/29/05/07/lemongrass-1867462_1280.jpg", description: "Rich in antioxidants.", cost: "$15" }
        ]
    }
];

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div>
            <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2e7d32', color: 'white', alignItems: 'center' }}>
                <h2 style={{ cursor: 'pointer' }} onClick={onHomeClick}>Paradise Nursery</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => setShowCart(false)}>Plants</span>
                    <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowCart(true)}>
                        <ShoppingCart size={28} />
                        <span style={{ position: 'absolute', top: '-8px', right: '-10px', backgroundColor: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '12px' }}>
                            {totalQuantity}
                        </span>
                    </div>
                </div>
            </nav>

            {showCart ? (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            ) : (
                <div style={{ padding: '20px' }}>
                    {plantsArray.map(categoryObj => (
                        <div key={categoryObj.category}>
                            <h2>{categoryObj.category}</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                                {categoryObj.plants.map(plant => {
                                    const isAdded = cartItems.some(item => item.name === plant.name);
                                    return (
                                        <div key={plant.name} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                                            <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                                            <h3>{plant.name}</h3>
                                            <p>{plant.description}</p>
                                            <p><strong>{plant.cost}</strong></p>
                                            <button
                                                onClick={() => handleAddToCart(plant)}
                                                disabled={isAdded}
                                                style={{ backgroundColor: isAdded ? '#ccc' : '#4caf50', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: isAdded ? 'not-allowed' : 'pointer' }}
                                            >
                                                {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;