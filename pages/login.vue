<template>
    <main class="w-full h-screen flex">
        <!-- Left Section with Image -->
        <!-- <div class="w-1/2 hidden lg:flex bg-teal-600 items-center justify-center">
            <img src="../img/2019-04-14.jpg" alt="Building Image" class="w-3/4 h-3/4 object-cover rounded-lg shadow-lg opacity-90 transition duration-300 hover:opacity-100 hover:scale-105" />
        </div> -->

        <!-- Right Section with Form -->
        <div class="w-full flex flex-col items-center bg-teal-600 justify-center px-8">
            <div class="max-w-sm w-full text-gray-600 space-y-8 bg-white p-8 rounded-xl shadow-xl">
                <!-- Welcome and Login Form Section -->
                <div v-if="!isAuthenticated" class="text-center space-y-6">
                    <img src="../img/LendCash_Logo-removebg-preview.png" width="120" class="mx-auto" />
                    <div class="mt-4">
                        <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl tracking-tight">Welcome Back!</h3>
                        <p class="text-gray-500">Please log in to your account</p>
                    </div>

                    <form @submit.prevent="login" class="space-y-5">
                        <input v-model="state.email" placeholder="Email" type="email" class="input-field" />
                        <FormError :error="state.error?.email" />

                        <input v-model="state.password" placeholder="Password" type="password" class="input-field" />
                        <FormError :error="state.error?.password" />

                        <button class="button bg-teal-600 text-white font-bold py-2 px-4 mx-auto rounded w-full">
                            Sign In
                        </button>
                    </form>

                    <!-- Forgot Password Link -->
                    <div class="mt-4">
                        <a href="/forgot_password" class="text-teal-500 hover:underline">Forgot your password?</a>
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
                    <button @click="sendVerificationCode" class="send-code-button">Send Code</button>
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
        </div>
    </main>
</template>

<script setup lang="ts">
import { validateForm } from "../components/validator/validator";

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
        const errors = validateForm({ email: state.email,  password: state.password});

        if(errors.email)
        {
            toast.error(`${errors.email}`)   
            return
        }
        if(errors.password)
        {
            toast.error(`${errors.password}`) 
            return
        }

        debugger
        const response = await authService.login({ email: state.email, password: state.password });
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
        toast.error(`${error}`, {autoClose: 3000})
    }
    finally
    {
        setTimeout(() => {

        }, 1000);
    }
};

const setMethod = (method: string) => {
    selectedMethod.value = method;
};

const sendVerificationCode = async () => {
    try {
        debugger
        if(selectedMethod.value.length <= 0)
        {
            toast.error(`Please select a verification method`)   
            return
        }

        debugger
        const params = {
            email: state.email,
            phone_number: state.phone,
            method: selectedMethod.value,
        }
        const response = await authService.sendVerification(params);
        isCodeSent.value = true;
        errorMessage.value = '';
    } catch (error) {
        toast.error(`${error}`, {autoClose: 3000})
    }
    finally
    {
        setTimeout(() => {

        }, 1000);
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
        
        isCodeSent.value = true;
        errorMessage.value = '';
        const response = await authService.sendVerification(params);
        
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
            phone_number: state.phone,
            method: selectedMethod.value,
        }
        const response = await authService.verifyVerification(params, state.code);
        if (response.success) {
            localStorage.setItem("_token", response.data?.token)
            successMessage.value = 'Code verified!';
            toast.success(`Code verified!`)
            setTimeout(() => {
                router.push('/dashboard/');
            }, 4000);
        } else {
            toast.error(`Invalid code`, {autoClose: 3000})
        }
    } catch (error) {
        toast.error(`${error}`, {autoClose: 3000})
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
  transform: translate(4px);
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
