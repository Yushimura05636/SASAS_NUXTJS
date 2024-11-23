<template>
    <NuxtLayout name="admin">
      <div class="p-8">
        <!-- Title Section -->
        <div class="mb-4">
          <h1 class="text-2xl font-bold mb-2">Payments</h1>
        </div>

        <!-- Buttons and Search Field Section -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex space-x-2">
            <button @click="createPayment" class="button text-white px-4 py-2 rounded">Create</button>
            <button @click="showPayment" class="button text-white px-4 py-2 rounded">View</button>
            <button @click="updatePayment" class="button text-white px-4 py-2 rounded">Update</button>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search payments"
            class="border rounded px-4 py-2 w-1/2"
          />
        </div>

        <!-- Table Section -->
<div v-if="state.payment && state.payment.length > 0" class="overflow-x-auto overflow-y-auto max-h-[300px]">
  <table class="w-full table-auto border-collapse">
    <thead>
      <tr>
        <th class="px-4 py-2 border-b border-gray-300">Select</th>
        <th class="px-4 py-2 border-b border-gray-300">Family Name</th>
        <th class="px-4 py-2 border-b border-gray-300">First Name</th>
        <th class="px-4 py-2 border-b border-gray-300">Middle Name</th>
        <th class="px-4 py-2 border-b border-gray-300">Prepared At</th>
        <th class="px-4 py-2 border-b border-gray-300">Status</th>
        <th class="px-4 py-2 border-b border-gray-300">Prepared By</th>
        <th class="px-4 py-2 border-b border-gray-300">Amount Paid</th>
        <th class="px-4 py-2 border-b border-gray-300">Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(payment, index) in state.payment" :key="index" class="px-4 py-2">
        <td class="py-2 border-b border-gray-300">
          <input
            type="radio"
            :value="getPaymentId(payment)"
            v-model="selectedPaymentID"
            class="cursor-pointer"
          />
        </td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.family_name }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.first_name }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.middle_name }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.prepared_at }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.document_status_description }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.prepared_by_id }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ formatCurrency(payment.amount_paid) }}</td>
        <td class="px-4 py-2 border-b border-gray-300">{{ payment.notes }}</td>
      </tr>
    </tbody>
  </table>
</div>


        <!-- No Data Message -->
        <div v-else class="text-center p-4 text-gray-500">
          No payments found
        </div>
      </div>
    </NuxtLayout>
  </template>



<script setup lang="ts">
    import { toast } from 'vue3-toastify';
    import 'vue3-toastify/dist/index.css';

    import { useRouter } from 'vue-router';
    import { ref, computed } from 'vue';
    import { apiService } from '~/routes/api/API';
    import { paymentServices } from '~/models/Payments'
import { CustomersService } from '~/models/Customer';
import { PageNameService } from '~/models/PageName';
import { loanApplicationService } from '~/models/LoanApplication';

// Router instance
const router = useRouter();
// Payments data would typically be fetched from an API or passed as a prop
const payments = ref([]); // Assume this will be populated from an API or prop
// Reactive state for search and selected payment
const searchQuery = ref('');
const selectedPayment = ref<number | null>(null);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
}

// Computed property to filter payments based on search query
const filteredPayments = computed(() => {
  if (!searchQuery.value) return payments.value;
  return payments.value.filter((payment) =>
    Object.values(payment).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});



const state = reactive({
        columnHeaders: [
            { name: 'Select' },
            { name: 'Customer ID' },
            { name: 'Prepared at' },
            { name: 'Document Status Code' },
            { name: 'Prepared By' },
            { name: 'Amount Paid' },
            { name: 'Notes' },
        ],
        error: null,
        isTableLoading: false,
        sortData: {
            sortField: 'id',
            sortOrder: 'descend',
        },
        payment: [],
        searchQuery: '',
    })

    let selectedPaymentID = ref(null); // Track selected library

async function fetchPayment() {
    state.isTableLoading = true;
    state.error = null;
    try {
        const params = {};
        const response = await apiService.getPaymentAUTH(params);
        debugger
        console.log('API Response:', response); // Debugging output
        if (response?.data?.length > 0) {
            state.payment = response.data; // Populate the payments
        } else {
            toast.info('No payments found', { autoClose: 3000 });
        }
    } catch (error: any) {
        toast.error(`${error}` || 'Failed to fetch payments', { autoClose: 5000 });
    } finally {
        state.isTableLoading = false;
    }
}

    onMounted(() => {
      fetchPayment()
    })

    function getPaymentId(payment: any): any
    {
        if(payment != null)
        {
            return payment.id
        }

        return 0
    }

    async function showPayment()
    {
        try {
            const response = await apiService.authPaymentUpdate({})
            if (selectedPaymentID.value) {
            paymentServices.id = selectedPaymentID.value;
            navigateTo('/payments/show');
            }
        } catch (error) {
            toast.error(`${error}`, {
                autoClose: 3000,
            })
        }
    }

    async function updatePayment(){
        try {
          const response = await apiService.authPaymentUpdate({})
          if (selectedPaymentID.value) {
          paymentServices.id = selectedPaymentID.value;
          navigateTo('/payments/update');
        }
        } catch (error) {
            toast.error(error.message, {
        autoClose: 5000,
    })
        }
}
function createPayment(){
    try {
        navigateTo(`/payments/create/`);
    } catch (error) {
        toast.error(`${error}`, { autoClose: 3000, })
setTimeout(() => {
    }, 2000);;
    }
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}

.overflow-x-auto {
  overflow-x: auto;
}

.overflow-y-auto {
  overflow-y: auto;
}

.max-h-[300px] {
  max-height: 300px; /* Adjust the height as needed */
}


.button {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: #116f6f; /* Tailwind color teal-800 */
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
}

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(4px);
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}

</style>
