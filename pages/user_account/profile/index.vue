<template>
    <NuxtLayout :name="user_layout">
      <div class="bg-gray-50 min-h-screen py-12">
        <div class="container mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-teal-600 text-white py-6 px-8">
            <h2 class="text-3xl font-semibold">User Account</h2>
            <p class="text-lg mt-2">Manage your profile and account settings.</p>
          </div>
  
          <!-- Tabs -->
          <div class="flex border-b border-gray-200 mb-6">
            <button
              :class="{
                'border-teal-600 text-teal-600': activeTab === 'profile',
                'border-transparent text-gray-600': activeTab !== 'profile',
              }"
              @click="activeTab = 'profile'"
              class="px-6 py-3 font-medium focus:outline-none transition duration-300 ease-in-out border-b-2"
            >
              Profile
            </button>
            <button
              :class="{
                'border-teal-600 text-teal-600': activeTab === 'settings',
                'border-transparent text-gray-600': activeTab !== 'settings',
              }"
              @click="activeTab = 'settings'"
              class="px-6 py-3 font-medium focus:outline-none transition duration-300 ease-in-out border-b-2"
            >
              Settings
            </button>
          </div>
  
          <!-- Tabs Content -->
          <div v-if="activeTab === 'profile'" class="px-8 py-6">
            <!-- Profile Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="flex justify-center items-center">
                <img
                  :src="user.profilePicture || placeholderImage"
                  alt="Profile Picture"
                  class="w-32 h-32 rounded-full border-4 border-teal-600 shadow-lg"
                />
              </div>
              <div>
                <h3 class="text-2xl font-semibold text-gray-800">{{ user.name }}</h3>
                <p class="text-gray-600">{{ user.email }}</p>
                <p class="text-gray-600">{{ user.phone }}</p>
                <p class="text-gray-600">{{ user.address }}</p>
              </div>
            </div>
  
            <!-- Edit Profile Form -->
            <div v-if="editMode" class="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Edit Profile</h3>
              <form @submit.prevent="saveProfile">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                      v-model="user.name"
                      type="text"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                      v-model="user.email"
                      type="email"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Phone</label>
                    <input
                      v-model="user.phone"
                      type="text"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-700 font-medium mb-1">Address</label>
                    <input
                      v-model="user.address"
                      type="text"
                      class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                <div class="mt-6 flex justify-end space-x-4">
                  <button
                    type="submit"
                    class="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    @click="cancelEdit"
                    class="bg-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-400 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
  
          <div v-if="activeTab === 'settings'" class="px-8 py-6">
            <!-- Password Reset Form -->
            <div class="bg-gray-100 p-6 rounded-md shadow-md">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">Change Password</h3>
  
              <form @submit.prevent="changePassword">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                  <input
                    v-model="user.email"
                    type="email"
                    id="email"
                    placeholder="email@example.com"
                    readonly
                    class="input-field w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                <div v-if="verificationCodeSent">
                  <label for="verificationCode" class="block text-sm font-medium text-gray-600">Enter Verification Code</label>
                  <input
                    v-model="verificationCode"
                    type="text"
                    id="verificationCode"
                    placeholder="Enter code"
                    class="input-field w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                  />
                  <button
                    type="button"
                    @click="verifyCode(verificationCode)"
                    class="mt-4 bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
                  >
                    Verify Code
                  </button>
                </div>
  
                <div>
                  <label class="block text-gray-700 font-medium mb-1">New Password</label>
                  <input
                    v-model="newPassword"
                    type="password"
                    class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    :disabled="!isVerified"
                  />
                </div>
                <div>
                  <label class="block text-gray-700 font-medium mb-1">Confirm Password</label>
                  <input
                    v-model="confirmPassword"
                    type="password"
                    class="w-full px-4 py-3 border rounded-lg focus:ring-teal-500 focus:border-teal-500"
                    :disabled="!isVerified"
                  />
                </div>
                <div class="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    @click="sendVerificationCode"
                    class="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
                    :disabled="isVerified"
                  >
                    Send Verification Code
                  </button>
                  <button
                    type="submit"
                    class="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700 transition duration-300"
                    :disabled="!isVerified || !passwordsMatch"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <p v-if="verificationError" class="text-red-600 text-sm mt-2">
                Verification failed. Please check your code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
<script setup lang="ts">
import { email } from "@vuelidate/validators";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import { authService } from "~/components/api/AuthService";
import Newpassword from "~/pages/Members_UI/newpassword.vue";
import { apiService } from "~/routes/api/API";
import { useRoute, useRouter } from 'vue-router';

// Active Tab

const route = useRoute();
const settings = computed(() => route.query.settings);
const activeTab =  ref(settings.value);

console.log(settings.value)

// User Data (main object for editing)
const user = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  profilePicture: "",
});

const user_layout = ref('');

const placeholderImage = "https://www.shutterstock.com/image-vector/cute-cat-pixel-style-260nw-2138544923.jpg";

// Profile Editing
const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

const saveProfile = () => {
  toast.success("Profile updated successfully!");
  editMode.value = false;
};

const cancelEdit = () => {
  fetchProfile();
  editMode.value = false;
};

// Fetch User Profile Data
const fetchProfile = async () => {
  try {
    const response = await apiService.getUserProfileData({});
    user.value.name = `${response.data.last_name} ${response.data.first_name} ${response.data.middle_name}`;
    user.value.email = response.data.email;
    user.value.address = `${response.data.house_street} ${response.data.purok_zone} ${response.data.postal_code}`;
    user.value.phone = response.data.cellphone_no;
    user.value.profilePicture = response.data.profile_picture || placeholderImage;
  } catch (error) {
    toast.error(`Error fetching profile: ${error}`);
  }
};

const verifyUserLayout = async () => {
  const response = await apiService.getDashboardUserDetailsNoAUTH({});

  const layout = response.role

  debugger

  if(layout == 'CUSTOMER')
  {
    user_layout.value = 'client'
  }
  else if(layout == 'EMPLOYEE')
  {
    user_layout.value = 'admin'
  }
}

onMounted( () => {
  verifyUserLayout();
  fetchProfile();
});

// Password Reset Logic
const newPassword = ref("");
const confirmPassword = ref("");
const isVerified = ref(false);
const verificationCode = ref("");
const verificationError = ref(false);
const passwordsMatch = computed(() => newPassword.value === confirmPassword.value);
const verificationCodeSent = ref(false);
const resetCode = ref(0);

const sendVerificationCode = async () => {
  try {
    const params = {
            email: user.value.email,
            phone_number: user.value.phone,
            method: 'email.customer.profile',
        }

        const response = await authService.sendVerification(params);

        debugger

        if(response.success == true){
            toast.success(`The verification code has been sent!`, {autoClose: 3000})
            verificationCode.value = '';
            verificationError.value = false;
            verificationCodeSent.value = true;
        }
  } catch (error) {
    toast.error(`Error sending code: ${error}`);
  }
};

const verifyCode = async (code: string) => {
  try {
    const params = {
            code: parseInt(code),
            email: user.value.email,
            method: 'email.customer.profile',
        }

        debugger

        const response = await authService.verifyVerification(params, parseInt(code));

        if(response.success == true)
        {
            toast.success(`The code has been verified!`, {autoClose: 3000})

            //disable verify field and verify button field
            isVerified.value = true;
            resetCode.value = parseInt(code);
        }
        else
        {
          isVerified.value = false;
          verificationError.value = true;
        }
  } catch (error) {
    toast.error(`Verification failed: ${error}`);
    verificationError.value = true;
  }
};

const changePassword = async () => {
  if (!passwordsMatch.value) {
    toast.error("Passwords do not match!");
    return;
  }

  const params = {
    email: user.value.email,
    password: newPassword.value,
    code: resetCode.value,
  }

  try {
    const response = await apiService.changeUserProfilePassword(params, resetCode.value);
    
    if(response.success)
    {

    toast.success("Password changed successfully!");
    newPassword.value = ''
    confirmPassword.value = ''
    resetCode.value = 0
    verificationCode.value = ''
    isVerified.value = false
    verificationCodeSent.value = false

  }

  } catch (error) {
    toast.error(`Error changing password: ${error}`);
  }
};
</script>
