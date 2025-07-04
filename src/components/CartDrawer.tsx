'use client';

import { useProductStore } from '@/store/useProductStore';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function CartDrawer() {
  const { cart, removeFromCart } = useProductStore();
  const [isOpen, setIsOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Floating cart icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
      >
        🛒
        {cart.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full px-1.5">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Drawer */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex gap-2">
                    <img src={item.image} className="h-16 w-16 object-contain border rounded" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs text-gray-500">
                        ${item.price} × {item.quantity}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-2">
                <p className="font-semibold">Total: ${total.toFixed(2)}</p>
                <button
                  className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full"
                  onClick={() => alert('Checkout action (mock)')}
                >
                  Checkout
                </button>
              </div>
            </>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
      </Dialog>
    </>
  );
}
