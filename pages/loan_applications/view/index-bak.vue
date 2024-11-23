<template>
    <NuxtLayout name="admin">
        <main>
            <div class="flex justify-center items-center bg-gray-100">
                <div class="bg-white border border-gray-300 rounded-lg p-6 shadow-md w-full">
                    <div class="text-center font-bold text-xl mb-4">Loan Application Approve Form</div>

                    <!-- Loan Amount -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Loan Amount</label>
                        <input
                            v-model="form.value.Loan_Application.amount_loan"
                            type="number"
                            class="w-full border border-gray-300 rounded p-2"
                            @input="updateLoanAmount(form.value.Loan_Application.amount_loan)"
                        />
                    </div>

                    <!-- Factor Rate -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Factor Rate</label>
                        <select v-model="form.value.Loan_Application.factor_rate" class="w-full border rounded-lg px-4 py-2" @change="onFactorRateChange(form.value.Loan_Application.factor_rate)">
                            <option v-for="factorRate in state.factorRates" :key="factorRate.id" :value="factorRate.id">
                                {{ factorRate.value }}
                            </option>
                        </select>
                    </div>

                    <!-- Interest Amount -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Interest Amount</label>
                        <input
                            v-model="form.value.Loan_Application.amount_interest"
                            type="number"
                            step="0.01"
                            class="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <!-- Amount Paid -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Amount Paid</label>
                        <input
                            v-model="form.value.Loan_Application.amount_paid"
                            type="number"
                            class="w-full border border-gray-300 rounded p-2"
                            readonly
                        />
                    </div>

                    <!-- Release Schedule -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Release Schedule</label>
                        <input
                            v-model="form.value.Loan_Application.datetime_target_release"
                            type="date"
                            class="w-full border border-gray-300 rounded p-2"
                        />
                    </div>

                    <!-- Payment Frequency -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Payment Frequency</label>
                        <select v-model="form.value.Loan_Application.payment_frequency_id" class="w-full border rounded-lg px-4 py-2">
                            <option v-for="frequency in state.paymentFrequencies" :key="frequency.id" :value="frequency.id">
                                {{ frequency.description }}
                            </option>
                        </select>
                    </div>

                    <!-- Duration -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Duration</label>
                        <select v-model="form.value.Loan_Application.payment_duration_id" class="w-full border rounded-lg px-4 py-2">
                            <option v-for="duration in state.durations" :key="duration.id" :value="duration.id">
                                {{ duration.description }}
                            </option>
                        </select>
                    </div>

                    <!-- Comment -->
                    <div class="mb-4">
                        <label class="block text-gray-700">Comment</label>
                        <textarea
                            v-model="form.value.Loan_Application.notes"
                            class="w-full border border-gray-300 rounded p-2"
                        ></textarea>
                    </div>

                    <!-- Fees Section -->
<div v-if="state.fees.length > 0" class="max-h-60 overflow-y-auto">
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
                    <input disabled
                        type="checkbox"
                        :value="fee.id"
                        :checked="isFeeSelected(fee.id)"
                        @change="updateSelectedFees(fee.id, $event.target.checked)"
                    />
                </td>
                <td class="px-4 py-2 border">{{ fee.description }}</td>
                <td class="px-4 py-2 border">{{ fee.amount }}</td>
            </tr>
        </tbody>
    </table>
</div>

                    <!-- Total Fees -->
<div class="mb-4">
    <label class="block text-gray-700">Total Fees</label>
    <input
        :value="calculateTotalFees()"
        type="number"
        class="w-full border border-gray-300 rounded p-2"
        readonly
    />
</div>

                    <!-- CoMaker Section -->
    <div class="mb-4">
        <label class="block text-gray-700">Co-Maker Name</label>
        <select
            v-model="form.value.coMaker.id"
            class="w-full border rounded-lg px-4 py-2"
        >
            <option value="" disabled>Select a Co-Maker</option>

            <option disabled v-for="comaker in state.coMakers" :key="comaker.customer.id" :value="comaker.customer.id">
                {{ comaker.personality.family_name}} {{ comaker.personality.first_name }} {{ comaker.personality.middle_name }}
            </option>
        </select>
    </div>

    <div class="flex justify-end mt-4">
    <button @click="submitForm" class="bg-blue-500 text-white px-4 py-2 rounded">
        Approve
    </button>
    <button @click="cancelForm" class="mx-2 bg-red-500 text-white px-4 py-2 rounded">
        cancel
    </button>
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
import { apiService } from '~/routes/api/API';
import { loanApplicationService } from '~/models/LoanApplication';

const feeForm = ref({
    feeForm: [],
})

const state = ref({
    factorRates: [],
    paymentFrequencies: [],
    durations: [],
    fees: [],
    userLogged: [],
    coMakers: {},
});

const form = reactive({
    value: {
        Loan_Application: {}, // Loan application details
        Fees: [], // Fees for the loan
        coMaker: {} // Co-maker information
    }
});

onMounted(() => {
    fetchFactorRate();
    fetchPaymentFrequencies();
    fetchDurations();
    fetchCoMakers();
    fetchFees();
    fetchLoanApplication();
    fetchUserLogged();
});

const fetchLoanApplication = async () => {
    try {
        const response = await apiService.getLoanApplicationById({}, loanApplicationService.id);

        const comakerData = await apiService.getLoanApplicationCoMakerByIdNoAUTH({}, response.data.loan_applications.id);
        if(comakerData.data.length > 0)
        {
            const comakerRealData = await apiService.getCustomerByIdNoAuth({}, comakerData.data.customer_id);
            form.value.coMaker = comakerRealData.personality;

            //set id
            form.value.coMaker.id = comakerRealData.customer.id
        }
        form.value.Loan_Application = response.data.loan_applications;
        feeForm.value.feeForm = response.data.fees;

        //set id
        form.value.Loan_Application.factor_rate = parseInt(response.data.loan_applications.factor_rate);


    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

const fetchFees = async () => {
    try {
        const feeData = await apiService.getLoanApplicationById({}, loanApplicationService.id);
        const response = await apiService.getFeeNoAuth({});
        state.value.fees = response.data;

        // Ensure form.value.Fees is initialized as an array
        if (!Array.isArray(form.value.Fees)) {
            form.value.Fees = [];
        }

        // Debug log the feeForm array
        console.log('Fee Form:', feeData.data.fees);

        if (Array.isArray(feeForm.value.feeForm)) {
            // Debug log the feeForm array
        console.log('Fee Form:', feeData.data.fees);
            for (let i = 0; i < feeData.data.fees.length; i++) {
                // Debug log the feeForm array
        console.log('Fee Form:', form.value.Fees.length);
                const feeItem = feeData.data.fees[i];

                for (let j = 0; j < state.value.fees.length; j++) {
                    const fee = state.value.fees[j];

                    if (fee.id === feeItem.fee_id) {
                        if (!feeData.data.fees.some((existingFee: any) => existingFee.id === fee.id)) {
                            form.value.Fees.push(fee);
                        }
                        break; // Exit inner loop once a match is found
                    }
                }
            }
            feeForm.value.feeForm = feeData.data.fees;
        }

    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
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


// Calculate total fees for the selected customer
function calculateTotalFees() {
    console.log();

    if (feeForm.value.feeForm.length > 0) {
        let total = 0;
        for (let i = 0; i < feeForm.value.feeForm.length; i++) {
            const feeId = feeForm.value.feeForm[i];
            let fee = null;
for (let i = 0; i < state.value.fees.length; i++) {
  if (state.value.fees[i].id === feeId.fee_id) {
    fee = state.value.fees[i];
    break;  // Exit the loop once the matching fee is found
  }
}
            if (fee) {
                total += parseFloat(fee.amount); // Ensure we are adding numbers, not concatenating strings
            }
        }

        return parseFloat(total).toFixed(8); // Assign the total fees to the customer object

    } else {
        return 0; // Reset total if no fees are selected
    }
}

// // Calculate total fees
// const calculateTotalFees = () => {
//     return form.value.Fees.reduce((total, fee) => {
//         // Add the fee amount to the total if it has a valid amount property
//         total += fee.amount || 0;
//         return total;
//     }, 0);
// };

const cancelForm = () => {
    navigateTo('/loan_applications/');
}


const fetchUserLogged = async () => {
    try {
        const response = await apiService.getUserLogged({});
        state.value.userLogged = response.data;
        console.log("Data: ",state.value.userLogged.id);
    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};


const submitForm = async () => {
    if (form.value.Loan_Application.amount_loan && form.value.Loan_Application.factor_rate && form.value.Loan_Application.amount_interest && form.value.Loan_Application.amount_paid) {
        try {
            const params = {
                document_status_code: form.value.Loan_Application.document_status_code,
                loan_application_no: form.value.Loan_Application.loan_application_no,
                group_id: form.value.Loan_Application.group_id,
                customer_id: form.value.Loan_Application.customer_id,
                id: form.value.Loan_Application.id, // Include the ID to identify the loan application being updated
                amount_loan: form.value.Loan_Application.amount_loan,
                factor_rate: form.value.Loan_Application.factor_rate,
                amount_interest: form.value.Loan_Application.amount_interest,
                amount_paid: form.value.Loan_Application.amount_paid,
                datetime_target_release: form.value.Loan_Application.datetime_target_release,
                payment_frequency_id: form.value.Loan_Application.payment_frequency_id,
                payment_duration_id: form.value.Loan_Application.payment_duration_id,
                notes: form.value.Loan_Application.notes,
                fees: feeForm.value.feeForm,
                co_maker_id: form.value.coMaker.id,
                last_modified_by_id: null,
                prepared_by_id: form.value.Loan_Application.prepared_by_id,
            }

            console.log(params);
            await apiService.authLoanApplicationsApprove(params, params.id); // Ensure this matches your API method

            toast.success('Loan Application updated successfully!', { autoClose: 5000 });

            //get the necessary datas
            loanApplicationService.loan_application_no = form.value.Loan_Application.loan_application_no;
            navigateTo('/loan_applications/view/receipt')
        } catch (error) {

            toast.error(`${error}`, { autoClose: 5000 });
        }
    } else {
        toast.error('Please fill in all required fields', { autoClose: 5000 });
    }
};


// Function to check if the fee is selected
const isFeeSelected = (feeId: number) => {
    return form.value.Fees.some((selectedFee: any) => selectedFee.id === feeId);
};

// Function to update selected fees
const updateSelectedFees = (feeId: number, isChecked: boolean) => {
    if (isChecked) {
        const selectedFee = state.value.fees.find((fee: any) => fee.id === feeId);
        if (selectedFee) {
            form.value.Fees.push(selectedFee); // Add the entire fee object to Fees array
            feeForm.value.feeForm.push(selectedFee)
        }
    } else {
        const index = form.value.Fees.findIndex((fee: any) => fee.id === feeId);
        if (index !== -1) {
            form.value.Fees.splice(index, 1); // Remove the fee from the array
            feeForm.value.feeForm.splice(index, 1)
        }
    }

    calculateTotalFees();
};

const updateLoanAmount = (amountLoan: number) => {
    if (amountLoan && form.value.Loan_Application.factor_rate) {
        // Example: calculate interest amount based on the factor rate
        form.value.Loan_Application.amount_interest = amountLoan * form.value.Loan_Application.factor_rate;

        // Calculate amount paid (you can adjust the logic based on your requirements)
        form.value.Loan_Application.amount_paid = amountLoan + form.value.Loan_Application.amount_interest;
    }
};

// Fetch Co-Makers
const fetchCoMakers = async () => {
    try {
        const response = await apiService.getCustomers({});
        state.value.coMakers = response.data; // Store fetched Co-Makers in state

    } catch (error) {
        toast.error(`${error}`, { autoClose: 5000 });
    }
};

</script>

<style scoped>
/* Add custom styles if needed */
</style>
