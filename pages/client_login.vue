<template>
    <main class="relative flex items-center justify-center min-h-screen animated-background">
        <!-- Overlay -->
        <div class="absolute inset-0 bg-teal-600 opacity-70"></div>

        <!-- Login Card -->
        <div class="relative z-10 bg-white p-10 rounded-xl shadow-lg w-full max-w-md border-t-4">
            <!-- Welcome and Login Form Section -->
            <div v-if="!isAuthenticated" class="text-center space-y-6">
                <img src="../img/LendCash_Logo-removebg-preview.png" width="100" class="mx-auto animate-bounce mb-4" />
                <h2 class="text-gray-800 text-2xl font-bold sm:text-3xl tracking-tight">Welcome Back!</h2>
                <p class="text-gray-500">Please log in to access your account</p>

                <form @submit.prevent="login" class="space-y-5">
                    <input v-model="state.email" placeholder="Email" type="email" class="input-field" />
                    <FormError :error="state.error?.email" />

                    <input v-model="state.password" placeholder="Password" type="password" class="input-field" />
                    <FormError :error="state.error?.password" />

                    <button class="button bg-teal-600 text-white font-bold py-2 px-4 rounded w-full">
                        Sign In
                    </button>
                </form>

                <!-- Forgot Password Link -->
                <div class="mt-4">
                    <a href="/forgot_password" class="text-teal-400 font-semibold text-s hover:underline">Forgot your password?</a>
                </div>
            </div>

            <!-- 2FA Method Selection -->
            <div v-if="isAuthenticated && !isCodeSent" class="text-center space-y-4">
                <h3 class="text-xl font-semibold">Select Verification Method</h3>
                <div class="flex justify-around">
                    <div @click="setMethod('email')" :class="selectedMethod === 'email' ? 'selected' : ''" class="method-option">
                        <img src="https://www.clipartmax.com/png/middle/262-2626325_find-and-follow-us-dark-blue-email-icon.png" alt="Email Icon" class="icon" />
                        <span>Email</span>
                    </div>
                    <!-- <div @click="setMethod('phone')" :class="selectedMethod === 'phone' ? 'selected' : ''" class="method-option">
                        <img src="https://cdn-icons-png.flaticon.com/512/6523/6523368.png" alt="Phone Icon" class="icon" />
                        <span>Phone</span>
                    </div> -->
                </div>
                <button @click="sendVerificationCode" class="send-code-button" :disabled="!selectedMethod">Send Code</button>
            </div>

            <!-- 2FA Code Input -->
            <div v-if="isCodeSent" class="text-center space-y-4">
                <div class="flex justify-center items-center">
                    <span v-if="selectedMethod == 'email'">
                        <img src="https://www.clipartmax.com/png/middle/262-2626325_find-and-follow-us-dark-blue-email-icon.png" alt="Email Icon" class="icon" />
                    </span>
                    <span v-else>
                        <img src="https://cdn-icons-png.flaticon.com/512/6523/6523368.png" alt="Phone Icon" class="icon" />
                    </span>
                </div>
                <h3 class="text-xl font-semibold">Enter Your 2FA Code</h3>
                <input v-model="state.code" placeholder="Enter 6-digit code" type="text" class="input-field" />
                <button @click="verifyCode" class="submit-button">Verify</button>
                <button @click="resendCode" class="resend-button">Resend Code</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
                <p v-if="successMessage" class="success">{{ successMessage }}</p>
                <p v-if="resendMessage" class="info">{{ resendMessage }}</p>
            </div>

        </div>
    </main>
</template>

<script setup lang="ts">
import { validateForm } from '~/components/validator/validator';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, reactive } from 'vue';
import { authService } from '@/components/api/AuthService';
import { useRouter } from 'vue-router';

const state = reactive({
    email: '',
    phone: '',
    password: '',
    code: '',
    error: null,
});

const isAuthenticated = ref(false);
const isCodeSent = ref(false);
const selectedMethod = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();
const resendMessage = ref('');


const login = async () => {
    try {

        const error = validateForm({ email: state.email, password: state.password })

        if(error.email)
        {
            toast.error(`${error.email}`)
            return   
        }

        if(error.password)
        {
            toast.error(`${error.password}`)
            return   
        }

        const response = await authService.loginClient({ email: state.email, password: state.password });
        console.log('Response:', response);
        debugger
        debugger
        if (response.data) {
            debugger
            state.phone = response.data.user.phone_number
            state.email = response.data.user.email

            //set the phone number and
            isAuthenticated.value = true;
            state.error = null;
        } else {
            toast.error(`Invalid credentials`, {autoClose: 3000})
        }
    } catch (error) {
        toast.error(`${error}`, {autoClose:3000})
    }
};

const setMethod = (method: string) => {
    selectedMethod.value = method;
};

const sendVerificationCode = async () => {
    try {

        if(selectedMethod.value.length <= 0)
        {
            toast.error(`Please select a verification method`)   
            return
        }

        

        debugger
        const params = {
            email: state.email,
            // phone_number: state.phone,
            method: selectedMethod.value,
        }
        console.log("Sending params:", params);
        console.log("Pass email "+state.email)

        const response = await authService.sendVerificationClient(params);
        isCodeSent.value = true;
        errorMessage.value = '';
    } catch (error) {
        toast.error(`${error}`, {autoClose: 3000})
    }
};

const resendCode = async () => {
    try {
        // Logic to resend the 2FA code
        resendMessage.value = '';
        errorMessage.value = '';

        // Simulate API call for resending code
        const params = {
            email: state.email,
            phone_number: state.phone,
            method: selectedMethod.value,
        }
        
        const response = await authService.sendVerificationClient(params);
        isCodeSent.value = true;
        errorMessage.value = '';
        
        setTimeout(() => {
            resendMessage.value = 'A new code has been sent to your email/phone.';
        }, 1000);
    } catch (error) {
        toast.error(`${error}`)
    }
};


const verifyCode = async () => {
    try {

        if(!state.code || state.code.length < 6)
        {
            toast.error(`Invalid 2FA code. Please try again.`)
            return
        }


        debugger
        const params = {
            code: state.code,
            email: state.email,
            // phone_number: state.phone,
            method: selectedMethod.value,
        }
        const response = await authService.verifyVerificationClient(params, state.code);
        if (response.success) {
            localStorage.setItem("_token", response.data?.token)
            successMessage.value = 'Code verified!';
            router.push('/dashboard/');
        } else {
            toast.error(`Invalid code`, {autoClose:3000})
        }
    } catch (error) {
        toast.error(`${error}`, {autoClose:3000})

    }
    finally
    {
        setTimeout(() => {

        }, 3000);
    }
};
</script>

<style scoped>
.input-field {
    padding: 8px;
    width: 100%;
    margin-top: 4px;
}

.submit-button, .send-code-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    width: 100%;
    cursor: pointer;
}

.method-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}
.method-option:hover {
    background-color: #f0f0f0;
}
.selected {
    background-color: #e0e0ff;
}

.icon {
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
}

.error {
    color: red;
}
.success {
    color: green;
}
/* Background Animation */
.animated-background {
    background: linear-gradient(45deg, #10b981, #34d399, #6ee7b7, #a7f3d0);
    background-size: 300% 300%;
    animation: gradientAnimation 15s ease infinite;
    transition: background 0.3s ease;
}

/* Keyframes for gradient animation */
@keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

.input-field {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    transition: border-color 0.3s ease;
    outline: none;
    font-size: 0.875rem;
}
.input-field:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
}

.submit-button {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #6366f1;
    color: white;
    border-radius: 0.375rem;
    font-weight: 600;
    text-align: center;
    transition: background-color 0.3s ease;
    font-size: 0.875rem;
}
.submit-button:hover {
    background-color: #4f46e5;
}

.button {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: #116f6f; /* Tailwind color teal-800 */
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
}

.button:hover {
  transform: scale(1.05);
  border-color: #fff9;
}

.button:hover .icon {
  transform: translate(8px);
}

.button:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.button::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}
</style>
