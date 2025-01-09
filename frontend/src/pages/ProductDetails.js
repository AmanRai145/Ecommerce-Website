import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            setProduct(data);
        };

        fetchProduct();
    }, [id]);

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
        </div>
    );
};

export default ProductDetails;
