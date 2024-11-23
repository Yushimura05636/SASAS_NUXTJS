<template>
  <div class="forgot-password-container flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-500">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h2>

      <form @submit.prevent="sendResetLink" class="space-y-6">
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="input-field w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" class="submit-button w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition duration-200 py-2 text-lg font-semibold">
          Send Reset Link
        </button>

        <!-- Display error message if there is one -->
        <p v-if="errorMessage" class="error-message text-red-600 text-center mt-2">{{ errorMessage }}</p>
      </form>

      <!-- Code Sent Confirmation -->
      <div v-if="codeSent" class="mt-6 text-center">
        <h2 class="text-lg text-gray-700">
          An email has been sent to <span class="font-bold">{{ displayCensoredEmail(email) }}</span> to reset your password.
        </h2>
        <button @click="resendEmail" class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow-sm transition duration-150">
          Resend Email
        </button>
      </div>
    </div>
  </div>
</template>

  <script setup lang="ts">
  import { ref } from 'vue';
  import { authService } from '~/components/api/AuthService';
  import { apiService } from '~/routes/api/API';

  const email = ref('');
  const codeSent = ref(false);
  const errorMessage = ref('');

  async function sendResetLink() {
    try {
      // Verifying email
      //const response = await apiService.verifyEmailNoAUTH({ email: email.value });

    //   if (!response) {
    //     errorMessage.value = 'Failed to find email';
    //     return;
    //   }

      // Sending verification
      const result = await authService.sendVerification({ email: email.value, method: 'forgot' });
      if (result) {
        codeSent.value = true;
      } else {
        errorMessage.value = 'Failed to send reset link. Please try again.';
      }
    } catch (error) {
      errorMessage.value = 'Failed to send reset link. Please try again.';
    }
  }

  const displayCensoredEmail = (email: string) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    const censoredLocalPart = localPart.length > 2
      ? `${localPart[0]}***${localPart[localPart.length - 1]}`
      : `${localPart[0]}**`;
    return `${censoredLocalPart}@${domain}`;
  };

  async function resendEmail() {
    try {
      const response = await authService.sendVerification({ email: email.value, method: 'forgot' });
      if (response) {
        console.log('Email resent successfully');
        errorMessage.value = '';
      }
    } catch (error) {
      console.log('Error resending email:', error);
    }
  }
  </script>

  <style scoped>
  .forgot-password-container {
    background-color: #f7fafc;
  }

  .input-field {
    padding: 12px;
    border: 1px solid #cbd5e0;
    border-radius: 8px;
    transition: border-color 0.2s ease-in-out;
  }

  .input-field:focus {
    border-color: #4f46e5;
    outline: none;
  }

  .submit-button {
    background-color: #4f46e5;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .submit-button:hover {
    background-color: #4338ca;
  }

  .error {
    color: red;
    font-size: 14px;
  }

  .btn-secondary {
    background-color: #f3f4f6;
    color: #4b5563;
    padding: 10px;
    font-weight: bold;
    border-radius: 8px;
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .btn-secondary:hover {
    background-color: #e5e7eb;
  }

  .forgot-password-container {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  padding: 2rem;
}

.submit-button {
  background-color: #4f46e5;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #4338ca;
}

.error-message {
  color: #e53e3e;
}
  </style>
