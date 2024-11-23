<template>
    <NuxtLayout name="admin">
        <div class="bg-gray-100 h-screen flex items-center justify-center p-6">
            <form @submit.prevent="submitForm" class="w-full max-w-lg bg-white p-8 rounded-md shadow-md">
                <div class="container mx-auto p-4">
                    <div class="border-b border-gray-900/10 pb-12">
                        <h1 class="text-xl font-bold leading-7 text-gray-900">Loan Release</h1>
                        <div class="mt-10 grid grid-rows-1 gap-x-6 gap-y-8 sm:grid-rows-3">

                            <div class="sm:col-span-2">
                                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Date Time Prepared <span class="text-red-600">*</span></label>
                                <div class="mt-2">
                                <input
                                v-model="form.datetime_prepared"     
                                type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Passbook Number <span class="text-red-600">*</span></label>
                                <div class="mt-2">
                                <input
                                v-model="form.passbook_number"     
                                type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Prepared by <span class="text-red-600">*</span></label>
                                <div class="mt-2">
                                <input
                                v-model="form.prepared_by_id"     
                                type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Date Time First Due <span class="text-red-600">*</span></label>
                                <div class="mt-2">
                                <input
                                v-model="form.datetime_first_due"     
                                type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block text-sm font-bold leading-6 text-gray-900">Notes <span class="text-red-600">*</span></label>
                                <div class="mt-2">
                                <input
                                v-model="form.notes"     
                                type="text"  id="description"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6" />
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
    import { loanReleaseService } from '~/models/LoanRelease'
import { PermissionService } from '~/models/Permission';
    
    


    const form = ref({
    id: loanReleaseService.id,
    datetime_prepared: loanReleaseService.datetime_prepared,
    passbook_number:loanReleaseService.passbook_number,
    prepared_by_id: loanReleaseService.prepared_by,
    datetime_first_due:loanReleaseService.datetime_firstdue,
    notes: loanReleaseService.notes,
    });

    const successMessage = ref<string | null>(null);

    // Function to handle form submission
    const submitForm = () => {
        if (form.value.notes && form.value.id) {
            console.log('Form Data:', form.value);
            create();

            form.value.id = '';
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
        datetime_prepared: form.value.datetime_prepared,
        passbook_number:form.value.passbook_number,
        prepared_by_id: form.value.prepared_by_id,
        datetime_first_due:form.value.datetime_first_due,
        notes: form.value.notes,
        };
        const response = await apiService.updateLoanRelease(params, parseInt(form.value.id));
        if (response.data) {
            toast.success("Loan Release Updated successfully!", {
                autoClose: 2000,
                });
                // Introduce a delay before navigating
                setTimeout(() => {
                    navigateTo('/loan_release');  
                }, 2000);
                // Redirect to the customer list page
        }
    } catch (error: any) {
        toast.error("Error: " + error);
    }
    }

    // Function to handle cancel action
    const cancel = () => {
    // Navigate to the libraries page or perform any other action
    navigateTo("/loan_release");
    };

onMounted(async () => {
    //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authLoanReleaseUpdate({})
    state_response.value = response.message;
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
}
finally
{
    if(state_response.value.length <= 0)
    {
        setTimeout(() => {
        navigateTo(`/loan_release`)
        }, 2000);
    }
  }
})
</script>