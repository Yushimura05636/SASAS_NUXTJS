<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-800">
      <div class="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg">
        <!-- Left Image Section -->
        <div class="w-full md:w-1/2 relative">
          <img
            alt="People working in an office"
            class="w-full h-full object-cover"
            src="../img/register-image.png"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
          <div class="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-10 text-white">
            <h1 class="text-2xl md:text-4xl font-bold">Small Loans, Big Impact</h1>
            <p class="mt-2 md:mt-4 text-sm md:text-lg">
              Microfinance provides small loans and financial services to individuals and small businesses in underserved communities, empowering them to achieve financial independence and improve their quality of life.
            </p>
          </div>
        </div>
        <!-- Right Form Section -->
        <div class="w-full md:w-1/2 bg-gray-800 p-6 md:p-10">
          <div class="flex justify-center mb-4 md:mb-6">
            <img alt="LendCash Logo" class="h-16 md:h-20 w-16 md:w-20" src="../img/LendCash_Logo-removebg-preview.png" />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white text-center mb-3 md:mb-4">REGISTRATION</h2>
          <h3 class="text-lg md:text-xl font-semibold text-white mb-2">
            Step 1
            <span class="font-normal">| Basic Information</span>
          </h3>
          <p class="text-sm md:text-base text-white mb-4 md:mb-6">
            This is a Pre-Registration. To become a fully verified member, we require our dear clients to send their requirements onsite. This includes any type of valid IDs, barangay clearance, PSA, and any type of proof of income.
          </p>
  
          <!-- Red Alert Message -->
          <div v-if="showAlert" class="text-red-500 mb-4">
            Please fill in all required fields before proceeding.
          </div>
  
          <form class="space-y-4" @submit.prevent="submitForm">
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                v-model="lastName"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Last Name"
                type="text"
              />
              <input
                v-model="firstName"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter First Name"
                type="text"
              />
            </div>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                v-model="middleName"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Middle Name"
                type="text"
              />
              <input
                v-model="birthDate"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Birth Date"
                type="date"
              />
            </div>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                v-model="civilStatus"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Civil Status"
                type="text"
              />
              <input
                v-model="birthPlace"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Birth Place"
                type="text"
              />
            </div>
            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <input
                v-model="gender"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Gender"
                type="text"
              />
              <input
                v-model="dateRegistered"
                class="w-full md:w-1/2 p-3 rounded-full bg-white text-gray-800"
                placeholder="Enter Date Registered"
                type="date"
              />
            </div>
            <div class="flex justify-between mt-6">
              <button
                class="px-6 py-3 rounded-full bg-purple-600 text-white"
                type="button"
                @click="cancel"
              >
                Cancel
              </button>
              <button 
                :disabled="!isFormValid" 
                class="px-6 py-3 rounded-full bg-purple-600 text-white" 
                type="submit"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <footer class="w-full text-center py-4 bg-gray-950 text-white mt-6 md:mt-0">
      2024 LendCash. All Rights Reserved.
    </footer>
  </template>
  
  
  <script>
  import { ref, computed } from 'vue'
  
  export default {
    setup() {
      const lastName = ref('')
      const firstName = ref('')
      const middleName = ref('')
      const birthDate = ref('')
      const civilStatus = ref('')
      const birthPlace = ref('')
      const gender = ref('')
      const dateRegistered = ref('')
  
      const showAlert = ref(false) // Controls visibility of the alert message
  
      // Check if all required fields are filled
      const isFormValid = computed(() => {
        return (
          lastName.value &&
          firstName.value &&
          middleName.value &&
          birthDate.value &&
          civilStatus.value &&
          birthPlace.value &&
          gender.value &&
          dateRegistered.value
        )
      })
  
      const submitForm = () => {
        if (!isFormValid.value) {
          showAlert.value = true // Show the alert message
          return
        }
        showAlert.value = false // Hide the alert if form is valid
        // Proceed to the next step or action
        window.location.href = 'register_step2'
      }
  
      const cancel = () => {
        window.location.href = '/'
      }
  
      return {
        lastName,
        firstName,
        middleName,
        birthDate,
        civilStatus,
        birthPlace,
        gender,
        dateRegistered,
        isFormValid,
        showAlert,
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
  