<script>
  import { orders } from '../store/store.js';
  import jsPDF from 'jspdf'; // Para generar PDFs
  import * as XLSX from 'xlsx'; // Para generar Excel

  const ordersList = $orders; // Suscribimos a los pedidos

  // Función para generar un archivo PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text('Reporte de Pedidos Registrados', 10, 10);

    // Encabezados de la tabla
    let startY = 20;
    doc.setFontSize(12);
    doc.text('Cliente', 10, startY);
    doc.text('Productos', 60, startY);
    doc.text('Total', 160, startY);

    // Datos de los pedidos
    ordersList.forEach((order, index) => {
      startY += 10;
      doc.text(order.customer, 10, startY);
      doc.text(order.products.map(p => p.name).join(', '), 60, startY);
      doc.text(`${order.total}€`, 160, startY);
    });

    // Descargar el PDF
    doc.save('reporte_pedidos.pdf');
  };

  // Función para generar un archivo Excel
  const generateExcel = () => {
    // Convertir los datos de los pedidos a formato Excel
    const worksheet = XLSX.utils.json_to_sheet(
      ordersList.map(order => ({
        Cliente: order.customer,
        Productos: order.products.map(p => p.name).join(', '),
        Total: order.total
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos');

    // Descargar el archivo Excel
    XLSX.writeFile(workbook, 'reporte_pedidos.xlsx');
  };
</script>

<h2>Generar Reportes</h2>

<button on:click={generatePDF}>Generar PDF</button>
<button on:click={generateExcel}>Generar Excel</button>

<style>
  button {
    margin: 1rem 0.5rem;
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

  h2 {
    margin-bottom: 1rem;
  }
</style>
