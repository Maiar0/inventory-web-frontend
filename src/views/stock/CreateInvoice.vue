<template>
  <button @click="openProductHelper">🔍 Search Products</button>
  <div class="invoice-form">
    <section class="section">
      <h2>Invoice Details</h2>
      <div class="form-grid">
        <div class="form-row">
          <label>Supplier ID:</label>
          <input v-model="invoice.supplier_id" type="text" />
        </div>
        <div class="form-row">
          <label>Invoice Date</label>
          <input v-model="invoice.invoice_date" type="date" />
        </div>
        <div class="form-row">
          <label>Shipping Method</label>
          <input v-model="invoice.shipping_method" type="text" />
        </div>
        <div class="form-row">
          <label>Shipping Cost</label>
          <input v-model="invoice.shipping_cost" type="number" step="0.01" />
        </div>
        <div class="form-row">
          <label>Tax Rate (%):</label>
          <input v-model.number="invoice.tax_rate" type="number" step="0.01" />
        </div>
        <div class="form-row">
          <label>Tax Amount:</label>
          <input v-model.number="invoice.tax_amount" type="number" step="0.01" :default="computedTaxAmount" />
        </div>
        <div class="form-row">
          <label>Invoice Total:</label>
          <input :value="computedInvoiceTotal" disabled />
        </div>
        <div class="form-row">
          <label>Override Total:</label>
          <input v-model.number="invoice.override_total" type="number" step="0.01" />
        </div>
        <div class="form-row">
          <label>Adjustment Reason:</label>
          <input v-model="invoice.adjustment_reason" type="text" />
        </div>
        <div class="form-row">
          <label>Supplier Invoice #:</label>
          <input v-model="invoice.supplier_invoice_id" type="text" />
        </div>
      </div>
    </section>
    <section class="section">
      <h2>Invoice Line Items</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quanity</th>
            <th>Unit Cost</th>
            <th>Line Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoiceItems" :key="index">
            <td class="product-search">
              <input type="text" v-model="item.product_id" @input="filterProductList(item)"
                @focus="item.showDropdown = true" @blur="hideDropdown(item)" placeholder="Search Product ID" />
              <div v-if="item.showDropdown" class="dropdown">
                <div v-for="product in item.filteredProducts" :key="product.product_id"
                  @click="selectProduct(item, product)" class="dropdown-item">
                  {{ product.product_id }} | {{ product.name }} | {{ product.sku }}
                </div>
              </div>
            </td>
            <td><input v-model="item.quantity" type="number" /> </td>
            <td><input v-model="item.unit_cost" type="number" step="0.01" /> </td>
            <td><input :value="(item.quantity * item.unit_cost).toFixed(2)" disabled /></td>
            <td><button @click="removeItem(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <button @click="addItem">+ Add Line Item</button>
    </section>
    <div class="form-actions">
      <button @click="submitForm">Save Invoice</button>
      <button @click="cancelForm">Cancel</button>
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ApiFetch from '../../api/ApiFetch';
const api = new ApiFetch();
import { useCacheManager } from '../../composables/useCacheManager';
const { getData } = useCacheManager();
const router = useRouter();
const fullProductList = ref([]);
const invoice = reactive({
  supplier_id: '',
  invoice_date: '',
  shipping_method: '',
  shipping_cost: 0,
  tax_rate: 0,
  tax_amount: 0,
  override_total: null,
  adjustment_reason: '',
  supplier_invoice_id: ''
})
const invoiceItems = reactive([
  { product_id: '', quantity: 0, unit_cost: 0, filteredProducts: [], showDropdown: false }
])
onMounted(() => {
  //get products from cache
  getData('products').then(result => {
    if (result && result.data) {
      fullProductList.value = result.data;
    } else {
      console.error('No data found in the response');
    }
  });
});
function filterProductList(item) {
  if (!item.product_id) return;
  console.log('filtering product list for: ', item.product_id);
  const query = item.product_id.toLowerCase();
  const filtered = fullProductList.value.filter(product =>
    product.product_id === query ||
    product.sku.includes(query) ||
    product.name.toLowerCase().includes(query)
  );
  item.filteredProducts = filtered.slice(0, 10);
}

function selectProduct(item, product) {
  item.product_id = product.product_id;
  item.name = product.name;
  item.sku = product.sku;
  item.showDropdown = false;
}

function hideDropdown(item) {
  setTimeout(() => {
    item.showDropdown = false;
  }, 200); // let click register before hiding
}

function addItem() {
  invoiceItems.push({ product_id: '', quantity: 0, unit_cost: 0, filteredProducts: [], showDropdown: false })
}
function removeItem(index) {
  invoiceItems.splice(index, 1);
}
const computedInvoiceTotal = computed(() => {
  // Convert all values to numbers, handling empty strings and invalid values
  const subtotal = invoiceItems.reduceRight((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitCost = Number(item.unit_cost) || 0;
    return sum + (quantity * unitCost);
  }, 0);

  const shippingCost = Number(invoice.shipping_cost) || 0;
  const taxRate = Number(invoice.tax_rate) || 0;
  const taxAmount = Number(invoice.tax_amount) || 0;

  // Calculate tax if not manually set
  const tax = taxAmount || (taxRate ? (subtotal * taxRate / 100) : 0);

  // Check for NaN values
  if (isNaN(subtotal) || isNaN(shippingCost) || isNaN(tax)) {
    return '0.00';
  }

  const total = subtotal + shippingCost + tax;
  return total.toFixed(2);
})
const computedTaxAmount = computed(() => {
  const subtotal = invoiceItems.reduceRight((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitCost = Number(item.unit_cost) || 0;
    return sum + (quantity * unitCost);
  }, 0);

  const taxRate = Number(invoice.tax_rate) || 0;
  const result = (subtotal * taxRate / 100).toFixed(2);

  // Only update tax_amount if it's not manually set
  if (invoice.tax_amount === 0 || isNaN(invoice.tax_amount)) {
    invoice.tax_amount = result;
  }

  return result;
})
function submitForm() {
  console.log('sumbit form');
  //TODO:: createdby will be blank needs removed
  if (invoice.supplier_invoice_id === '' || invoice.supplier_invoice_id === null) {
    alert('Please enter a supplier invoice ID');//this is suppose to be a UUID
    return;
  }
  if (invoice.invoice_date === '' || invoice.invoice_date === null) {
    alert('Please enter an invoice date');//TODO: add date validation
    return;
  }
  if (invoice.supplier_id == '') {
    alert('Please enter a supplier ID');
    return;
  }
  if (invoice.invoice_date === '') {
    alert('Please enter an invoice date');
  }
  if (invoiceItems.length === 0) {
    alert('Please add at least one item to the invoice');
    return;
  }
  for (const item of invoiceItems) {
    if (!item.product_id || item.quantity <= 0) {
      alert('Please ensure all items have a valid product and quantity');
      return;
    }
  }
  console.log('invoice', invoice, invoiceItems);
  api.post('/invoice/create', {
    invoice: {
      supplier_id: invoice.supplier_id,
      invoice_date: invoice.invoice_date,
      shipping_method: invoice.shipping_method,
      shipping_cost: invoice.shipping_cost,
      tax_rate: invoice.tax_rate / 100,
      tax_amount: computedTaxAmount.value,
      invoice_total: computedInvoiceTotal.value,
      supplier_invoice_id: invoice.supplier_invoice_id,
      adjustment_reason: invoice.adjustment_reason,
      override_total: invoice.override_total
    },
    invoiceItems: invoiceItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      unit_cost: item.unit_cost
    }))
  }).then(result => {
    alert(`Invoice # ${result.data.invoice_id} created successfully!`);
    console.log('result', result);
  }).catch(error => {
    console.error('error', error);
  });
}
function cancelForm() {
  router.push('/dashboard');
}
function openProductHelper() {
  window.open('/productlookup', '_blank', 'width=800,height=800');
}
</script>
<style scoped>
.invoice-form {
  max-width: 100%;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}

.section {
  margin-bottom: 30px;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 6px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  row-gap: 10px;
}

.form-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-row label {
  color: white;
  width: 40%;
  font-weight: bold;
}

.form-row input {
  width: 60%;
}

.dropdown-item {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #8b8585;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

h2 {
  color: white;
}

th,
td {
  border: 1px solid #ccc;
  padding: 6px;
  text-align: left;
  color: white;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.product-search {
  position: relative;
}

.dropdown {
  position: absolute;
  background: white;
  color: black;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown li {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
}
</style>