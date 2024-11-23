<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
        <form @submit.prevent="submitForm" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
            <div class="container mx-auto p-4">
                <div class="border-b border-gray-900/10 pb-12">
                    <h1 class="text-xl font-bold leading-7 text-gray-900">Payment Duration</h1>
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
                            <label for="valueP" class="block text-sm font-bold leading-6 text-gray-900">Number of Payments<span class="text-red-600">*</span></label>
                            <input
                            v-model="form.numOfPayments"
                            type="number"  id="valueP"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
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

            <div class="text-center mt-4 flex justify-between">
                <button @click.prevent="cancel" class="button text-white px-4 py-2 rounded">
                    Cancel
                </button>
                <button @click.prevent="submit" class="button text-gray-800 px-4 py-2 rounded">
                    Submit
                </button>
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
    import { paymentDurationService } from '~/models/PaymentDuration'
    import { PermissionService } from '~/models/Permission';




    const form = ref({
    id: paymentDurationService.id,
    numOfPayments: paymentDurationService.number_of_payments,
    description: paymentDurationService.description,
    notes: paymentDurationService.notes,
    });

    const successMessage = ref<string | null>(null);

    // Function to handle form submission
    const submitForm = () => {
        if (form.value.id && form.value.description && form.value.notes && form.value.numOfPayments) {
            console.log('Form Data:', form.value);
            create();

        // Clear the form
        form.value.id = '';
        form.value.description = '';
        form.value.numOfPayments = '';
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
        number_of_payments: form.value.numOfPayments,
        description: form.value.description,
        notes: form.value.notes,
        };
        const response = await apiService.updatePaymentduration(params, parseInt(form.value.id));
        if (response.data) {
            toast.success("Payment Duration updated successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/payment_duration');
                }, 2000);
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
    const response = await apiService.authPaymentDurationsUpdate({})
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

<style>
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
