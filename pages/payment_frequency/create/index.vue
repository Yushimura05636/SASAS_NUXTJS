<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="createPaymentFrequency" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Create Payment Frequency</h1>
                    <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-3">

                        <div class="sm:col-span-2">
                            <label for="valueP" class="block text-sm font-bold leading-6 text-gray-900">Description<span class="text-red-600">*</span></label>
                            <input v-model="paymentFrequency.description"  type="text"  id="valueP "  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Days Interval <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="paymentFrequency.days_interval"  type="number"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="paymentFrequency.notes"  type="text"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-bold leading-6 text-gray-900"
                @click="back()">
                <a >Cancel</a>
            </button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Create</button>
            </div>
        </form>
    </div>
    </NuxtLayout>
</template>


<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref } from 'vue';

import { PermissionService } from '~/models/Permission';
import { apiService } from '~/routes/api/API';



    function back() {
        navigateTo('/payment_frequency');
        }

    const paymentFrequency = ref({
        description: '',
        days_interval: 0,
        notes: '',
        })

        // create user data
        const createPaymentFrequency = async () => {

        try {
            const jsonObject = {
                description: paymentFrequency.value.description,
                days_interval: paymentFrequency.value.days_interval,
                notes: paymentFrequency.value.notes,
            };
                const response =  await apiService.createPaymentFrequency(jsonObject);

            if(response)
            {
                toast.success("Payment Frequency created successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/payment_frequency');
                }, 2000);
                // Redirect to the customer list page
            }

            } catch (error) {
                toast.error('Error creating Payment Frequency: ' + error);
                toast.error(`${error}`, {
        autoClose: 5000,
      });
            }
        };

onMounted(async () => {
    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authPaymentFrequenciesCreate({})
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
