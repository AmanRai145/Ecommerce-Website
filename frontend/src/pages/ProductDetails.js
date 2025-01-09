import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductDetails = () => {
    const { id } = useParams(); // Extract product ID from URL
    const [product, setProduct] = useState(null); // State to hold product details
    const dispatch = useDispatch(); // Redux dispatch function

    useEffect(() => {
        // Fetch product details from the backend
        const fetchProduct = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data); // Update product state with fetched data
        };

        fetchProduct();
    }, [id]);

    // Add product to cart with default quantity of 1
    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    // Show loading message while product details are being fetched
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover mt-4"
            />
            <p className="text-gray-600 mt-4">{product.description}</p>
            <p className="text-xl font-bold mt-4">${product.price.toFixed(2)}</p>
            <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white p-2 rounded mt-4"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductDetails;
