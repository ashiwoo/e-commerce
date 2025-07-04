'use client';

import React from 'react';
import { useProductStore } from '@/store/useProductStore';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { setSelectedProduct } = useProductStore();
  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
      <img src={product.image} alt={product.title} className="h-40 object-contain w-full mb-2" />
      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
      <p className="text-sm text-gray-500 truncate">{product.description}</p>
      <p className="mt-2 font-bold text-green-600">${product.price}</p>
    </div>
  );
};

export default ProductCard;
