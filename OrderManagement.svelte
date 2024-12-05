<script>
  import { orders } from '../store/store.js';
  import { products } from '../store/store.js';

  let newOrder = { customer: '', products: [], total: 0 };
  let productSelection = null;
  
  // Suscripción a los stores
  let ordersList = [];
  $: ordersList = $orders; // Suscribirse a `orders` y actualizar automáticamente la variable

  const addOrder = () => {
    if (newOrder.customer && newOrder.products.length > 0) {
      orders.update(currentOrders => [
        ...currentOrders,
        { id: Date.now(), ...newOrder }
      ]);
      newOrder = { customer: '', products: [], total: 0 };
    }
  };

  const addProductToOrder = (product) => {
    if (!newOrder.products.includes(product)) {
      newOrder.products.push(product);
      newOrder.total += product.price;
    }
  };

  const removeProductFromOrder = (product) => {
    newOrder.products = newOrder.products.filter(p => p !== product);
    newOrder.total -= product.price;
  };
</script>

<h2>Gestión de Pedidos</h2>

<h3>Registrar Nuevo Pedido</h3>
<input bind:value={newOrder.customer} placeholder="Cliente" />

<h4>Seleccionar Productos</h4>
<ul class="product-list">
  {#each $products as product}
    <li>
      {product.name} - {product.price}€
      <button on:click={() => addProductToOrder(product)}>Añadir</button>
    </li>
  {/each}
</ul>

<h4>Productos en el Pedido</h4>
<ul class="product-list">
  {#each newOrder.products as product}
    <li>
      {product.name}
      <button on:click={() => removeProductFromOrder(product)}>Eliminar</button>
    </li>
  {/each}
</ul>

<h4>Total: {newOrder.total}€</h4>

<button on:click={addOrder}>Registrar Pedido</button>

<h3>Lista de Pedidos</h3>
<ul>
  {#each ordersList as order}
    <li>
      Pedido de {order.customer} - Total: {order.total}€
    </li>
  {/each}
</ul>
