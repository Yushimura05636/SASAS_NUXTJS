<template>
    <NuxtLayout name="admin">
        <main>
            <div class="flex justify-center items-center bg-gray-100">
                <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full flex">
                    <!-- Left Flex Column for Group Name and Customer Names -->
                    <div class="w-1/2 pr-4">
                        <div class="text-center font-bold text-xl mb-4">Transaction Form</div>

                        <!-- Group Name Combobox -->
                        <div class="mb-4" v-if="state.isLoading == false">
                            <label class="block text-gray-700">Group Name</label>
                            <select v-model="selectedGroupId" @change="fetchCustomers" class="w-full border rounded-lg px-4 py-2">
                                <option v-for="group in filteredGroup" :key="group.id" :value="group.id">
                                    {{ group.description }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-4" v-if="state.customers.length > 0">
                            <label class="block text-gray-700">Collector Name</label>
                            <input
                                v-model="collectorName"
                                type="text"
                                class="w-full border border-gray-300 rounded p-2"
                                readonly
                            />
                        </div>

                        <!-- Table for Customer Names -->
                        <div v-if="state.customers.length > 0" class="overflow-auto max-h-[250px]"> <!-- Limit height for 10 rows -->
                            <table class="min-w-full bg-white border border-gray-300 mb-4">
                                <thead>
                                    <tr>
                                        <th class="px-4 py-2 border text-left">Select</th>
                                        <th class="px-4 py-2 border text-left">Customer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="customer in state.customers" :key="customer.id">
                                        <td class="px-4 py-2 border text-left">
                                            <input
                                                type="checkbox"
                                                v-model="customer.isSelected"
                                                :value="customer.id"
                                                @change="onCheckboxChange(customer.id, $event.target.checked, customer)"
                                            />
                                        </td>
                                        <td class="px-4 py-2 border cursor-pointer" @click="loadCustomerData(customer.id, customer)">
                                            {{ customer.personality.first_name }} {{ customer.personality.middle_name }} {{ customer.personality.family_name }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Loading spinner -->
                    <div v-if="state.isLoading" class="loading-spinner flex">
                        <div class="flex-auto"></div>
                        <div><p>Loading...</p> <!-- You can replace this with a spinner animation --></div>
                        <div class="flex-auto"></div>
                    </div>

                    <!-- Right Flex Column for Customer Form Fields -->
                    <div class="w-1/2 pl-4 overflow-auto max-h-[500px]" v-if="state.isLoading == false"> <!-- Adjust max height for form -->
                        <div v-if="selectedCheckCustomerId !== null">
                            <!-- New Name Field -->
                            <div class="mb-4">
                                <label class="block text-gray-700">Name</label>
                                <input
                                    readonly
                                    v-model="customerData[selectedCheckCustomerId].name"
                                    type="text"
                                    class="w-full border border-gray-300 rounded p-2"
                                />
                            </div>
                        </div>

                        <div v-if="selectedCheckCustomerId !== null">
                            <div class="mb-4">
                                <label class="block text-gray-700">Loan Application No</label>
                                <input
                                    v-model="customerData[selectedCheckCustomerId].loanApplicationNo"
                                    type="text"
                                    class="w-full border border-gray-300 rounded p-2"
                                    readonly
                                />
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 mb-1">Loan Count</label>
                                <select disabled v-model="selectedLoanCountId" readonly class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300">
                                    <option v-for="loan in state.loan_counts" :key="loan.id" :value="loan.id">
                                    {{ loan.loan_count }}
                                    </option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 mb-1">Min Amount</label>
                                <input type="text" :value="minAmountForSelected" readonly class="w-full border rounded-lg px-4 py-2 bg-gray-100 focus:outline-none" />

                                <label class="block text-gray-700 mb-1 mt-2">Max Amount</label>
                                <input type="text" :value="maxAmountForSelected" readonly class="w-full border rounded-lg px-4 py-2 bg-gray-100 focus:outline-none" />
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 mb-1">Loan Amount</label>
                                <input
                                    v-model="customerData[selectedCheckCustomerId].loanAmount"
                                    type="number"
                                    :placeholder="maxAmountForSelected ? `Amount : ${minAmountForSelected}-${maxAmountForSelected}` : 'Enter Loan Amount'"
                                    class="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
                                    @input="updateLoanAmount(selectedCheckCustomerId)"
                                />
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700">Factor Rate</label>
                                <select
                                    v-model="customerData[selectedCheckCustomerId].factorRate"
                                    @change="onFactorRateChange(customerData[selectedCheckCustomerId].factorRate)"
                                    class="w-full border rounded-lg px-4 py-2"
                                >
                                    <option v-for="factorRate in state.factorRates" :key="factorRate.id" :value="factorRate.id">
                                        {{ factorRate.value }}
                                    </option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700">Interest Amount</label>
                                <input
                                    v-model="customerData[selectedCheckCustomerId].interestAmount"
                                    type="number"
                                    step="0.01"
                                    class="w-full border border-gray-300 rounded p-2"
                                />
                            </div>

                            <!-- Add Amount Paid Field -->
                            <div class="mb-4">
                                <label class="block text-gray-700">Amount Paid</label>
                                <input
                                    v-model="customerData[selectedCheckCustomerId].amountPaid"
                                    type="number"
                                    class="w-full border border-gray-300 rounded p-2"
                                    readonly
                                />
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700">Payment Frequency</label>
                                <select v-model="customerData[selectedCheckCustomerId].paymentFrequency" class="w-full border rounded-lg px-4 py-2">
                                    <option v-for="frequency in state.paymentFrequencies" :key="frequency.id" :value="frequency.id">
                                        {{ frequency.description }}
                                    </option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700">Duration</label>
                                <select v-model="customerData[selectedCheckCustomerId].duration" class="w-full border rounded-lg px-4 py-2">
                                    <option v-for="duration in state.durations" :key="duration.id" :value="duration.id">
                                        {{ duration.description }}
                                    </option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700">Comment</label>
                                <textarea
                                    v-model="customerData[selectedCheckCustomerId].comment"
                                    class="w-full border border-gray-300 rounded p-2"
                                ></textarea>
                            </div>

                            <div v-if="state.fees.length > 0" class="overflow-auto max-h-[250px]"> <!-- Limit height for fees table -->
                                <div class="max-h-60 overflow-y-auto">
                                    <table class="min-w-full bg-white border border-gray-300 mb-4">
                                        <thead>
                                            <tr>
                                                <th class="px-4 py-2 border text-left">Fee Description</th>
                                                <th class="px-4 py-2 border text-left">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="fee in state.fees" :key="fee.id">
                                                <td class="px-4 py-2 border">{{ fee.description }}</td>
                                                <td class="px-4 py-2 border">{{ fee.amount }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <!-- <div class="mb-4">
                                <label class="block text-gray-700">Total Fees</label>
                                <input
                                    v-model="customerData[selectedCheckCustomerId].totalFees"
                                    step="0.01"
                                    type="number"
                                    class="w-full border border-gray-300 rounded p-2"/>
                            </div> -->

                            <div class="text-center mt-4">
                                <!-- Approve and Reject Buttons -->
                                <button @click.prevent="approveTransaction" class="bg-green-500 text-white px-4 py-2 rounded">
                                    Approve
                                </button>
                                <button @click.prevent="rejectTransaction" class="bg-red-500 text-white px-4 py-2 rounded ml-2">
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </NuxtLayout>
</template>


<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { apiService } from '~/routes/api/API';
import { Customers } from '../../../models/Customer';

const state = ref({
    groups: [],
    customers: [],
    customers_temp: [],
    factorRates: [],
    paymentFrequencies: [],
    durations: [],
    fees: [],
    loan_counts: [],
    isLoading: true,
});

const totalFees = ref(0);
const selectedGroupId = ref(null);
const selectedCustomerId = ref(null);
const selectedCheckCustomerId = ref(null);
const selectedLoanCountId = ref(null);
const customerData = reactive({});
const collectorName = ref('');

// Computed properties for min and max amounts based on selected loan count
const maxAmountForSelected = computed(() => {
    const selectedLoan = state.value.loan_counts.find(loan => loan.id === selectedLoanCountId.value);
    return selectedLoan ? selectedLoan.max_amount : null;
});

const minAmountForSelected = computed(() => {
    const selectedLoan = state.value.loan_counts.find(loan => loan.id === selectedLoanCountId.value);
    return selectedLoan ? selectedLoan.min_amount : null;
});

// Fetch data on mount
onMounted(async () => {

    //Promise for authentication
  const state_response = ref('');
  try {
      const response = await apiService.authLoanApplicationsView({})
      state_response.value = response.message;
      fetchGroups();
      fetchFactorRate();
      fetchPaymentFrequencies();
      fetchDurations();
      fetchFees();
      fetchLoanCount();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
            navigateTo(`/loan_applications`)
            }, 3000);
    }
  }

});

const fetchGroups = async () => {
    try {
        const response = await apiService.getNoAuth({}, "customer_group");
        state.value.groups = response.data;

        const customer_data = await apiService.getCustomersNoAuth({})
        state.value.customers_temp = customer_data.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
    finally {
        state.value.isLoading = false;
    }
};

const fetchLoanCount = async () => {
    try {
        const response = await apiService.getLoanCount({});
        state.value.loan_counts = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchCustomers = async () => {
    selectedCustomerId.value = null;
    customerData.value = {}; // Clear previous customer data
    state.value.isLoading = true;
    if (selectedGroupId.value) {
        try {
            const response = await apiService.getCustomerByGroupIdNoReject({}, selectedGroupId.value);
            state.value.customers = response.data;
            collectorName.value = response.collector.name
            initializeCustomerData();
        } catch (error) {
            toast.error(`${error}`, { autoClose: 5000 });
        }
        finally {
            state.value.isLoading = false;
        }
    } else {
        toast.error('Please select a group.', { autoClose: 5000 });
    }
};

const fetchFactorRate = async () => {
    try {
        const response = await apiService.getFactorRateNoAuth({});
        state.value.factorRates = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchPaymentFrequencies = async () => {
    try {
        const response = await apiService.getPaymentFrequencyNoAuth({});
        state.value.paymentFrequencies = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchDurations = async () => {
    try {
        const response = await apiService.getPaymentdurationNoAuth({});
        state.value.durations = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchFees = async () => {
    try {
        // const response = await apiService.getFeeNoAuth({});
        state.value.fees = [];
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

// Initialize data structure for each customer
function initializeCustomerData() {
    state.value.customers.forEach((customer) => {
        customerData[customer.id] = {
            loanApplicationNo: '',
            customerId: customer.id,
            isSelected: false,
            loanAmount: '',
            factorRate: '',
            interestAmount: '',
            amountPaid: '',
            releaseSchedule: '',
            paymentFrequency: '',
            duration: '',
            comment: '',
            loan_count: null,
            minAmount: null,
            maxAmount: null,
            selectedFees: [],
        };
    });
}

// Load specific data for a customer when a row is clicked
async function loadCustomerData(customerId: any, customerObject: any) {
    selectedCheckCustomerId.value = customerId;
    selectedCustomerId.value = customerId;

    customerObject.isSelected = true

    try {
        state.value.isLoading = true;
        const customer = await apiService.getLoanApplicationByCustomerIdWithPendingNoAUTH({}, customerId);
        debugger
        const customerLoanCount = await fetchCustomerLoanCount(customer.data.customer.loan_count);
        selectedLoanCountId.value = customerLoanCount?.id;
        state.value.fees = customer.data.loan.fees || [];

        // Set properties directly on `customerData`
        customerData[customerId] = {
            customerId: customer.data.customer.id,
            loan_count: customerLoanCount.loan_count,
            minAmount: customerLoanCount.min_amount,
            maxAmount: customerLoanCount.max_amount,
            name: `${customerObject.personality.family_name} ${customerObject.personality.first_name} ${customerObject.personality.middle_name}`,
            loanApplicationNo: customer.data.loan.loan_application_no,
            coMaker: customer.data.loan.co_maker_id,
            loanAmount: customer.data.loan.amount_loan,
            factorRate: parseInt(customer.data.loan.factor_rate),
            interestAmount: customer.data.loan.amount_interest,
            amountPaid: customer.data.loan.amount_paid,
            releaseSchedule: customer.data.loan.release_schedule,
            paymentFrequency: customer.data.loan.payment_frequency_id,
            duration: customer.data.loan.payment_duration_id,
            comment: customer.data.loan.comment,
            selectedFees: customer.data.loan.selected_fees || [],
            totalFees: customer.data.loan.total_fees || 0,
            isSelected: true,
        };

    } catch (error) {
        toast.error(`Error loading customer data: ${error}`, { autoClose: 5000 });
    }
    finally {
        state.value.isLoading = false;
    }
}

// Fetch customer-specific loan count data
async function fetchCustomerLoanCount(customerId) {
    try {
        const response = await apiService.getLoanCountById({}, parseInt(customerId));
        return response.data;
    } catch (error) {
        toast.error(`Error fetching loan count for customer ${customerId}: ${error}`);
    }
}

// Loan amount and interest calculations
// const calculateInterestAndAmountPaid = (loanAmount, factorRate) => {
//     if (loanAmount && factorRate) {
//         const interestAmount = loanAmount * (factorRate / 100);
//         const amountPaid = loanAmount + interestAmount;
//         return { interestAmount, amountPaid };
//     }
//     return { interestAmount: 0, amountPaid: 0 };
// };

const exceedsMaxAmount = ref('');

const updateLoanAmount = (customerId) => {
    const customer = customerData[customerId];
    if (customer.loanAmount && customer.factorRateValue) {
        const { interestAmount, amountPaid } = calculateInterestAndAmountPaid(customer.loanAmount, customer.factorRateValue);
        customer.interestAmount = interestAmount;
        customer.amountPaid = amountPaid;
        // console.log("Loan Amount:", customer.loanAmount);
        // console.log("Max Amount:", maxAmountForSelected);
    }

    const maxAmount = maxAmountForSelected.value;
    if (parseFloat(customer.loanAmount) > parseFloat(maxAmount)) {
        exceedsMaxAmount.value = 'Exceed'
    } else {
    exceedsMaxAmount.value = ''; // Reset if within limit
    }
};

// Watch for loan amount input changes
watch(() => customerData[selectedCustomerId.value]?.factorRate, (newFactorRate) => {
    onFactorRateChange(newFactorRate);
});

const onFactorRateChange = async (selectedFactorRateId) => {
    const factorRate = state.value.factorRates.find(rate => rate.id === selectedFactorRateId);
    if (factorRate && selectedCheckCustomerId.value) {
        const customer = customerData[selectedCheckCustomerId.value];
        customer.factorRate = factorRate.id;
        customer.factorRateValue = factorRate.value;
        customer.paymentFrequency = factorRate.payment_frequency_id || '';
        customer.duration = factorRate.payment_duration_id || '';
        updateLoanAmount(selectedCheckCustomerId.value);
    }
};

const generateLoanApplicationNo = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return `LN-${randomString}${randomNumber}`;
};

const rejectTransaction = async () => {
    const allCustomerData = []; // Initialize an empty array to hold customer data

    // Convert customerData object into an array
    const customerDataArray = Object.values(customerData);

    debugger

    // Loop through the customer data array using a simple for loop
    for (let i = 0; i < customerDataArray.length; i++) {
        const customer = customerDataArray[i];

        debugger;

        // Ensure the customer data is valid
        if (
            customer &&
            customer.isSelected && // Check if the customer is selected
            customer.customerId &&
            customer.loanApplicationNo &&
            customer.loanAmount &&
            selectedGroupId.value &&
            customer.factorRate &&
            customer.interestAmount &&
            customer.amountPaid &&
            customer.paymentFrequency &&
            customer.duration
        ) {
            allCustomerData.push({
                customer_id: customer.customerId,
                loan_application_no: customer.loanApplicationNo,
                amount_loan: customer.loanAmount,
                group_id: selectedGroupId.value,
                factor_rate: customer.factorRate,
                amount_interest: customer.interestAmount,
                amount_paid: customer.amountPaid,
                datetime_target_release: customer.releaseSchedule,
                datetime_prepared: new Date().toISOString(), // Empty because the database will cater the date when it's prepared
                payment_frequency_id: customer.paymentFrequency,
                payment_duration_id: customer.duration,
                notes: customer.comment || '', // Include comment if it exists, otherwise set it to an empty string
                document_status_code: 'REJECT', // Means pending
                fees: customer.selectedFees, // Include selected fees
                coMaker: customer.coMaker,
            });
        }
    }

    // Check if there is any customer data to submit
    if (allCustomerData.length > 0) {
        // Loop through all the customer data
        try {
            // Send all customer data to the Laravel API
            const response = await apiService.rejectLoanApplication({
                allCustomerData, // Use the correct variable here
            }, 0);

            if (response) {
                // Optionally, show a success message for each customer or track the success/failure of each
                toast.success('All customers approved successfully.', { autoClose: 5000 });

                navigateTo('/loan_applications')
            }
        } catch (error) {
            // Show an error message for the failed submission
            toast.error(`Submission failed: ${error}`, { autoClose: 5000 });
        }
        finally{
            setTimeout(() => {
            }, 3000);
        }

        // After all submissions are done, navigate to the loan applications page
        // navigateTo('/loan_applications');
    } else {
        toast.error('No customer data to submit.', { autoClose: 5000 });
    }
    console.log("Transaction Rejected!");
};

// Submit form data
const approveTransaction = async () => {
    const allCustomerData = []; // Initialize an empty array to hold customer data

    // Convert customerData object into an array
    const customerDataArray = Object.values(customerData);

    // Loop through the customer data array using a simple for loop
    for (let i = 0; i < customerDataArray.length; i++) {
        const customer = customerDataArray[i];

        debugger;

        // Ensure the customer data is valid
        if (
            customer &&
            customer.isSelected && // Check if the customer is selected
            customer.customerId &&
            customer.loanApplicationNo &&
            customer.loanAmount &&
            selectedGroupId.value &&
            customer.factorRate &&
            customer.interestAmount &&
            customer.amountPaid &&
            customer.paymentFrequency &&
            customer.duration
        ) {
            allCustomerData.push({
                customer_id: customer.customerId,
                loan_application_no: customer.loanApplicationNo,
                amount_loan: customer.loanAmount,
                group_id: selectedGroupId.value,
                factor_rate: customer.factorRate,
                amount_interest: customer.interestAmount,
                amount_paid: customer.amountPaid,
                datetime_target_release: customer.releaseSchedule,
                datetime_prepared: new Date().toISOString(), // Empty because the database will cater the date when it's prepared
                payment_frequency_id: customer.paymentFrequency,
                payment_duration_id: customer.duration,
                notes: customer.comment || '', // Include comment if it exists, otherwise set it to an empty string
                document_status_code: 'APPROVE', // Means pending
                fees: customer.selectedFees, // Include selected fees
                coMaker: customer.coMaker,
            });
        }
    }

    // Check if there is any customer data to submit
    if (allCustomerData.length > 0) {
        // Loop through all the customer data
        try {
            // Send all customer data to the Laravel API
            const response = await apiService.approveLoanApplication({
                allCustomerData, // Use the correct variable here
            }, 0);

            if (response) {
                // Optionally, show a success message for each customer or track the success/failure of each
                toast.success('All customers approved successfully.', { autoClose: 5000 });
                console.log("All customer data before navigation:", allCustomerData);

                localStorage.setItem('receiptData', JSON.stringify(allCustomerData));

                navigateTo('/loan_applications/view/receipt2');

                // navigateTo('/loan_applications')
            }
        } catch (error) {
            // Show an error message for the failed submission
            toast.error(`Submission failed: ${error}`, { autoClose: 5000 });
        }
        finally{
            setTimeout(() => {
            }, 3000);
        }

        // After all submissions are done, navigate to the loan applications page
        // navigateTo('/loan_applications');
    } else {
        toast.error('No customer data to submit.', { autoClose: 5000 });
    }
};


// Update selected fees
const updateSelectedFees = async (feeId, isSelected) => {
    if (!customerData[selectedCheckCustomerId.value]) return;
    const selectedFees = customerData[selectedCheckCustomerId.value].selectedFees;
    if (isSelected) {
        if (!selectedFees.includes(feeId)) selectedFees.push(feeId);
    } else {
        const index = selectedFees.indexOf(feeId);
        if (index > -1) selectedFees.splice(index, 1);
    }
    calculateTotalFees();
};

// Calculate total fees
const calculateTotalFees = () => {
    const customer = customerData[selectedCheckCustomerId.value];
    if (customer && customer.selectedFees.length > 0) {
        let total = 0;
        for (let i = 0; i < customer.selectedFees.length; i++) {
            const fee = state.value.fees.find(f => f.id === customer.selectedFees[i]);
            if (fee) total += parseFloat(fee.amount);
        }
        customer.totalFees = parseFloat(total).toFixed(8);
    } else {
        customer.totalFees = 0;
    }
};

const cancelForm = () => {
    navigateTo('/loan_applications/');
};

const onCheckboxChange = (customerId, isChecked, customerObject) => {
    if (isChecked) {
        customerData[customerId].isSelected = true;
        loadCustomerData(customerId, customerObject)
    } else {
        customerData[customerId].isSelected = false;
    }
};

const availableCoMakers = computed(() =>
    state.value.customers.filter((customer) => customer.id !== selectedCheckCustomerId.value)
);

const groupsWithCustomers = computed(() => {
    return state.value.groups.filter(group => {
        // Check if there are customers in the selected group
        //return state.value.customers.some(customer => customer.group_id === group.id);
    });
});

const filteredGroup = computed(() => {
    try {
        const uniqueGroupIds = new Set(state.value.customers_temp.map(customer => customer.customer.group_id));
        state.value.groups = state.value.groups.filter(group => uniqueGroupIds.has(group.id));
        return state.value.groups;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 3000, })
setTimeout(() => {
    }, 2000);
    }
});
</script>


<style scoped>
/* Custom styles to enhance the UI further */
input[type="text"],
input[type="number"],
select,
textarea {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #63b3ed; /* Tailwind blue-300 */
    box-shadow: 0 0 0 1px rgba(99, 184, 237, 0.5);
}

@media (max-width: 640px) {
    .max-w-lg {
        max-width: 100%;
    }
}

.overflow-auto {
    overflow-x: auto; /* Enables horizontal scrolling */
    overflow-y: auto; /* Enables vertical scrolling */
}

.max-h-96 {
    max-height: 24rem; /* Adjust based on your design needs */
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Adjust as needed */
}

.loading-spinner p {
    font-size: 20px; /* Adjust size as needed */
}

/* Example spinner styles */
.loading-spinner:after {
    content: "";
    width: 30px;
    height: 30px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #3498db; /* Spinner color */
    animation: spin 1s ease infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
