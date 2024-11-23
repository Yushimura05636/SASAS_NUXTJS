<template>
    <NuxtLayout name="admin">
        <main>
            <div class="flex justify-center items-center bg-gray-100">
                <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full">
                    <div class="text-center font-bold text-xl mb-4">Transaction Form</div>

                    <!-- Group Name Combobox -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Group Name</label>
                        <select v-model="selectedGroupId" @change="fetchCustomers" class="w-full border rounded-lg px-4 py-2">
                            <option v-for="group in state.groups" :key="group.id" :value="group.id">
                                {{ group.description }}
                            </option>
                        </select>
                    </div>
                    
                    <!-- Table for Customer Names -->
<div v-if="state.customers.length > 0" class="overflow-x-auto">
    <div class="max-h-60 overflow-y-auto">
        <table class="min-w-full bg-white border border-gray-300 mb-4">
            <thead>
                <tr>
                    <th class="px-4 py-2 border text-left">Select</th>
                    <th class="px-4 py-2 border text-left">Customer Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in state.customers" :key="customer.id" :value="customer.id">
                    <td class="px-4 py-2 border text-left">
                        <input
                            type="checkbox"
                            v-model="customer.isSelected"
                            :value="customer.id"
                            @change="onCheckboxChange(customer.id, $event.target.checked)"
                        />
                    </td>
                    <td class="px-4 py-2 border cursor-pointer" @click="loadCustomerData(customer.id)">
                        {{ customer.personality.first_name }} {{ customer.personality.middle_name }} {{ customer.personality.family_name }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>



                    <!-- Form Fields for the Selected Customer -->
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
                            <label class="block text-gray-700">Co-Maker</label>
                            <select
                                v-model="customerData[selectedCheckCustomerId].coMaker"
                                class="w-full border rounded-lg px-4 py-2">
                                <option v-for="customer in availableCoMakers" :key="customer.id" :value="customer.id">
                                    {{ customer.personality.first_name }} {{ customer.personality.middle_name }} {{ customer.personality.family_name }}
                                </option>
                            </select>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Loan Amount</label>
                            <input
                                v-model="customerData[selectedCheckCustomerId].loanAmount"
                                type="number"
                                class="w-full border border-gray-300 rounded p-2"
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
                            <label class="block text-gray-700">Release Schedule</label>
                            <input
                                v-model="customerData[selectedCheckCustomerId].releaseSchedule"
                                type="date"
                                class="w-full border border-gray-300 rounded p-2"
                            />
                        </div>

                        <!-- Automatically Updated Fields -->
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

                        <div v-if="state.fees.length > 0" class="overflow-x-auto">
                            <div class="max-h-60 overflow-y-auto">
                                <table class="min-w-full bg-white border border-gray-300 mb-4">
                                    <thead>
                                        <tr>
                                            <th class="px-4 py-2 border text-left">Select</th>
                                            <th class="px-4 py-2 border text-left">Fee Description</th>
                                            <th class="px-4 py-2 border text-left">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="fee in state.fees" :key="fee.id">
                                            <td class="px-4 py-2 border text-left">
                                                <input
                                    type="checkbox"
                                    :value="fee.id"
                                    :checked="customerData[selectedCheckCustomerId].selectedFees.includes(fee.id)"
                                    @change="updateSelectedFees(fee.id, $event.target.checked)"/>
                                            </td>
                                            <td class="px-4 py-2 border">{{ fee.description }}</td>
                                            <td class="px-4 py-2 border">{{ fee.amount }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700">Total Fees</label>
                            <input
                                v-model="customerData[selectedCheckCustomerId].totalFees"
                                step="0.01"
                                type="number"
                                class="w-full border border-gray-300 rounded p-2"/>
                        </div>

                        <div class="text-center mt-4">
    <button @click.prevent="submitForm" class="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
    </button>
    <button @click.prevent="cancelForm" class="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2">
        Cancel
    </button>
</div>

                    </div>

                </div>
            </div>
        </main>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { UserService } from '~/models/User';
import { apiService } from '~/routes/api/API';

const state = ref({
    groups: [],
    customers: [],
    factorRates: [],
    paymentFrequencies: [],
    durations: [],
    fees: [],
});

const totalFees = ref(0);


const selectedGroupId = ref(null);
const selectedCustomerId = ref(null); // Currently selected customer
const selectedCheckCustomerId = ref(null);
// This will hold form data for each customer by their ID
const customerData = reactive({});

onMounted(() => {
    fetchGroups();
    fetchFactorRate();
    fetchPaymentFrequencies();
    fetchDurations();
    fetchFees();
});

const fetchFees = async () => {
    try {
        const response = await apiService.getFeeNoAuth({});
        state.value.fees = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
}

const fetchGroups = async () => {
    try {
        const response = await apiService.getNoAuth({}, "customer_group");
        state.value.groups = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchCustomers = async () => {
    selectedCustomerId.value = null;
    customerData.value = {}; // Clear previous customer data
    if (selectedGroupId.value) {
        try {
            // Optionally, you can also initialize customerData for new customers
            state.value.customers.forEach(customer => {
                customerData[customer.id] = {
                    loanApplicationNo: generateLoanApplicationNo(),
                    customerId: selectedCustomerId.value,
                    loanAmount: '',
                    isSelected: false,
                    factorRate: '',
                    interestAmount: '',
                    amountPaid: '',
                    releaseSchedule: '',
                    paymentFrequency: '',
                    duration: '',
                    comment: '',
                    selectedFees: [],
                };
            });
            
            const response = await apiService.getCustomerByGroupId({}, selectedGroupId.value);
            state.value.customers = response.data;


        } catch (error) {
            toast.error(`${error}`, { autoClose: 5000 });
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

// Fetch duration values from the server
const fetchDurations = async () => {
    try {
        const response = await apiService.getPaymentdurationNoAuth({});
        state.value.durations = response.data;
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

// Fetch the fee library and filter only active fees
const fetchFeeLibrary = async () => {
  try {
    const response = await apiService.getFeeNoAuth({});
    state.value.fees = response.data; // Show only active fees
  } catch (error) {
    toast.error(`${error}`, { autoClose: 5000 });
  }
};

const loadCustomerData = (customerId) => {

    selectedCheckCustomerId.value = customerId;
    try {
        if (!customerData[customerId]) {
        customerData[customerId] = {
            loanApplicationNo: generateLoanApplicationNo(),
            customerId: customerId,
            isSelected: customerData[customerId].isSelected,
            loanAmount: '',
            factorRate: '',
            interestAmount: '',
            amountPaid: '',
            releaseSchedule: '',
            paymentFrequency: '',
            duration: '',
            comment: '',
            selectedFees: [],  // Initialize selectedFees
        };
        console.log(customerData);
    } else {
        // Ensure selectedFees is initialized
        if (!customerData[customerId].selectedFees) {
            customerData[customerId].selectedFees = [];
        }
    }
    } catch (error) {
        toast.error(`Please select first the customer!`, { autoClose: 5000 });
    }
};

const loadCustomerDatas = (customerId, isChecked) => {

    selectedCheckCustomerId.value = customerId;
    if (!customerData[customerId]) {
        customerData[customerId] = {
            loanApplicationNo: generateLoanApplicationNo(),
            customerId: customerId,
            isSelected: isChecked,
            loanAmount: '',
            factorRate: '',
            interestAmount: '',
            amountPaid: '',
            releaseSchedule: '',
            paymentFrequency: '',
            duration: '',
            comment: '',
            selectedFees: [],  // Initialize selectedFees
        };
        console.log(customerData);
    } else {
        // Ensure selectedFees is initialized
        customerData[customerId].isSelected = isChecked;
        if (!customerData[customerId].selectedFees) {
            customerData[customerId].selectedFees = [];
        }
    }
};

// Watch loanAmount and factorRate to recalculate interest and amount paid
const calculateInterestAndAmountPaid = (loanAmount, factorRate) => {
    if (loanAmount && factorRate) {
        const interestAmount = loanAmount * (factorRate / 100); // Simple interest calculation
        const amountPaid = loanAmount + interestAmount;
        return { interestAmount, amountPaid };
    }
    return { interestAmount: 0, amountPaid: 0 };
};

// Watch the loanAmount field to update interestAmount and amountPaid
const updateLoanAmount = (customerId) => {
    const customer = customerData[customerId];
    if (customer.loanAmount && customer.factorRateValue) {
        const { interestAmount, amountPaid } = calculateInterestAndAmountPaid(
            customer.loanAmount,
            customer.factorRateValue // Use factorRateValue for calculation
        );
        customer.interestAmount = interestAmount;
        customer.amountPaid = amountPaid;
    }
};


// Watch the factor rate change to trigger recalculation
const onFactorRateChange = async (selectedFactorRateId) => {
    const factorRate = state.value.factorRates.find(rate => rate.id === selectedFactorRateId);
    if (factorRate && selectedCheckCustomerId.value) {
        const customer = customerData[selectedCheckCustomerId.value];

        // Store the selected factorRate ID
        customer.factorRate = factorRate.id; // This is the change
        customer.factorRateValue = factorRate.value; // This is for calculation purposes only

        // Auto-populate payment frequency and duration
        customer.paymentFrequency = factorRate.payment_frequency_id || '';
        customer.duration = factorRate.payment_duration_id || '';

        // Recalculate interest and amount paid
        updateLoanAmount(selectedCheckCustomerId.value);
    }
};


// Watch for loanAmount input changes
watch(() => customerData[selectedCustomerId.value]?.factorRate, (newFactorRate) => {
    onFactorRateChange(newFactorRate);
});

function generateLoanApplicationNo(length = 8) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';

  // Create a random string
  for (let i = 0; i < length; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Generate a random number (e.g., between 1000 and 9999)
  const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

  // Combine random string and number
  return `LN-${randomString}${randomNumber}`;
}


// Handle form submission, including selected fees
const submitForm = async () => {
    debugger;
    const allCustomerData = []; // Initialize an empty array to hold customer data

    // Convert customerData object into an array
    const customerDataArray = Object.values(customerData);

    // Loop through the customer data array using a simple for loop
    for (let i = 0; i < customerDataArray.length; i++) {
        const customer = customerDataArray[i];

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
                document_status_code: 'PENDING', // Means pending
                fees: customer.selectedFees, // Include selected fees
                coMaker: customer.coMaker,
            });
        }
    }

    // Check if there is any customer data to submit
    if (allCustomerData.length > 0) {
        try {
            debugger;
            // Send the data to the Laravel API
            const response = await apiService.createLoanApplication({
                allCustomerData, // Use allCustomerData here
            });

            if (response) {
                toast.success('Transaction submitted successfully.', { autoClose: 5000 });
                navigateTo('/loan_applications');
            }
        } catch (error) {
            toast.error(`Submission failed: ${`${error}`}`, { autoClose: 5000 });
        }
    } else {
        toast.error('No customer data to submit.', { autoClose: 5000 });
    }
};


async function updateSelectedFees(feeId, isSelected) {
    // Ensure selectedFees is initialized for the current customer
    if (!customerData[selectedCheckCustomerId.value]) {
        return;
    }

    const selectedFees = customerData[selectedCheckCustomerId.value].selectedFees;

    if (isSelected) {
        // Add fee ID to selectedFees array
        if (!selectedFees.includes(feeId)) {
            selectedFees.push(feeId);
        }
    } else {
        // Remove fee ID from selectedFees array
        const index = selectedFees.indexOf(feeId);
        if (index > -1) {
            selectedFees.splice(index, 1);
        }
    }

    // Optionally, you can calculate the total amount here if needed
    calculateTotalFees();
}

// Calculate total fees for the selected customer
function calculateTotalFees() {
    const customer = customerData[selectedCheckCustomerId.value];
    if (customer && customer.selectedFees.length > 0) {
        let total = 0;

        for (let i = 0; i < customer.selectedFees.length; i++) {
            const feeId = customer.selectedFees[i];
            const fee = state.value.fees.find(f => f.id === feeId);
            if (fee) {
                total += parseFloat(fee.amount); // Ensure we are adding numbers, not concatenating strings
            }
        }

        customer.totalFees = parseFloat(total).toFixed(8); // Assign the total fees to the customer object

    } else {
        customer.totalFees = 0; // Reset total if no fees are selected
    }
}

function onCheckboxChange(customerId, isChecked): any {
        if (isChecked) {
            console.log('Checkbox checked for customer ID:', customerId);
            loadCustomerDatas(customerId, isChecked);
            console.log(customerData);
            // You can also handle any additional logic for when the checkbox is checked
        } else {
            console.log('Checkbox unchecked for customer ID:', customerId);
            loadCustomerDatas(customerId, isChecked);
            // Handle logic for when the checkbox is unchecked
        }
    }

    // // Computed property to filter out the current customer from the co-makers list
    // const availableCoMakers = computed(() =>
    // state.value.customers.filter((customer) => customer.id !== selectedCheckCustomerId.value)
    // );
</script>
