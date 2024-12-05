<script>
  import { products } from '../store/store.js';

  const stockList = $products; // Lista de productos para el inventario
</script>

<h2>Gestión de Inventario</h2>

<h3>Productos en Inventario</h3>
<ul class="product-list">
  {#each stockList as product}
    <li>
      {product.name} - {product.stock} unidades
    </li>
  {/each}
</ul>
