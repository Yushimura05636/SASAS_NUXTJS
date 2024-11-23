<template>
  <div class="forgot-password-page flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <div class="form-container bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6">Reset Password</h2>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading text-center text-lg text-gray-600">
        <p>Loading...</p>
      </div>

      <!-- Invalid Token or Email -->
      <div v-else-if="!token || !email" class="invalid-message text-center">
        <p class="text-red-600 font-semibold">Invalid token or email. Redirecting to login...</p>
        <button @click="redirectToLogin" class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-sm transition duration-150">
          Go to Login
        </button>
      </div>

      <!-- Password Changed Successfully -->
      <div v-else-if="passwordChanged" class="success-message text-center">
        <p class="text-green-600 font-semibold">Password changed successfully!</p>
        <button @click="redirectToLogin" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition duration-150">
          Go to Login
        </button>
      </div>

      <!-- Password Reset Form -->
      <div v-else>
        <form @submit.prevent="submitForm" class="flex flex-col">
          <div class="form-group mb-5">
            <label for="password" class="block text-gray-700 font-medium mb-2">New Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              placeholder="Enter new password"
              class="input-field w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div class="form-group mb-5">
            <label for="confirmPassword" class="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Confirm new password"
              class="input-field w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <!-- Display error message if there is one -->
          <p v-if="error" class="error-message text-red-600 text-sm mb-4">{{ error }}</p>

          <button type="submit" class="btn-primary px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition duration-200">
            Change Password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { apiService } from '~/routes/api/API';

  const route = useRoute();
  const router = useRouter();

  const token = computed(() => route.query.token);
  const email = computed(() => route.query.email);
  const loading = ref(true);
  const passwordChanged = ref(false);
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref('');
  const role = ref('');

  const redirectToLogin = () => {
    if(role.value == 'CUSTOMER')
    {
      return router.push('/login/client_login');
    }
    return router.push('/login');
    
  };

  const verify = async () => {
    try {
      const params = {
        email: email.value,
        token: token.value,
        method: 'forgot',
      };
      const response = await apiService.verifyTokenAndEmailNoAUTH(params, token.value);

      if (response) {
        loading.value = false;
      } else {
        redirectToLogin();
      }
    } catch (error) {
      redirectToLogin();
    } finally {
      loading.value = false;
    }
  };

  const submitForm = async () => {
    if (password.value !== confirmPassword.value) {
      error.value = "Passwords do not match!";
      return;
    }

    try {
      const params = {
        email: email.value,
        token: token.value,
        password: password.value,
      };

      const response = await apiService.updateUserPasswordNoAUTH(params, token.value);

      if (response) {
        passwordChanged.value = true;
        error.value = '';
        password.value = '';
        confirmPassword.value = '';

        role.value = response.role;
        debugger
      } else {
        error.value = 'Error changing password!';
      }
    } catch (err) {
      error.value = 'An unexpected error occurred.';
    }
  };

  onMounted(() => {
    verify();
  });
  </script>

  <style scoped>
  .forgot-password-page {
    background-color: #f9fafb;
  }

  .form-container {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    transition: border-color 0.3s ease;
  }

  .input-field:focus {
    border-color: #6366f1; /* Primary brand color */
    outline: none;
  }

  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    background-color: #6366f1; /* Primary brand color */
    color: #ffffff;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #4f46e5; /* Darker shade */
  }

  .btn-secondary {
    width: 100%;
    padding: 0.75rem;
    background-color: #f3f4f6;
    color: #4b5563;
    font-weight: bold;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-secondary:hover {
    background-color: #e5e7eb;
  }

  .error-message, .success-message {
    font-size: 0.875rem;
    text-align: center;
  }

  .loading {
    font-size: 1.125rem;
    color: #4b5563;
  }

  form-container {
  background: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  display: inline-block;
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: #ffffff;
  text-align: center;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #4338ca;
}

.loading {
  font-size: 1.125rem;
  color: #6b7280;
}

.success-message,
.invalid-message {
  font-size: 1rem;
}
  </style>
