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
          <input v-model.number="invoice.tax_amount" type="number" step="0.01" />
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
          <label>Created By:</label>
          <input v-model="invoice.created_by" type="text" />
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
  ovverride_total: null,
  asjustment_reason: '',
  created_by: '',
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
  const subtotal = invoiceItems.reduceRight((sum, item) => sum + item.quantity * item.unit_cost, 0);
  const tax = invoice.tax_amount || (invoice.tax_rate ? (subtotal) * (invoice.tax_rate / 100) : 0);
  return (subtotal + invoice.shipping_cost + tax).toFixed(2) || 0;
})
function submitForm() {
  console.log('sumbit form');
  if (invoice.created_by === '' || invoice.created_by === null) {
    alert('Please enter a created by');
    return;
  }
  if (invoice.supplier_invoice_id === '' || invoice.supplier_invoice_id === null) {
    alert('Please enter a supplier invoice ID');
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

}
function cancelForm() {
  router.push('/dashboard');
}
function openProductHelper() {
  window.open('productId-directory.html', '_blank', 'width=800', 'height=800');
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