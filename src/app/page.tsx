'use client';

import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { useProductStore } from '@/store/useProductStore';
import ProductModal  from '@/components/ProductModal';
import CartDrawer from '@/components/CartDrawer';



interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

const getCategories = async (): Promise<string[]> => {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export default function HomePage() {
  const { data, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { data: categories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const {
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
  } = useProductStore();

  if (isLoading)
    return <div className="p-10 text-center">Loading products...</div>;

  if (isError)
    return (
      <div className="p-10 text-center text-red-600">
        Error loading products.
      </div>
    );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-2 w-full sm:w-1/3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="border rounded px-3 py-2 w-full sm:w-1/4 text-white bg-black"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data
          ?.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((product) =>
            selectedCategory ? product.category === selectedCategory : true
          )
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <ProductModal />
      <CartDrawer />

    </main>
  );
}
