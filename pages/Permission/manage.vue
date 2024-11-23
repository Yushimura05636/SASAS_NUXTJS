<template>
  <NuxtLayout name="admin">
    <div class="bg-gray-100 min-h-screen flex items-center justify-center p-6">
    <form @submit.prevent="submitForm" class="w-full max-w-4xl bg-white p-8 rounded-md shadow-md space-y-6">

      <!-- User Information Section -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900">User Information</h2>

        <!-- Full Name Field -->
        <div class="w-full">
          <label for="fullname" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            :value="fullName"
            type="text"
            id="fullname"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>

        <!-- Email Field -->
        <div class="w-full">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="state.user.email"
            type="text"
            id="email"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
      </div>

      <!-- Document Permission Table Section -->
      <!-- Document Permission Table Section -->
      <div class="space-y-6">
        <h2 class="text-lg font-semibold text-gray-900">Document Permissions</h2>

        <!-- Check All / Uncheck All Buttons -->
        <div class="flex justify-end space-x-4 mb-4">
          <button type="button" @click="checkAll" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Check All</button>
          <button type="button" @click="uncheckAll" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Uncheck All</button>
        </div>

        <!-- Document Permission Table -->
        <div class="overflow-x-auto">
          <div class="scrolling-table h-64"> <!-- adjust the height to your needs -->
          <Alert type="danger" :text="state.error?.message" v-if="state.error" />
          <table class="min-w-full table-auto divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="document in state.document" :key="document.id">
                <!-- Select Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    :value="document.id"
                    v-model="selectedDocuments"
                    class="w-5 h-5"
                  />
                </td>

                <!-- Document Name Column -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm text-gray-900">{{ document.description }}</span>
                </td>

              <!-- Dynamic Permission Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex space-x-4">
                  <label
                    v-for="permission in state.tblpermission"
                    :key="permission.id"
                    class="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      :value="{ documentId: document.id, permission: permission.description.toLowerCase() }"
                      v-model="documentPermissions"
                      class="w-5 h-5"
                    />
                    <span>{{ permission.description }}</span>
                  </label>
                </div>
              </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-4 mt-6">
        <button @click="back" type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Save</button>
      </div>
    </form>
    <!-- Result Popup -->
  <FormResultPopup v-if="showResultPopup" :isSuccess="formSuccess" />
  </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, reactive, computed, onMounted } from 'vue';
import { UserService } from '~/models/User';
import { apiService } from '~/routes/api/API'; // Adjust path as necessary
import FormResultPopup from '~/components/form/ResultPopup.vue'; // Adjust path if needed
import { PermissionService } from '~/models/Permission';



const showResultPopup = ref(false);
const formSuccess = ref(false);

const state = reactive({
  permission: [],
  tblpermission: [],
  document: [],
  user: [],
  error: '',
  isTableLoading: true,
});

const selectedDocuments = ref([]); // Store selected document IDs
const documentPermissions = ref([]); // Store selected permissions

function formatDateTimeToMySQL(date: any) {
const pad = (num: any) => (num < 10 ? '0' + num : num);
const year = date.getFullYear();
const month = pad(date.getMonth() + 1);
const day = pad(date.getDate());
const hours = pad(date.getHours());
const minutes = pad(date.getMinutes());
const seconds = pad(date.getSeconds());

return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Return as Y-m-d H:i:s
}

function formatDateToMySQL(date: any) {
  const pad = (num: any) => (num < 10 ? '0' + num : num);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1); // Months are zero-based
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Create a dynamic permission map from `tblpermission`
const permissionMap = computed(() => {
const map: Record<number, string> = {};

// Dynamically fill the map with available permissions
state.tblpermission.forEach(permission => {
  map[permission.id] = permission.description.toLowerCase(); // Assuming `id` is the numeric permission code and `description` is the permission name
});

return map;
});


async function fetchPermissionandDocuments() {
try {
  debugger
  const params = {};
  const tblpermissions = await apiService.getPermission(params);
  const permissions = await apiService.getUserPermission(params, UserService.usbl_id);
  const documents = await apiService.getDocumentMap(params);
  const users = await apiService.getUserById(params, UserService.usbl_id);

  if (tblpermissions && tblpermissions.data && permissions && permissions.data && documents && documents.data && users && users.data) {
    state.permission = permissions.data;
    state.document = documents.data;
    state.user = users.data;
    state.tblpermission = tblpermissions.data;

    // Clear previous permissions
    documentPermissions.value = [];

    // Iterate over the permissions and documents dynamically
    state.permission.forEach(userPermission => {
      const documentId = userPermission.document_map_code; // Get the document ID from permissions
      const document = state.document.find(doc => doc.id === documentId); // Find the corresponding document

      if (document) {
        const permissionDescription = permissionMap.value[userPermission.document_permission]; // Get the dynamic permission name
        if (permissionDescription) {
          // Add the permission to the selected list
          selectedDocuments.value.push(document.id);
          documentPermissions.value.push({ documentId: document.id, permission: permissionDescription });
        }
      }
  });
  formSuccess.value = true;
  } else {
    toast.error(`${error}`, {
      autoClose: 5000,
    })
    state.error = 'Unexpected response format.';
  }
} catch (error) {
  toast.error(`${error}`, {
      autoClose: 5000,
    })
  formSuccess.value = false;
  state.error = 'Failed to fetch roles. Please try again.';
} finally {
  state.isTableLoading = false;
}
}



async function submitForm() {
try {

  // Get the current date and time
  const currentDateTime = formatDateToMySQL(new Date()); // Gets the current time

  // Filter permissions for selected documents only
  const filteredPermissions = documentPermissions.value.filter(permission =>
    selectedDocuments.value.includes(permission.documentId)
  );

  // Group permissions by document
  const documentPermissionMap = selectedDocuments.value.map((docId) => {
    const permissionsForDocument = filteredPermissions
      .filter((perm) => perm.documentId === docId)
      .map((perm) => perm.permission);

    return {
      document_id: docId,
      permissions: permissionsForDocument,
      datetime_granted: currentDateTime, // Use currentDateTime here
    };
  });

  // Predefine the JSON structure
  const jsonObject = {
    User: {
      id: state.user.id,  // Use the user's ID from the reactive state
    },
    DocumentPermissionMap: {
      data: documentPermissionMap,  // The document-permission mapping
    },
  };

  //create another permission
  //const response = await apiService.createDocumentPermission(jsonObject);
  const response = await apiService.updateDocumentPermission(jsonObject, 1);


  if (response) {
    formSuccess.value = true;
    toast.success("The permission has updated successfully!", {
          autoClose: 2000,
          });
  }

  // Send to the database
  console.log("Predefined JSON structure:", jsonObject);

} catch (error: any) {
  formSuccess.value = false;
  state.error = error;
  toast.error(`${error}`, {
      autoClose: 5000,
    })
}
}


function back() {
  navigateTo('/permission');
}

// Check all documents and permissions
function checkAll() {
// Select all documents
selectedDocuments.value = state.document.map((doc) => doc.id);

// Check all permissions for each document
documentPermissions.value = [];
state.document.forEach((document) => {
  documentPermissions.value.push(
    { documentId: document.id, permission: 'view' },
    { documentId: document.id, permission: 'create' },
    { documentId: document.id, permission: 'update' },
    { documentId: document.id, permission: 'delete' },
    { documentId: document.id, permission: 'approved' },
    { documentId: document.id, permission: 'reject' },
  );
});
}

// Uncheck all documents and permissions
function uncheckAll() {
// Clear selected documents and permissions
selectedDocuments.value = [];
documentPermissions.value = [];
}

// Fetch data on component mount
onMounted(async () => {

  //Promise for authentication
  const state_response = ref('');
  try {
    debugger
    const response = await apiService.authUserUpdate({})
    state_response.value = response.message;
    fetchPermissionandDocuments();
  } catch (error) {
    toast.error(`${error}`, { autoClose: 3000, })
  }
  finally
  {
    if(state_response.value.length <= 0)
    {
      setTimeout(() => {
        navigateTo(`/permission`)
      }, 2000);
    }
  }

});

const fullName = computed(() => `${state.user.first_name} ${state.user.last_name} ${state.user.middle_name}`);
</script>
