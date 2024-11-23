<template>
    <div class="min-h-screen flex flex-col md:flex-row">
      <!-- Left Image Section -->
      <div class="w-full md:w-1/2 relative">
        <img
          alt="People working in an office"
          class="absolute inset-0 w-full h-full object-cover"
          src="../img/register-image.png"
        />
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative z-10 p-12 text-white">
          <h1 class="text-4xl md:text-5xl font-bold">Small Loans, Big Impact</h1>
          <p class="mt-4 text-sm md:text-lg">
            Microfinance provides small loans and financial services to individuals and small businesses in underserved communities, empowering them to achieve financial independence and improve their quality of life.
          </p>
        </div>
      </div>
  
      <!-- Right Form Section -->
      <div class="w-full md:w-1/2 bg-gray-800 flex flex-col justify-between">
        <div class="p-6 md:p-12 text-white">
          <div class="flex justify-center mb-6">
            <img alt="LendCash logo" class="h-16 md:h-20 w-auto" src="../img/LendCash_Logo-removebg-preview.png" />
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-4">REGISTRATION</h2>
          <h3 class="text-xl md:text-2xl font-semibold text-center mb-4">
            Step 2
            <span class="text-lg">Advance Information</span>
          </h3>
          <p class="text-center mb-6 text-sm md:text-base">
            This is a Pre-Registration. To become a fully verified member, we require our dear clients to send their requirements online. This includes any type of valid IDs, barangay clearance, PSA, and any type of proof of income.
          </p>
  
          <!-- Red Alert Message -->
          <div v-if="showAlert" class="text-red-500 mb-4 text-center">
            Please fill in all required fields.
          </div>
  
          <form class="space-y-4" @submit.prevent="submitForm">
            <input
              v-model="phoneNumber"
              class="w-full p-3 rounded-full bg-gray-700 text-white"
              placeholder="Enter Phone Number"
              type="text"
            />
            <input
              v-model="email"
              class="w-full p-3 rounded-full bg-gray-700 text-white"
              placeholder="Enter valid Email"
              type="email"
            />
            <input
              v-model="address"
              class="w-full p-3 rounded-full bg-gray-700 text-white"
              placeholder="Enter Current Address"
              type="text"
            />
            <input
              v-model="occupation"
              class="w-full p-3 rounded-full bg-gray-700 text-white"
              placeholder="Enter Occupation"
              type="text"
            />
            <input
              v-model="coBorrower"
              class="w-full p-3 rounded-full bg-gray-700 text-white"
              placeholder="Enter Co-Borrower"
              type="text"
            />
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              <div class="w-full md:w-1/2">
                <div class="bg-gray-700 p-3 rounded-full text-center text-white">
                  Valid ID Image
                </div>
                <input
                  @change="handleFileChange($event, 'validID')"
                  class="mt-2 w-full"
                  type="file"
                  accept="image/*"
                />
              </div>
              <div class="w-full md:w-1/2">
                <div class="bg-gray-700 p-3 rounded-full text-center text-white">
                  Barangay Clearance Image
                </div>
                <input
                  @change="handleFileChange($event, 'barangayClearance')"
                  class="mt-2 w-full"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="flex flex-col justify-between items-center">
              <div class="w-full">
                <div class="bg-gray-700 p-3 rounded-full text-center text-white">
                  PSA Image
                </div>
                <input
                  @change="handleFileChange($event, 'psaImage')"
                  class="mt-2 w-full"
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
            <div class="flex justify-between mt-6">
              <button
                class="bg-purple-600 text-white px-6 py-3 rounded-full"
                @click="cancel"
              >
                Cancel
              </button>
              <button 
                class="bg-purple-600 text-white px-6 py-3 rounded-full"
                :disabled="!isFormValid"
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        </div>
        <footer class="bg-gray-950 text-center py-4 text-white ">
          <p>2023 LendCash. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    setup() {
      const phoneNumber = ref('')
      const email = ref('')
      const address = ref('')
      const occupation = ref('')
      const coBorrower = ref('')
      const validID = ref(null)
      const barangayClearance = ref(null)
      const psaImage = ref(null)
      const showAlert = ref(false)
  
      // Check if all fields are filled
      const isFormValid = computed(() => {
        return (
          phoneNumber.value &&
          email.value &&
          address.value &&
          occupation.value &&
          coBorrower.value &&
          validID.value &&
          barangayClearance.value &&
          psaImage.value
        )
      })
  
      // Method to handle file input change
      const handleFileChange = (event, field) => {
        const file = event.target.files[0]
        if (field === 'validID') {
          validID.value = file
        } else if (field === 'barangayClearance') {
          barangayClearance.value = file
        } else if (field === 'psaImage') {
          psaImage.value = file
        }
      }
  
      const submitForm = () => {
        if (!isFormValid.value) {
          showAlert.value = true
        } else {
          showAlert.value = false
          // Proceed to the next step
          window.location.href = "register_step3"
        }
      }
  
      const cancel = () => {
        window.location.href = "register_step1"
      }
  
      return {
        phoneNumber,
        email,
        address,
        occupation,
        coBorrower,
        validID,
        barangayClearance,
        psaImage,
        isFormValid,
        showAlert,
        handleFileChange,
        submitForm,
        cancel
      }
    }
  }
  </script>
  
  <style>
  body {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  