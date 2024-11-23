<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="submitForm" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Payment Frequency</h1>
                    <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-3">

                        <div class="sm:col-span-2">
                            <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Description <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input
                            v-model="form.description"
                            type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="valueP" class="block text-sm font-bold leading-6 text-gray-900">Days Interval<span class="text-red-600">*</span></label>
                            <input
                            v-model="form.daysInterval"
                            type="number"  id="valueP "  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input
                            v-model="form.notes"
                            type="text"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-bold leading-6 text-gray-900"
            @click="cancel">
                <a >Cancel</a>
            </button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Update</button>
            </div>
        </form>
    </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    import { ref } from 'vue';
    import { apiService } from '~/routes/api/API'
    import { paymentFrequencyService } from '~/models/PaymentFrequency'
    import { PermissionService } from '~/models/Permission';




    const form = ref({
    id: paymentFrequencyService.id,
    daysInterval: paymentFrequencyService.days_interval,
    description: paymentFrequencyService.description,
    notes: paymentFrequencyService.notes,
    });

    const successMessage = ref<string | null>(null);

    // Function to handle form submission
    const submitForm = () => {
        if (form.value.id && form.value.description && form.value.notes && form.value.daysInterval) {
            console.log('Form Data:', form.value);
            create();

        // Clear the form
        form.value.id = '';
        form.value.description = '';
        form.value.daysInterval = '';
        form.value.notes = '';
    } else {
        // Handle empty fields (optional)
        successMessage.value = 'Please fill in all the fields.';
    }
    };

    async function create() {
    try {
        const params = {
        id: form.value.id,
        days_interval: form.value.daysInterval,
        description: form.value.description,
        notes: form.value.notes,
        };
        const response = await apiService.updatePaymentFrequency(params, parseInt(form.value.id));
        if (response.data) {
            toast.success("Payment Frequency Updated successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/payment_frequency');
                }, 2000);
                // Redirect to the customer list page
        }
    } catch (error: any) {
        toast.error(`${error}`, {
            autoClose: 3000,
        });
    }
    }

    // Function to handle cancel action
    const cancel = () => {
    // Navigate to the libraries page or perform any other action
    navigateTo("/payment_duration");
    };

onMounted(async () => {
    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authPaymentFrequenciesUpdate({})
    state_response.value = response.message;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
            navigateTo(`/payment_frequency`)
            }, 2000);
    }
  }
})
</script>
