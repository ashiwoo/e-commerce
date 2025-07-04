import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductStore {
  searchQuery: string;
  selectedCategory: string;
  selectedProduct: Product | null;
  cart: CartItem[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}
export const useProductStore = create<ProductStore>((set) => ({
  searchQuery: '',
  selectedCategory: '',
  selectedProduct: null,
  cart: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
}));

