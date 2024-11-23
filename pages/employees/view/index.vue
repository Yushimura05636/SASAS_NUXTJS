<template>
  <NuxtLayout name="admin">
  <div class="bg-white p-4 md:p-8">
    <h2 class="text-gray-800 text-xl font-bold mb-4">Edit Employee</h2>

    <form @submit.prevent="updateEmployee">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Personality Fields -->
        <div>
          <label for="firstName" class="block text-gray-700">First Name</label>
          <input v-model="personality.first_name" type="text" id="firstName" class="w-full border rounded-lg px-4 py-2" required />
        </div>

        <div>
          <label for="lastName" class="block text-gray-700">Last Name</label>
          <input v-model="personality.family_name" type="text" id="lastName" class="w-full border rounded-lg px-4 py-2" required />
        </div>

        <div>
          <label for="middleName" class="block text-gray-700">Middle Name</label>
          <input v-model="personality.middle_name" type="text" id="middleName" class="w-full border rounded-lg px-4 py-2" required />
        </div>

        <div>
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="personality.email_address" type="email" id="email" class="w-full border rounded-lg px-4 py-2" required />
        </div>

        <div>
          <label for="telephone" class="block text-gray-700">Telephone#</label>
          <input v-model="personality.telephone_no" type="text" id="telephone" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="birthday" class="block text-gray-700">Birthday</label>
          <input v-model="personality.birthday" type="date" id="birthday" class="w-full border rounded-lg px-4 py-2" required />
        </div>

        <div>
          <label for="gender" class="block text-gray-700">Gender</label>
          <select v-model="personality.gender_code" id="gender" class="w-full border rounded-lg px-4 py-2">
            <option value="1">Male</option>
            <option value="2">Female</option>
          </select>
        </div>

        <div>
            <label for="civilStatus" class="block text-gray-700">Civil Status</label>
            <select v-model="personality.civil_status" id="civilStatus" class="w-full border rounded-lg px-4 py-2">
              <option v-for="status in civilStatuses" :key="status.value" :value="status.id">
                {{ status.description }}
              </option>
            </select>
          </div>

        <div>
          <label for="houseStreet" class="block text-gray-700">House Street</label>
          <input v-model="personality.house_street" type="text" id="houseStreet" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="purokZone" class="block text-gray-700">Purok Zone</label>
          <input v-model="personality.purok_zone" type="text" id="purokZone" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <!-- Employee Fields -->
        <div>
          <label for="sssNo" class="block text-gray-700">SSS NO</label>
          <input v-model="employee.sss_no" type="number" id="sssNo" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="phicNo" class="block text-gray-700">PHIC NO</label>
          <input v-model="employee.phic_no" type="number" id="phicNo" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="tinNo" class="block text-gray-700">TIN NO</label>
          <input v-model="employee.tin_no" type="number" id="tinNo" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="dateHired" class="block text-gray-700">Date Hired</label>
          <input v-model="employee.date_hired" type="date" id="dateHired" class="w-full border rounded-lg px-4 py-2" />
        </div>

        <div>
          <label for="dateResigned" class="block text-gray-700">Date Resigned</label>
          <input v-model="employee.date_resigned" type="date" id="dateResigned" class="w-full border rounded-lg px-4 py-2" />
        </div>
      </div>

      <div class="mt-4 py-5 text-right">
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
          Approve
        </button>
        <button type="button" @click="handleCancel()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 ml-2">
          Cancel
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
import { useRoute, useRouter } from 'vue-router';

import { EmployeesService } from '~/models/Employee';
import { apiService } from '~/routes/api/API';

const route = useRoute();
const router = useRouter();

// Personality data
const personality = ref({
  first_name: '',
  family_name: '',
  middle_name: '',
  email_address: '',
  telephone_no: '',
  birthday: new Date().toISOString().split('T')[0],
  gender_code: 0,
  civil_status: 0,
  house_street: '',
  purok_zone: '',
  postal_code: '',
  cellphone_no: '',
  personality_status_code: 1,
  barangay_id: 0,
  city_id: 0,
  country_id: 0,
  province_id: 0,
  credit_status_id: 0,
  notes: undefined,
  datetime_registered: new Date().toISOString().split('T')[0],
  name_type_code: 0,
});

// Employee data
const employee = ref({
  sss_no : 0,
  phic_no : 0,
  tin_no : 0,
  date_hired : new Date().toISOString().split('T')[0],
  date_resigned : new Date().toISOString().split('T')[0],
  personality_id: 0,
});

// Civil Status Options for Combobox
const civilStatuses = ref([]);

function handleCancel()
{
  navigateTo('/employees')
}

// Fetch employee data
async function fetchEmployeeData() {
  try {
    const employeeId = EmployeesService.id;
    if (!employeeId || isNaN(Number(employeeId))) {
      toast.error('Invalid Id!', {
        autoClose: 5000,
      })
      router.push('/employees');
      return;
    }
    const response = await apiService.getEmployeeById({}, employeeId);
    Object.assign(employee.value, response.employee);
    Object.assign(personality.value, response.personality);
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

// Update employee data
const updateEmployee = async () => {
  try {
    const employeeId = EmployeesService.id;
    if (!employeeId || isNaN(Number(employeeId))) {
      toast.error('Invalid Id!', {
        autoClose: 5000,
      })
      router.push('/Libraries/EmployeeView');
      return;
    }

    const jsonObject = {
      employee: {
        sss_no: employee.value.sss_no,
        phic_no: employee.value.phic_no,
        tin_no: employee.value.tin_no,
        datetime_hired: employee.value.date_hired,
        datetime_resigned: employee.value.date_resigned,
        personality_id: employee.value.personality_id,
      },
      personality: {
        datetime_registered: personality.value.datetime_registered,
        family_name: personality.value.family_name,
        middle_name: personality.value.middle_name,
        first_name: personality.value.first_name,
        birthday: personality.value.birthday,
        civil_status: personality.value.civil_status,
        gender_code: personality.value.gender_code,
        house_street: personality.value.house_street,
        purok_zone: personality.value.purok_zone,
        postal_code: personality.value.postal_code,
        telephone_no: personality.value.telephone_no,
        email_address: personality.value.email_address,
        cellphone_no: personality.value.cellphone_no,
        name_type_code: personality.value.name_type_code,
        personality_status_code: 1,
        barangay_id: personality.value.barangay_id,
        city_id: personality.value.city_id,
        country_id: personality.value.country_id,
        province_id: personality.value.province_id,
        credit_status_id: personality.value.credit_status_id,
        notes: personality.value.notes,
      }
    };
    await apiService.updateEmployee(jsonObject, employeeId);
          toast.success("Employee updated successfully!", {
          autoClose: 2000,
          });
          // Introduce a delay before navigating
          setTimeout(() => {
            navigateTo('/employees');
          }, 2000);
    // alert('Employee updated successfully!');
    // router.push('/employees'); // Redirect after successful update
  } catch (error) {
    toast.error('Error updating employee: ' + error);
    toast.error(`${error}`, {
        autoClose: 5000,
      });
  }
};

async function fetchCivilStatus()
{
  try {
    const response = await apiService.getNoAuth({}, 'civil_status');
    Object.assign(civilStatuses.value, response.data);
  } catch (error) {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
  }
}

onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    const response = await apiService.authEmployeesUpdate({})
    state_response.value = response.message;
    fetchCivilStatus();
    fetchEmployeeData();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/employees`)
          }, 2000);
    }
  }

})
</script>
