<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="createFactorRate" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Factor Rate</h1>
                    <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-6">

                        <div class="sm:col-span-2">
                            <label for="payment_frequency" class="block text-sm font-bold leading-6 text-gray-900">Payment Frequency <span class="text-red-600">*</span></label>
                            <select v-model="factorRate.payment_frequency_id" id="payment_frequency" v-if="!state.isTableLoading" class="block w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-1.5 text-black">
                                <option v-for="frequency in state.frequency" :key="frequency.id"  :value="frequency.id">
                                    {{ frequency.description }}
                                </option>
                            </select>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="payment_duration" class="block text-sm font-bold leading-6 text-gray-900">Payment Duration <span class="text-red-600">*</span></label>
                            <select v-model="factorRate.payment_duration_id" id="payment_duration" v-if="!state.isTableLoading" class="block w-full h-10 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-1.5">
                                <option  v-for="duration in state.duration" :key="duration.id"  :value="duration.id" >
                                    {{ duration.description }}
                                </option>
                            </select>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Description <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="factorRate.description"  type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>


                        <div class="sm:col-span-2">
                            <label for="valueP" class="block text-sm font-bold leading-6 text-gray-900">Value<span class="text-red-600">*</span></label>
                            <input v-model="factorRate.valueP"   step="0.01"  type="number"  id="valueP "  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                        </div>

                        <div class="sm:col-span-2">
                            <label for="notes" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                            <div class="mt-2">
                            <input v-model="factorRate.notes"  type="text"  id="notes"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-insetfocus:ring-indigo-600 sm:text-xl sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm font-bold leading-6 text-gray-900"
                @click="back">
                <a >Cancel</a>
            </button>
            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
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

    const state = reactive({
    frequency: [],
    duration: [],
    error: "error",
    isTableLoading: true,
    });
        // Fetch empID and document data from API
    async function fetchFreqAndDura() {
        try {
            const params = {};
            const frequency = await apiService.getPaymentFrequencyNoAuth({})
            const duration = await apiService.getPaymentdurationNoAuth({})

            console.log('payment freq' + frequency);
            console.log('payment duration' + duration);
            // state.frequency = duration
            if (frequency && frequency.data ||duration && duration.data ) {
            state.frequency = frequency.data;
            state.duration = duration.data;

            console.log(frequency);
            console.log(duration);
            } else {
            state.error = 'Unexpected response format.';
                }
            } catch (error) {
                state.error = 'Failed to fetch roles. Please try again.';
            } finally {
                state.isTableLoading = false;
            }
        }
onMounted(async () => {

    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authFactorRatesCreate({})
    state_response.value = response.message;
    fetchFreqAndDura();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
            navigateTo(`/factor_rate`)
            }, 2000);
    }
  }

});

const factorRate = ref({
    payment_frequency_id: 0,
    payment_duration_id: 0,
    description: '',
    valueP: 0,
    notes: '',
    })

    // create user data
    const createFactorRate = async () => {
    try {
        const jsonObject = {
            payment_frequency_id: parseInt(factorRate.value.payment_frequency_id?.toString()),
            payment_duration_id: parseInt(factorRate.value.payment_duration_id?.toString()),
            description: factorRate.value.description,
            value: parseFloat(factorRate.value.valueP).toString(),
            notes: factorRate.value.notes,
        };

        const response =  await apiService.createFactorRate(jsonObject);

        if(response)
        {
            toast.success("Factor rate created successfully!", {
            autoClose: 2000,
            });
            // Introduce a delay before navigating
            setTimeout(() => {
                navigateTo('/factor_rate');
            }, 2000);
        }

        } catch (error) {
            toast.error('Error creating Factor: ' + error);
            toast.error(`${error}`, {
        autoClose: 5000,
        });
        }
    };

    function back() {
    navigateTo('/factor_rate');
    }
</script>
