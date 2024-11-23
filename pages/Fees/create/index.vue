<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="createPaymentFrequency" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Create Fee</h1>
                    <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-3">

                        <div class="sm:col-span-2">
                            <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Description<span class="text-red-600">*</span></label>
                            <input v-model="Fee.description" type="text"  id="description "  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-l sm:leading-6 pl-2" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="amount" class="block text-sm font-bold leading-6 text-gray-900">Amount <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="Fee.amount" type="number"  id="amount"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-l sm:leading-6 pl-2" />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="isActive" class="block text-sm font-bold leading-6 text-gray-900">Is Active <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="Fee.isactive" type="text"  id="isActive"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-l sm:leading-6 pl-2" />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes<span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="Fee.notes" type="text"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-l sm:leading-6 pl-2" />
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

import { apiService } from '~/routes/api/API';

    function back() {
        navigateTo('/Fees');
        }

    const Fee = ref({
        description: '',
        amount: 0,
        isactive: 1,
        notes: '',
        })

        // create user data
        const createPaymentFrequency = async () => {

        try {
            const jsonObject = {
                description: Fee.value.description,
                amount: Fee.value.amount,
                isactive: Fee.value.isactive,
                notes: Fee.value.notes,
            };
                const response =  await apiService.createFee(jsonObject);
                console.log("test" + jsonObject);

            if(response)
            {
                toast.success("Fee rate created successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/Fees');
                }, 2000);
                 // Redirect to the customer list page
            }

            } catch (error) {
                toast.error('Error creating Fee: ' + error);
                toast.error(`${error}`, {
        autoClose: 5000,
      });
            }
        };
onMounted(async () => {
    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authFeesCreate({})
    state_response.value = response.message;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
            navigateTo(`/fees`)
            }, 2000);
    }
  }
})
</script>
