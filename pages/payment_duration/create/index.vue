<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="createPaymentDuration"class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Create Payment Duration</h1>
                    <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-3">

                        <div class="sm:col-span-2">
                            <label for="valueP" class="block text-sm font-bold leading-6 text-gray-900">Description<span class="text-red-600">*</span></label>
                            <input  v-model="paymentDuration.description" type="text"  id="valueP "  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Number of Payments <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="paymentDuration.number_of_payments"  type="number"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input  v-model="paymentDuration.notes" type="text"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-4 flex justify-between">
            <button type="button" class="text-sm button font-bold leading-6 text-gray-900"
                @click="back">
                <a >Cancel</a>
            </button>
            <button type="submit" class="rounded-md button px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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
            navigateTo('/payment_duration');
            }
const paymentDuration = ref({
        description: '',
        number_of_payments: 0,
        notes: '',
        })

        // create user data
        const createPaymentDuration = async () => {

        try {
            const jsonObject = {
                description: paymentDuration.value.description,
                number_of_payments: paymentDuration.value.number_of_payments,
                notes: paymentDuration.value.notes,
            };
                const response =  await apiService.createPaymentduration(jsonObject);

            if(response)
            {
                toast.success("Payment Duration created successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/payment_duration');
                }, 2000);
            }

            } catch (error) {
                toast.error('Error creating Payment Duration: ' + error);
                toast.error(`${error}`, {
        autoClose: 5000,
      });
            }
        };

onMounted(async () => {
    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authPaymentDurationsCreate({})
    state_response.value = response.message;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
            navigateTo(`/payment_duration`)
            }, 2000);
    }
  }
})
</script>
