import { writable } from 'svelte/store';

// Store para productos
export const products = writable([
  { id: 1, name: 'Producto A', price: 10, stock: 100 },
  { id: 2, name: 'Producto B', price: 20, stock: 50 },
]);

// Store para pedidos
export const orders = writable([]);

// Store para ventas (historial de ventas)
export const sales = writable([]);
