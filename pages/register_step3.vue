<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex flex-1 flex-col md:flex-row">
      <!-- Left Image Section -->
      <div class="w-full md:w-1/2 relative">
        <img
          alt="People working in an office setting"
          class="w-full h-full object-cover"
          src="../img/register-image.png"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-10">
          <h1 class="text-white text-3xl md:text-5xl font-bold">
            Small Loans, Big Impact
          </h1>
          <p class="text-white text-sm md:text-lg mt-4">
            Microfinance provides small loans and financial services to individuals and small businesses in underserved communities, empowering them to achieve financial independence and improve their quality of life.
          </p>
        </div>
      </div>

      <!-- Right Form Section -->
      <div class="w-full md:w-1/2 bg-gray-800 flex flex-col justify-center items-center p-6 md:p-10">
        <img alt="LendCash logo" class="mb-6 w-32 md:w-40" src="../img/LendCash_Logo-removebg-preview.png" />
        <h2 class="text-white text-3xl md:text-4xl font-bold mb-4">
          REGISTRATION
        </h2>
        <div class="text-white text-lg mb-4">
          Step 3
        </div>
        <h3 class="text-white text-xl md:text-2xl font-bold mb-4">
          Upload Personal Image
        </h3>
        <p class="text-white text-sm text-center mb-6">
          This is a Pre-Registration. To become a fully verified member, we require our dear clients to send their requirements online. This includes any type of valid IDs, barangay clearance, PSA, and any type of proof of income.
        </p>

        <!-- File Upload Section -->
        <div class="bg-gray-300 w-64 h-40 flex items-center justify-center mb-4">
          <input
            class="hidden"
            id="file-upload"
            type="file"
            @change="handleFileChange"
          />
          <label class="bg-white text-gray-800 py-2 px-4 rounded cursor-pointer" for="file-upload">
            Choose File
          </label>
          <img v-if="imageUrl" :src="imageUrl" class="w-64 h-40 object-cover" />
        </div>

        <!-- File Upload Validation Message -->
        <div v-if="fileError" class="text-red-500 text-sm mb-4">
          Please upload a personal image.
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button class="bg-purple-600 text-white px-6 py-2 rounded-full">
            <a href="register_step2">Back</a>
          </button>
          <button
            class="bg-purple-600 text-white px-6 py-2 rounded-full"
            @click="submitForm"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="w-full text-center py-4 bg-gray-950 text-white mt-6 md:mt-0">
      <p class="text-gray-600">
        2023 LendCash. All Rights Reserved.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: null,
      selectedFile: null,
      fileError: false,
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.fileError = false
        this.selectedFile = file
        const reader = new FileReader()
        reader.onload = () => {
          this.imageUrl = reader.result
        }
        reader.readAsDataURL(file)
      } else {
        this.selectedFile = null
        this.imageUrl = null
      }
    },
    submitForm() {
      if (!this.selectedFile) {
        this.fileError = true
        return
      }

      // Proceed with form submission (e.g., send data to API)
      alert('Form submitted successfully!')
    },
  },
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
}
</style>
