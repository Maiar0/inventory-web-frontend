<template>
    <div class="invoice-form">
        <section class="section">
            <h2>Invoice Details</h2>
            <div class="form-grid">
                <div class="form-row">
                    <label>Supplier ID:</label>
                    <input v-model="invoice.supplier_id" type="text"/>
                </div>
                <div class="form-row">
                    <label>Invoice Date</label>
                    <input v-model="invoice.invoice_date" type="date"/>
                </div>
                <div class="form-row">
                    <label>Shipping Method</label>
                    <input v-model="invoice.shipping_method" type="text"/>
                </div>
                <div class="form-row">
                    <label>Shipping Cost</label>
                    <input v-model="invoice.shipping_cost" type="number" step="0.01"/>
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
                        <input
                            type="text"
                            v-model="item.product_id"
                            @input="filterProductList(item)"
                            @focus="item.showDropdown = true"
                            @blur="hideDropdown(item)"
                            placeholder="Search Product ID"
                        />
                        <ul v-if="item.showDropdown && item.filteredProducts?.length" class="dropdown">
                            <li
                            v-for="id in item.filteredProducts"
                            :key="id"
                            @mousedown.prevent="selectProduct(item, id)"
                            >
                            {{ id }}
                            </li>
                        </ul>
                        </td>
                        <td><input v-modal="item.quantity" type="number" /> </td>
                        <td><input v-modal="item.unit_cost" type="number" step="0.01"/> </td>
                        <td><input :value="item.quantity * item.unit_cost" disabled /></td>
                        <td><button @click="removeItem(index)">Remove</button></td>
                    </tr>
                </tbody>
            </table>
            <button @click="addItem">+ Add Line Item</button>
        </section>
        <div class="form-actions">
            <button @click="sumbitForm">Save Invoice</button>
            <button @click="cancelForm">Cancel</button>
        </div>
    </div>
</template>
<script setup>
import {reactive, computed} from 'vue';
const fullProductList = ['001', '002', '1bcd', 'abcd', 'bugs', 'builds', 'zebra' ];// await getProductList();
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
    { product_id: '', quantity: 0, unit_cost: 0, filteredProducts: [], showDropdown: false}
])

function filterProductList(item) {
  const query = item.product_id.toLowerCase();
  item.filteredProducts = fullProductList.filter(id =>
    id.toLowerCase().includes(query)
  );
}

function selectProduct(item, id) {
  item.product_id = id;
  item.showDropdown = false;
}

function hideDropdown(item) {
  setTimeout(() => {
    item.showDropdown = false;
  }, 200); // let click register before hiding
}

function addItem(){
    invoiceItems.push({ product_id: '', quantity: 0, unit_cost: 0, filteredProducts: [], showDropdown: false})
}
function removeItem(index){
    invoiceItems.splice(index, 1);
}
const computedInvoiceTotal = computed(() =>{
    const subtotal = invoiceItems.reduceRight((sum, item) => sum + item.quantity * item.unit_cost, 0);
    const tax = invoice.tax_amount || (invoice.tax_rate ? (subtotal + invoice.shipping_cost)* (invoice.tax_rate / 100) : 0);
    return (subtotal + invoice.shipping_cost + tax).toFixed(2);
})
function submitForm(){
    console.log('sumbit form');
}
function cancelForm(){
    console.log('cancel form');
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
    color:white;
    width: 40%;
    font-weight: bold;
}

.form-row input {
  width: 60%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
h2 {
    color: white;
}
th, td {
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