// client/src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating } from '@mui/material';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={product.images[0]}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>
        <Rating value={product.averageRating || 0} readOnly />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddToCart}
          fullWidth
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

// client/src/components/CheckoutForm.js
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/stripe-react-js';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useCart } from '../hooks/useCart';
import { createOrder } from '../services/orderService';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { order, clientSecret } = await createOrder({
        items: cart,
        shippingAddress: {
          // shipping address details
        }
      });

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        clearCart();
        // Handle successful payment
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 2 }}>
        <CardElement />
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!stripe || loading}
        fullWidth
      >
        Pay ${total}
      </Button>
    </form>
  );
};

// client/src/hooks/useCart.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) });
      },
      clearCart: () => set({ cart: [] }),
      total: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    { name: 'shopping-cart' }
  )
);

// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getProducts = async (params) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// client/src/pages/ProductList.js
import { useState, useEffect } from 'react';
import { Grid, TextField, Select, MenuItem, Pagination } from '@mui/material';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts({ search, category, page });
      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            {/* Add category options */}
          </Select>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};