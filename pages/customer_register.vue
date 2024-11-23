<template>
    <div class="bg-white p-6 md:p-10 rounded-xl shadow-xl max-w-5xl mx-auto">
        <h2 class="text-gray-900 text-3xl font-bold mb-8">Register as Customer</h2>
        <form @submit.prevent="createCustomer" class="space-y-8">
            <!-- Personal Information Section -->
            <div>
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Personal Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-gray-600">First Name</label>
                        <input v-model="personality.first_name" type="text" id="firstName" placeholder="John" class="input-field" />
                        <span v-if="validationErrors.first_name" class="error-text">{{ validationErrors.first_name }}</span>
                    </div>

                    <div>
                        <label for="lastName" class="block text-sm font-medium text-gray-600">Last Name</label>
                        <input v-model="personality.family_name" type="text" id="lastName" placeholder="Doe" class="input-field" />
                        <span v-if="validationErrors.family_name" class="error-text">{{ validationErrors.family_name }}</span>
                    </div>

                    <div>
                        <label for="middleName" class="block text-sm font-medium text-gray-600">Middle Name</label>
                        <input v-model="personality.middle_name" type="text" id="middleName" placeholder="A." class="input-field" />
                        <span v-if="validationErrors.middle_name" class="error-text">{{ validationErrors.middle_name }}</span>
                    </div>
                </div>
            </div>

            <!-- Contact Information Section -->
            <div>
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
                <div class="space-y-6">
                    <div class="flex items-center gap-4">
                        <div class="flex-1">
                            <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                            <input v-model="personality.email_address" type="email" id="email" placeholder="email@example.com" class="input-field" @input="resetCode"/>
                            <span v-if="validationErrors.email_address" class="error-text">{{ validationErrors.email_address }}</span>
                        </div>
                        <button @click="sendVerificationCode" type="button" class="button button-primary">
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/876/876777.png"
                            alt="Send Icon"
                            class="w-5 h-5 mr-2"
                        />
                        Verify
                        </button>
                    </div>

                    <div v-if="verificationCodeSent" class="flex items-center gap-4">
                        <div class="flex-1">
                            <label for="verificationCode" class="block text-sm font-medium text-gray-600">Verification Code</label>
                            <input
                                v-model="verificationCode"
                                type="text"
                                id="verificationCode"
                                placeholder="Enter the code"
                                :disabled="isCodeVerified"
                                class="input-field"
                            />
                            <span v-if="validationErrors.verificationCode" class="error-text">{{ validationErrors.verificationCode }}</span>
                        </div>
                        <button @click="verifyCode" type="button" class="button button-success" :disabled="isCodeVerified">
                            <img
                            src="https://cdn-icons-png.flaticon.com/512/876/876777.png"
                            alt="Send Icon"
                            class="w-5 h-5 mr-2"
                        />
                        </button>
                    </div>
                </div>
            </div>

            <!-- Additional Information Section -->
            <div>
                <h3 class="text-xl font-semibold text-gray-700 mb-4">Additional Information</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                        <input v-model="customer.password" type="password" id="password" class="input-field" />
                        <span v-if="validationErrorsForCustomer.password" class="error-text">{{ validationErrorsForCustomer.password }}</span>
                    </div>

                    <div>
                        <label for="telephone" class="block text-sm font-medium text-gray-600">Telephone #</label>
                        <input v-model="personality.telephone_no" type="text" id="telephone" class="input-field" />
                    </div>

                    <div>
                        <label for="birthday" class="block text-sm font-medium text-gray-600">Birthday</label>
                        <input v-model="personality.birthday" type="date" id="birthday" class="input-field" />
                        <span v-if="validationErrors.birthday" class="error-text">{{ validationErrors.birthday }}</span>
                    </div>

                    <div>
                        <label for="gender" class="block text-sm font-medium text-gray-600">Gender</label>
                        <select v-model="personality.gender_code" id="gender" class="input-field">
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                        <span v-if="validationErrors.gender_code" class="error-text">{{ validationErrors.gender_code }}</span>
                    </div>

                    <div>
                        <label for="civilStatus" class="block text-sm font-medium text-gray-600">Civil Status</label>
                        <select v-model="personality.civil_status" id="civilStatus" class="input-field">
                            <option value="1">Married</option>
                            <option value="2">Widowed</option>
                            <option value="3">Single</option>
                        </select>
                        <span v-if="validationErrors.civil_status" class="error-text">{{ validationErrors.civil_status }}</span>
                    </div>

                    <div>
                        <label for="cellphoneNo" class="block text-sm font-medium text-gray-600">Cellphone No</label>
                        <input v-model="personality.cellphone_no" type="text" id="cellphoneNo" class="input-field" />
                        <span v-if="validationErrors.cellphone_no" class="error-text">{{ validationErrors.cellphone_no }}</span>
                    </div>

                    <div>
                        <label for="houseStreet" class="block text-sm font-medium text-gray-600">House/Street</label>
                        <input v-model="personality.house_street" type="text" id="houseStreet" class="input-field" />
                    </div>

                    <div>
                        <label for="purokZone" class="block text-sm font-medium text-gray-600">Purok/Zone</label>
                        <input v-model="personality.purok_zone" type="text" id="purokZone" class="input-field" />
                    </div>

                    <div>
                        <label for="postalCode" class="block text-sm font-medium text-gray-600">Postal Code</label>
                        <input v-model="personality.postal_code" type="text" id="postalCode" class="input-field" />
                    </div>

                    <div>
                        <label for="barangayId" class="block text-sm font-medium text-gray-600">Barangay</label>
                        <select v-model="personality.barangay_id" id="barangayId" class="w-full border rounded-lg px-4 py-2">
                        <option v-for="barangay in state.barangays" :key="barangay.id" :value="barangay.id">
                            {{ barangay.description }}
                        </option>
                        </select>
                        <span v-if="validationErrors.barangay_id" class="text-red-500 text-sm">{{ validationErrors.barangay_id }}</span>
                    </div>

                    <div>
                        <label for="cityId" class="block text-sm font-medium text-gray-600">City</label>
                        <select v-model="personality.city_id" id="cityId" class="w-full border rounded-lg px-4 py-2">
                        <option v-for="city in state.cities" :key="city.id" :value="city.id">
                            {{ city.description }}
                        </option>
                        </select>
                        <span v-if="validationErrors.city_id" class="text-red-500 text-sm">{{ validationErrors.city_id }}</span>
                    </div>

                    <div>
                        <label for="provinceId" class="block text-sm font-medium text-gray-600">Province</label>
                        <select v-model="personality.province_id" id="provinceId" class="w-full border rounded-lg px-4 py-2">
                        <option v-for="province in state.provinces" :key="province.id" :value="province.id">
                            {{ province.description }}
                        </option>
                        </select>
                        <span v-if="validationErrors.province_id" class="text-red-500 text-sm">{{ validationErrors.province_id }}</span>
                    </div>

                    <div>
                        <label for="countryId" class="block text-sm font-medium text-gray-600">Country</label>
                        <select v-model="personality.country_id" id="countryId" class="w-full border rounded-lg px-4 py-2">
                        <option v-for="country in state.countries" :key="country.id" :value="country.id">
                            {{ country.description }}
                        </option>
                        </select>
                        <span v-if="validationErrors.country_id" class="text-red-500 text-sm">{{ validationErrors.country_id }}</span>
                    </div>

                    <div>
                        <label for="passbookNo" class="block text-sm font-medium text-gray-600">Passbook No.</label>
                        <input v-model="customer.passbook_no" type="number" id="passbookNo"  class="w-full border rounded-lg px-4 py-2"  disabled  />
                        <span v-if="validationErrorsForCustomer.passbook_no" class="text-red-500 text-sm">{{ validationErrorsForCustomer.passbook_no }}</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center">
        <button type="submit" class="button button-primary">
          <UserPlusIcon class="w-5 h-5 mr-2" />
          Register
        </button>
        <button type="button" class="button button-cancel" @click="cancelForm">Cancel</button>
      </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref, onMounted } from 'vue';

import { PermissionService } from '~/models/Permission';
import { apiService } from '~/routes/api/API';
import { authService } from '~/components/api/AuthService';

const config = useRuntimeConfig();
const siteKey = config.recaptchaSiteKey; // Get the reCAPTCHA site key

const recaptchaResponse = ref<string | null>(null)

// reCAPTCHA site key (set in .env)
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';

const requirements = ref({});
const selectedRequirements = ref([]);

// Define the structure for a requirement
interface Requirement {
    id: number;
    description: string;
    expiry_date?: string; // Optional expiry date
}

const customerData = ref({
  selectedFees: [], // Tracks selected fee IDs
});

const personality = ref({
    first_name: '',
    family_name: '',
    middle_name: '',
    email_address: '',
    telephone_no: '',
    birthday: '',
    gender_code: '',
    civil_status: '',
    house_street: '',
    cellphone_no: '',
    purok_zone: '',
    postal_code: '',
    barangay_id: '',
    city_id: '',
    country_id: '',
    province_id: '',
    credit_status_id: 2,
    datetime_registered: new Date().toISOString().slice(0, 19).replace('T', ' '),
    name_type: 2, //for customer
    personality_status_code: '', // pending
    notes: 'For Approval',
});


const generatePassbookNo = (length = 6) => {
    const numbers = '0123456789';
    let randomString = '';

    // Generate a random string of numeric characters only
    for (let i = 0; i < length; i++) {
        randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    // Ensure the return value is an integer by removing any prefix
    return parseInt(randomString, 10);
};


const customer = ref({
    group_id: null,
    passbook_no: generatePassbookNo(),
    loan_count_id: 1,
    enable_mortuary: '',
    password: '',
    
});

const state = ref({
barangays: [],
cities: [],
countries: [],
provinces: [],
creditStatuses: [],
groups: [],
personality_status_code: [],
loan_count: [],
fees: [],
statuses: [],
isTableLoading: false,
});


// Function to fetch fees from an API or data source
    async function fetchFees() {
    try {

        const response = await apiService.getFeeActiveNoAuthForReg({});
        // Simulating an API call with hardcoded data
        // Filter the data to include only 'Transaction Fee'
        state.value.fees = response.data.filter(fee => fee.description === 'Membership Fees' || fee.description == 'Membership Fee');

        if(state.value.fees.length > 0 || state.value.fees != null)
        {
            state.value.fees.forEach(element => {
                if(element.description == 'Transaction Fees'){
                    customerData.value.selectedFees.push({
                        id: element.id,
                        amount: element.amount,
                        description: element.description,
                    })
                }
            });
        }

        

    } catch (error) {
        console.error('Error fetching fees:', error);
    }
    }

    // Function to update selected fees based on checkbox state
    function updateSelectedFees(fee, isSelected) {
    
    if (isSelected) {
        if (!customerData.value.selectedFees.some(selected => selected.id === fee.id)) {
        customerData.value.selectedFees.push({
        id: fee.id,
        amount: fee.amount,
        });
    }
    } else {
    customerData.value.selectedFees = customerData.value.selectedFees.filter(id => id !== fee.id);
    }
    }

    // Computed property to calculate total fees of selected items
    const totalFees = computed(() => {
    //return state.value.fees
    // .filter(fee => customerData.value.selectedFees.includes(fee.id))
    // .reduce((total, fee) => total + fee.amount, 0);
    });


const fetchBarangays = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLibraries({}, "barangay");

    state.value.barangays = response.data;
} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchCities = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLibraries({}, "city");

    state.value.cities = response.data;

} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchCountries = async () => {
try {
    const response = await apiService.getRegisterLibraries({}, "country");

    state.value.countries = response.data;
} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchProvinces = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLibraries({}, "province");
    state.value.provinces = response.data;
} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchCreditStatuses = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLibraries({}, "credit_status");
    state.value.creditStatuses = response.data;
} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchGroups = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLibraries({}, "customer_group");

    state.value.groups = response.data;
} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
const fetchLoanCount = async () => {
// Replace with your actual API call
try {
    const response = await apiService.getRegisterLoanCount({});
    state.value.loan_count = response.data;

} catch (error) {
    toast.error(error.message, {
    autoClose: 5000,
    })
}
};
  // Function to fetch user statuses from API
const fetchStatuses = async () => {
try {
    // Fetch status data from API
    const response = await apiService.getRegisterLibraries({}, 'user_account_status'); // Ensure this API endpoint exists
    state.value.statuses = response.data
} catch (error: any) {
    console.error('Error fetching statuses:', error);
}
};

function isValidAge(birthday) {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    return age > 18 || (age === 18 && monthDiff >= 0);
}
function isValidPhilippineNumber(phone) {
    const mobileRegex = /^09\d{9}$/; // 11 digits
    const landlineRegex = /^0\d{7,9}$/; // 7-9 digits
    return mobileRegex.test(phone) || landlineRegex.test(phone);
}

onMounted(async () => {
await Promise.all([
    fetchBarangays(),
    fetchCities(),
    fetchCountries(),
    fetchProvinces(),
    fetchCreditStatuses(),
    fetchGroups(),
    fetchLoanCount(),
    fetchFees(),
    fetchStatuses(),
    customer.value.passbook_no = generatePassbookNo(),
]);
});

const validationErrors = ref({
    first_name: '',
    family_name: '',
    middle_name: '',
    email_address: '',
    birthday: '',
    gender_code: '',
    civil_status: '',
    house_street: '',
    country_id: '',
    cellphone_no: '',
    purok_zone: '',
    postal_code: '',
    barangay_id: '',
    city_id: '',
    province_id: '',
    credit_status_id: '',
    datetime_registered: '',

    group_id: '',
    passbook_no: '',
    loan_count_id: '',
    enable_mortuary: '',

    verificationCode: '',
    });

const validationErrorsForCustomer = ref({
    group_id: '',
    passbook_no: '',
    loan_count_id: '',
    enable_mortuary: '',
    password: '',

    });

const isCodeVerified = ref(false)
const verificationCode = ref('');
const verificationCodeSent = ref(false);
const verificationThreasholdCount = ref(0);
const success = ref(false);


const createCustomer = async () => {
    try {
        if (!isCodeVerified.value) {
            setTimeout(() => {
                toast.error(`You need to verify first your email to be registered`, { autoClose: 3000 })
            }, 3000);
        }

        // Clear previous validation errors
        Object.keys(validationErrors.value).forEach((key) => {
            validationErrors.value[key as keyof typeof validationErrors.value] = '';
        });
        Object.keys(validationErrorsForCustomer.value).forEach((key) => {
            validationErrorsForCustomer.value[key as keyof typeof validationErrorsForCustomer.value] = '';
        });

        // Validate each field in personality and set error if empty
        for (const field in validationErrors.value) {
            if (!personality.value[field as keyof typeof personality.value]) {
                validationErrors.value[field as keyof typeof validationErrors.value] = `Please complete all required fields before proceeding.`;
            }
        }

        // Validate very important fields
        const importantFields = ['first_name', 'family_name', 'email_address', 'birthday', 'gender_code', 'civil_status', 'house_street', 'cellphone_no', 'purok_zone', 'postal_code', 'barangay_id', 'city_id', 'province_id', 'credit_status_id'];
        for (const field of importantFields) {
            if (!personality.value[field]) {
                validationErrors.value[field] = `Please fill in the ${field.replace('_', ' ')} field.`;
                toast.error(`The ${field.replace('_', ' ')} is required!`);
                return;
            }
        }

        // Validate age
        if (!isValidAge(personality.value.birthday)) {
            toast.error("Customer must be at least 18 years old.");
            return;
        }

        // Validate phone numbers
        if (!isValidPhilippineNumber(personality.value.cellphone_no)) {
            toast.error("Please enter a valid Philippine-based phone number.");
            return;
        }

        // Validate verification code and flag
        if (!verificationCode.value || verificationCode.value.length < 0) {
            toast.error("Please enter the verification code.");
            return;
        }

        if (!isCodeVerified.value) {
            toast.error("Customer is not verified.");
            return;
        }

        // Validate fields for customer-specific data
        for (const field in validationErrorsForCustomer.value) {
            if (!customer.value[field as keyof typeof customer.value]) {
                validationErrorsForCustomer.value[field as keyof typeof validationErrorsForCustomer.value] = `Please complete all required fields before proceeding.`;
            }
        }

        // Prepare the data for submission
        const jsonObject = {
            customer: {
                group_id: customer.value.group_id,
                passbook_no: customer.value.passbook_no,
                loan_count: customer.value.loan_count_id,
                enable_mortuary: customer.value.enable_mortuary,
                personality_id: 0,
            },
            personality: {
                datetime_registered: personality.value.datetime_registered,
                family_name: personality.value.family_name,
                middle_name: personality.value.middle_name,
                first_name: personality.value.first_name,
                birthday: personality.value.birthday,
                civil_status: personality.value.civil_status,
                gender_code: personality.value.gender_code,
                house_street: personality.value.house_street,
                purok_zone: personality.value.purok_zone,
                postal_code: personality.value.postal_code,
                telephone_no: personality.value.telephone_no,
                email_address: personality.value.email_address,
                cellphone_no: personality.value.cellphone_no,
                name_type_code: personality.value.name_type,
                personality_status_code: personality.value.personality_status_code,
                barangay_id: personality.value.barangay_id,
                city_id: personality.value.city_id,
                country_id: personality.value.country_id,
                province_id: personality.value.province_id,
                credit_status_id: personality.value.credit_status_id,
                notes: personality.value.notes,
            },
            fees: customerData.value.selectedFees,
            password: customer.value.password,
            recaptchaResponse: recaptchaResponse.value,
        };

        // Create the customer
        const response = await apiService.createRegisterCustomer(jsonObject);
        toast.success("Customer created successfully!", {
            autoClose: 2000,
        });

        success.value = true;
        verificationCode.value = 'Successfully verified!'

        debugger

        // Introduce a delay before navigating
        setTimeout(() => {
            navigateTo('/');
        }, 2000);
    } catch (error) {
        toast.error('Error creating customer');
        toast.error(`${error.message}`, {
            autoClose: 5000,
        });
    }
};

const handleCancel = () => {
// Logic to navigate away or reset the form
navigateTo('/'); // Example navigation
};

// Simulated Methods
const sendVerificationCode = async () => {
    try {
        const params = {
            email: personality.value.email_address,
            phone_number: personality.value.cellphone_no,
            method: 'email.customer',
        }

        const response = await authService.sendVerification(params);

        debugger

        if(response.success == true){
            toast.success(`The verification code has been sent!`, {autoClose: 3000})
            verificationCodeSent.value = true;
            isCodeVerified.value = false;
            verificationCode.value = '';
        }

    } catch (error) {
        toast.error(`${error}`, {autoClose: 3000})
    }
    finally {
        setTimeout(() => {
        }, 3000);
    }
    // Add logic to send the verification code here.
    // On success:
};

const verifyCode = async () => {
    try {
        const params = {
            code: verificationCode.value,
            email: personality.value.email_address,
            method: 'email.customer',
        }

        debugger

        const response = await authService.verifyVerification(params, verificationCode.value);

        if(response.success == true)
        {
            toast.success(`The code has been verified!`, {autoClose: 3000})

            //disable verify field and verify button field
            isCodeVerified.value = true;

            verificationCode.value = 'Successfully Verified!'

        }

    } catch (error) {
        toast.error(`${error}`, {autoClose:3000})
    }
    finally {
        setTimeout(() => {
        }, 3000);
    }
};

const resetCode = () => {
    isCodeVerified.value = false;
    verificationCode.value = 'Verify the code again';
}

function cancelForm() {
    navigateTo('/')
}

// Captcha verification callback
const onCaptchaVerified = (response: string) => {
  recaptchaResponse.value = response
}

</script>


<style scoped>
.input-field {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    background-color: #f9fafb;
    outline: none;
    transition: border-color 0.2s;
}

.input-field:focus {
    border-color: #3b82f6;
    background-color: #ffffff;
}

.error-text {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.button-primary {
    background-color: #2563eb;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 600;
    display: flex;
    align-items: center; /* Corrected property */
    justify-content: center; /* Corrected property */
    transition: background-color 0.2s;
}

.button-primary:hover {
    background-color: #1e40af;
}

.button-secondary {
    background-color: #e5e7eb;
    color: #111827;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 600;
    transition: background-color 0.2s;
}

.button-secondary:hover {
    background-color: #d1d5db;
}

.button-success {
    background-color: #22c55e;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 600;
    display: flex;
    align-items: center; /* Corrected property */
    justify-content: center; /* Corrected property */
    transition: background-color 0.2s;
}

.button-success:hover {
    background-color: #15803d;
}
</style>
