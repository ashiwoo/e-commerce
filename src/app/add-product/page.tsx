'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.coerce.number().positive('Price must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL'),
});

type FormData = z.infer<typeof schema>;

export default function AddProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = (data: FormData) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Submitted data:', data);
      setLoading(false);
      setSuccess(true);
      reset();
    }, 1500);
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 border p-4 rounded"
      >
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register('title')}
            className="border rounded w-full px-3 py-2"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            type="number"
            {...register('price')}
            className="border rounded w-full px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register('description')}
            className="border rounded w-full px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            {...register('category')}
            className="border rounded w-full px-3 py-2"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            {...register('image')}
            className="border rounded w-full px-3 py-2"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && (
          <p className="text-green-600 text-sm mt-2">
            Product added successfully
          </p>
        )}
      </form>
    </main>
  );
}
