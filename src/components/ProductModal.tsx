'use client';

import { useProductStore } from '@/store/useProductStore';
import { Dialog } from '@headlessui/react';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, addToCart } = useProductStore();


  if (!selectedProduct) return null;

  return (
    <Dialog
      open={!!selectedProduct}
      onClose={() => setSelectedProduct(null)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full p-6 z-10 mx-2">
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="h-48 w-full object-contain mb-4"
        />
        <h2 className="text-xl text-black font-semibold">{selectedProduct.title}</h2>
        <p className="text-gray-500 text-sm mb-2">{selectedProduct.category}</p>
        <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
        <p className="font-bold text-green-600 mb-4">${selectedProduct.price}</p>
        <button
  onClick={() => {
    addToCart(selectedProduct);
    setSelectedProduct(null);
  }}
  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full"
>
  Add to Cart
</button>

      </div>
    </Dialog>
  );
}
