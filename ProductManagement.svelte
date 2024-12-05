<script>
  import { products } from '../store/store.js';
  let newProduct = { name: '', price: 0, stock: 0 };
  let editProduct = null;
  let isEditing = false;

  const addProduct = () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.stock >= 0) {
      products.update(currentProducts => [
        ...currentProducts,
        { id: Date.now(), ...newProduct },
      ]);
      newProduct = { name: '', price: 0, stock: 0 };
    }
  };

  const editProductDetails = (product) => {
    editProduct = { ...product };
    isEditing = true;
  };
const updateProduct = () => {
    products.update(currentProducts => {
      return currentProducts.map(p =>
        p.id === editProduct.id ? { ...editProduct } : p
      );
    });
    isEditing = false;
    editProduct = null;
  };

  const deleteProduct = (id) => {
    products.update(currentProducts => currentProducts.filter(p => p.id !== id));
  };
</script>

<h2>Gestión de Productos</h2>

{#if isEditing}
<h3>Editar Producto</h3>
<input bind:value={editProduct.name} placeholder="Nombre" />
<input type="number" bind:value={editProduct.price} placeholder="Precio" />
<input type="number" bind:value={editProduct.stock} placeholder="Stock" />
<button on:click={updateProduct}>Actualizar</button>
<button on:click={() => { isEditing = false; editProduct = null; }}>Cancelar</button>
{/if}

<h3>Añadir Producto</h3>
<input bind:value={newProduct.name} placeholder="Nombre" />
<input type="number" bind:value={newProduct.price} placeholder="Precio" />
<input type="number" bind:value={newProduct.stock} placeholder="Stock" />
<button on:click={addProduct}>Añadir Producto</button>


<h3>Lista de Productos</h3>
<ul class="product-list">
  {#each $products as product (product.id)}
    <li>
      {product.name} - {product.price}€ - {product.stock} en stock
      <button on:click={() => editProductDetails(product)}>Editar</button>
      <button on:click={() => deleteProduct(product.id)}>Eliminar</button>
    </li>
  {/each}
</ul>