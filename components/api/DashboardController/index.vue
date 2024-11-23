<template>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { apiService } from '~/routes/api/API';
import LoadingSpinner from '~/components/loading/Spinner.vue';  // Import the LoadingSpinner component

// Declare the reactive state for user and loading status
const user = ref<string>('');
const loading = ref<boolean>(true);

// Function to fetch customer details
async function getCustomerDetails() {
    try {
        loading.value = true;
        const response = await apiService.getDashboardUserDetailsNoAUTH({});
        
        // Set user role after successful response
        user.value = response.role;

        debugger

        if(user.value == 'CUSTOMER')
        {
            loading.value = false
            navigateTo('/dashboard/Client')
        }
        else if(user.value == 'COLLECTOR')
        {
          loading.value = false
            navigateTo('/dashboard/COLLECTOR')
        }
        else
        {
          loading.value = false
          navigateTo('/dashboard/EMPLOYEE')
        }
        
    } catch (error) {
        console.error(`Error fetching user details: ${error}`);
    } finally {
        // Ensure loading is set to false once data is loaded
        loading.value = false;
    }
}

// Fetch data on component mount
onMounted(() => {
    getCustomerDetails();
});
</script>

<style scoped>
/* Loading overlay to cover the screen */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's above other elements */
  animation: fadeIn 0.5s ease-out; /* Fade-in transition */
}

/* Spinner design */
.spinner {
  border: 8px solid rgba(255, 255, 255, 0.3); /* Light border */
  border-top: 8px solid #3498db; /* Blue border for the spinning effect */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1.5s linear infinite; /* Continuous spin animation */
}

/* Keyframe for the spinning animation */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Fade-in animation for the overlay */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
