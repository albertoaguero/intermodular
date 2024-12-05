<script>
  import { orders } from '../store/store.js'; // Importar el store de pedidos

  let showOrders = false; // Controla si mostramos los pedidos
  const ordersList = $orders; // Suscribimos los datos de pedidos

  const displayOrders = () => {
    showOrders = true; // Cambiamos el estado para mostrar los pedidos
  };
</script>

<h2>Informes de Ventas</h2>

<button on:click={displayOrders}>Mostrar Pedidos Registrados</button>

{#if showOrders}
  <h3>Lista de Pedidos</h3>
  <table>
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Productos</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {#each ordersList as order}
        <tr>
          <td>{order.customer}</td>
          <td>{order.products.map(p => p.name).join(', ')}</td>
          <td>{order.total}€</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<style>
  /* Estilo adicional para la tabla */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 0.8rem;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #3498db;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ecf0f1;
  }

  button {
    margin-top: 1rem;
    background-color: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2980b9;
  }
</style>
