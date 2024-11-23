<template>
    <NuxtLayout name="admin">
      <div class="bg-white p-4 md:p-8">
        <h2 class="text-gray-800 text-xl font-bold mb-4">View Customer Details</h2>

        <form>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Personality Fields -->
            <div>
              <label for="firstName" class="block text-gray-700">First Name</label>
              <input v-model="personality.first_name" type="text" id="firstName" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="lastName" class="block text-gray-700">Last Name</label>
              <input v-model="personality.family_name" type="text" id="lastName" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="middleName" class="block text-gray-700">Middle Name</label>
              <input v-model="personality.middle_name" type="text" id="middleName" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="email" class="block text-gray-700">Email</label>
              <input v-model="personality.email_address" type="email" id="email" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="telephone" class="block text-gray-700">Telephone#</label>
              <input v-model="personality.telephone_no" type="text" id="telephone" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="birthday" class="block text-gray-700">Birthday</label>
              <input v-model="personality.birthday" type="date" id="birthday" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="gender" class="block text-gray-700">Gender</label>
              <select v-model="personality.gender_code" id="gender" class="w-full border rounded-lg px-4 py-2" disabled>
                <option value="0">Select</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>

            <div>
              <label for="civilStatus" class="block text-gray-700">Civil Status</label>
              <select v-model="personality.civil_status" id="civilStatus" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="civil_status in state.civil_status" :key="civil_status.id" :value="civil_status.id">
                  {{ civil_status.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="houseStreet" class="block text-gray-700">House Street</label>
              <input v-model="personality.house_street" type="text" id="houseStreet" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="Cellphone No" class="block text-gray-700">Cellphone No</label>
              <input v-model="personality.cellphone_no" type="text" id="cellphoneNo" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="purokZone" class="block text-gray-700">Purok Zone</label>
              <input v-model="personality.purok_zone" type="text" id="purokZone" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="Postal Code" class="block text-gray-700">Postal Code</label>
              <input v-model="personality.postal_code" type="text" id="postalCode" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <!-- Additional Fields -->
            <div>
              <label for="barangayId" class="block text-gray-700">Barangay</label>
              <select v-model="personality.barangay_id" id="barangayId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="barangay in state.barangays" :key="barangay.id" :value="barangay.id">
                  {{ barangay.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="cityId" class="block text-gray-700">City</label>
              <select v-model="personality.city_id" id="cityId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="city in state.cities" :key="city.id" :value="city.id">
                  {{ city.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="countryId" class="block text-gray-700">Country</label>
              <select v-model="personality.country_id" id="countryId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="country in state.countries" :key="country.id" :value="country.id">
                  {{ country.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="provinceId" class="block text-gray-700">Province</label>
              <select v-model="personality.province_id" id="provinceId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="province in state.provinces" :key="province.id" :value="province.id">
                  {{ province.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="creditStatusId" class="block text-gray-700">Credit Status</label>
              <select v-model="personality.credit_status_id" id="creditStatusId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="creditStatus in state.creditStatuses" :key="creditStatus.id" :value="creditStatus.id">
                  {{ creditStatus.description }}
                </option>
              </select>
            </div>

            <!-- Customer Fields -->
            <div>
              <label for="groupId" class="block text-gray-700">Group Name</label>
              <select v-model="customer.group_id" id="groupId" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="groups in state.groups" :key="groups.id" :value="groups.id">
                  {{ groups.description }}
                </option>
              </select>
            </div>

            <div>
              <label for="passbookNo" class="block text-gray-700">Passbook No</label>
              <input v-model="customer.passbook_no" type="number" id="passbookNo" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>

            <div>
              <label for="loanCount" class="block text-gray-700">Loan Count</label>
              <select v-model="customer.loan_count" id="loanCount" class="w-full border rounded-lg px-4 py-2" disabled>
                <option v-for="groups in state.loan_count" :key="groups.id" :value="groups.id">
                  {{ groups.loan_count }}
                </option>
              </select>
            </div>

            <div>
              <label for="dateTimeRegistered" class="block text-gray-700">Date Time Registered</label>
              <input v-model="personality.datetime_registered" type="date" id="dateTimeRegistered" class="w-full border rounded-lg px-4 py-2" readonly />
            </div>
          </div>

          <!-- Select Requirements Table -->
          <div class="mt-4 overflow-auto max-h-[300px]">
            <h3 class="text-gray-800 text-lg font-bold mb-2">Select Requirements</h3>
            <table class="min-w-full table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2">Select</th>
                  <th class="px-4 py-2">Description</th>
                  <th class="px-4 py-2">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="requirement in requirements" :key="requirement.id">
                  <td class="px-4 py-2">
                    <input
                      type="checkbox"
                      :value="requirement.id"
                      v-model="selectedRequirements"
                      disabled
                      class="form-checkbox h-5 w-5 text-green-600"
                    />
                  </td>
                  <td class="px-4 py-2">
                    <span class="text-gray-700">{{ requirement.description }}</span>
                  </td>
                  <td class="px-4 py-2">
                    <input
                      type="date"
                      v-model="requirement.expiry_date"
                      class="border border-gray-300 rounded-md p-1"
                      readonly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>

        <div class="mt-4 flex justify-end">
          <button type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500" @click="updateCustomerApprove('Approved')">
            Approve
          </button>
          <button type="button" class="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500" @click="updateCustomerReject('Reject')">
            Reject
          </button>
        </div>
      </div>
    </NuxtLayout>
  </template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from 'vue';
import { CustomersService } from '~/models/Customer';
import { apiService } from '~/routes/api/API';

const requirements = ref({});
const selectedRequirements = ref([]);

const personality = ref({
first_name: '',
family_name: '',
middle_name: '',
email_address: '',
telephone_no: '',
birthday: '',
gender_code: '',
civil_status: '',
house_street: '',
cellphone_no: '',
purok_zone: '',
postal_code: '',
barangay_id: '',
city_id: '',
country_id: '',
province_id: '',
credit_status_id: '',
datetime_registered: '',
name_type: '2', //for customer
personality_status_code: '2',
notes: '',
});

const customer = ref({
group_id: '',
passbook_no: '',
loan_count: 0,
personality_id: 0,
});

const state = ref({
barangays: [],
civil_status: [],
cities: [],
countries: [],
provinces: [],
creditStatuses: [],
groups: [],
personality_status_code: [],
loan_count: [],
requirements: [],
isTableLoading: false,
});


const fetchBarangays = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "barangay");

    state.value.barangays = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchCivilStatus = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "civil_status");

    state.value.civil_status = response.data;
    console.log("Civil status data:", response.data);

} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchCities = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "city");

    state.value.cities = response.data;

} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchCountries = async () => {
try {
    const response = await apiService.getNoAuth({}, "country");

    state.value.countries = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchProvinces = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "province");

    state.value.provinces = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchCreditStatuses = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "credit_status");

    state.value.creditStatuses = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchGroups = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "customer_group");

    state.value.groups = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchPersonalityStatusCode = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getNoAuth({}, "personality_status_map");

    state.value.personality_status_code = response.data;
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

const fetchLoanCount = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getLoanCountNoAuth({});

    state.value.loan_count = response.data;

} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
};

onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authCustomersView({})
    state_response.value = response.message;
    await Promise.all([
        fetchBarangays(),
        fetchCities(),
        fetchCountries(),
        fetchProvinces(),
        fetchCreditStatuses(),
        fetchGroups(),
        fetchPersonalityStatusCode(),
        fetchLoanCount(),
        fetchCustomer(),
        fetchCivilStatus(),
        fetchActiveRequirements(),
    ]);
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/customers`)
          }, 2000);
    }
  }

});

const fetchCustomer = async () => {
try {
    const customerId = CustomersService.id;
;
// Check if customerId is defined and is a valid number
if (!customerId || isNaN(Number(customerId))) {
    toast.error('Invalid Id!', {
        autoClose: 5000,
    })
    navigateTo('/customers'); // Redirect to the customer list page or show an error
    return;
} // Assuming you pass the ID in the route
const response = await apiService.getCustomerByIdNoAuth({},customerId);
; // Fetch customer data
Object.assign(customer.value, response.customer);
Object.assign(personality.value, response.personality) // Merge response data into customer
} catch (error) {
    toast.error(`${error}`, {
    autoClose: 5000,
    })
}
}

   // Watching selectedRequirements for changes
watch(selectedRequirements, (newSelected) => {
    // // Check for expiry dates in selected requirements
    // const hasMissingExpiryDate = newSelected.some(requirementId => {
    //     const requirement = requirements.value.find(req => req.id === requirementId);
    //     return requirement && !requirement.expiry_date;
    // });

    // if (hasMissingExpiryDate) {
    //     toast.info("Please select an expiry date for each selected requirement.");
    //     requirementsPrompt.value = "Input expiry date for all selected requirements before proceeding.";
    // } else {
    //     requirementsPrompt.value = ""; // Clear prompt if all dates are filled
    // }
});

const requirementsPrompt = ref('');

const updateCustomerReject = async (action: 'Rejected') => {
  try {
    personality.value.personality_status_code = action
    const customerId = CustomersService.id;
    const jsonObject = {
      customer: {
              group_id: customer.value.group_id,
              passbook_no: customer.value.passbook_no,
              loan_count: customer.value.loan_count,
              personality_id: customer.value.personality_id,
              personality_status_description: 'Reject',
              credit_status_description: 'Inactive',
      },
    }

    const response = await apiService.updateCustomerReject(jsonObject, customerId)
  } catch (error) {
    toast.error(`${error}`, {autoClose: 3000})
  }
  finally
  {
    setTimeout(() => {
      navigateTo('/customers');
    }, 3000);
  }
}

const updateCustomerApprove = async (action: 'Approved') => {
try {

    if (selectedRequirements.value.length < 5) {
        toast.error("Please select at least 5 document requirement.");
        requirementsPrompt.value = `Select atleast 5 requirement before proceeding.`;
        return;
    }


    personality.value.personality_status_code = action
    const customerId = CustomersService.id;
    const jsonObject = {
    customer: {
            group_id: customer.value.group_id,
            passbook_no: customer.value.passbook_no,
            loan_count: customer.value.loan_count,
            personality_id: customer.value.personality_id,
        },
        personality: {
            datetime_registered: personality.value.datetime_registered,
            family_name: personality.value.family_name, // Get from personality ref
            middle_name: personality.value.middle_name, // Assuming this remains unchanged
            first_name: personality.value.first_name, // Get from personality ref
            birthday: personality.value.birthday, // Get from personality ref
            civil_status: personality.value.civil_status, // Get from personality ref
            gender_code: personality.value.gender_code, // Get from personality ref
            house_street: personality.value.house_street, // Get from personality ref
            purok_zone: personality.value.purok_zone, // Get from personality ref
            postal_code: personality.value.postal_code, // Get from personality ref
            telephone_no: personality.value.telephone_no, // Get from personality ref
            email_address: personality.value.email_address, // Get from personality ref
            cellphone_no: personality.value.cellphone_no, // Get from personality ref
            name_type_code: personality.value.name_type, // Assuming this remains unchanged
            personality_status_code: parseInt(personality.value.personality_status_code) , // Get from personality ref
            barangay_id: personality.value.barangay_id, // Get from personality ref
            city_id: personality.value.city_id, // Get from personality ref
            country_id: personality.value.country_id, // Get from personality ref
            province_id: personality.value.province_id, // Get from personality ref
            credit_status_id: personality.value.credit_status_id, // Get from personality ref
            notes: personality.value.notes, // Get from personality ref, optional
        },
        requirements: state.value.requirements,
    };

    // debugger;

    console.log("JSON Object:", JSON.stringify(jsonObject, null, 2));
    //await apiService.updateCustomer(jsonObject, customerId);
    const response = await apiService.updateCustomerApprove(jsonObject, customerId);
    console.log("Response from API:", response);
    toast.success("Customer updated successfully!", {
        autoClose: 2000,
        });
        // Introduce a delay before navigating
        setTimeout(() => {
            navigateTo('/customers'); // Redirect to the customer list page
        }, 2000);
} catch (error) {
    toast.error('Error updating customer: ' + error);
    toast.error(`${error}`, {
        autoClose: 3000,
    });
}
};

async function fetchActiveRequirements() {
    try {
    // Fetch data from your API endpoint
    const response = await apiService.getActiveRequirementsNoAUTH({});
    requirements.value = response.data; // Assumes the API returns an array of requirements
    } catch (error) {
    console.error('Error fetching requirements:', error);
    }
    finally{
        setTimeout(() => {
            fetchCustomerRequirement()
        }, 2000);
    }
}

const getSelectedRequirements = () => {
    const selectedDetails = [];

    for (let i = 0; i < requirements.value.length; i++) {
        const req = requirements.value[i];

        // Check if the requirement ID is in selectedRequirements
        if (selectedRequirements.value.includes(req.id)) {
            selectedDetails.push({
                id: req.id,
                description: req.description,
                expiry_date: formatDate(req.expiry_date),
            });
        }
    }



    // Assuming selectedDataRequirements is an array
    state.value.requirements = []; // Reset the array first

    // Loop through selectedDetails to store values in selectedDataRequirements
    for (let i = 0; i < selectedDetails.length; i++) {
        state.value.requirements.push(selectedDetails[i]);
    }

    //console.log(selectedDetails); // Output selected details to console
};


    watch(selectedRequirements, (newValue) => {
    console.log('Selected Requirements:', newValue);
});

// Fetch customer requirements and update expiry dates in requirements
const fetchCustomerRequirement = async () => {
try {
      const response = await apiService.getNotExpiredCustomerRequirementByIdNoAUTH({}, CustomersService.id); // Replace with your endpoint
      const customerRequirements = response.data;

      debugger

      for (let i = 0; i < requirements.value.length; i++) {
      const req = requirements.value[i];
      for (let j = 0; j < customerRequirements.length; j++) {
          const custReq = customerRequirements[j];
          if(!(custReq.expiry_date == null) || !(custReq.expiry_date == undefined))
          {
              if (req.id === custReq.id) {
              selectedRequirements.value.push(req.id);
              req.expiry_date = custReq.expiry_date.split(" ")[0]; // Format date
              break;
              }
          }
          else
          {
              if (req.id === custReq.id) {
              selectedRequirements.value.push(req.id);
              break;
              }
          }
      }
    }

    // state.value.requirements = [];
    //   for (let i = 0; i < requirements.value.length; i++) {
    //     state.value.requirements.push(requirements.value[i]);
    // }



} catch (error) {
    console.error('Error fetching customer requirements:', error);
}
};

function cancelForm() {
    try {
        navigateTo('/customers/');
    } catch (error) {
        toast.error(`${error}`, { autoClose: 3000, })
setTimeout(() => {
    }, 2000);;
    }
}

const formatDate = (dateString) => {
console.log("Input Date String:", dateString); // Add this line for debugging
const parts = dateString.split('-');
// debugger;
if (parts.length === 3) {
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    const year = parts[0];
    return `${year}-${month}-${day}`;
} else {
    console.error("Invalid date format. Expected MM/DD/YYYY.");
    return null;
}
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
