<template>
    <div>
      <NuxtLayout name="admin">
        <main>
          <div class="px-4 space-y-6">

            <!-- Top Row: Total Borrowers, Total Groups, and Amount Receivable Chart -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">

              <!-- Left Side: Total Borrowers and Total Groups -->
              <div class="flex flex-col space-y-4">

                <!-- Card 1: Total Borrowers -->
                <div v-if="total_customers !== null" class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full border border-gray-200">
                  <div class="flex items-center justify-between mb-4">
                    <h1 class="text-4xl font-semibold text-gray-800">{{ total_customers }}</h1>
                    <UserIcon class="text-gray-700 w-8 h-8" />
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold text-gray-700">Total Borrowers</p>
                    <a href="/customers/" class="text-blue-500 font-semibold">View all Customers &gt;</a>
                  </div>
                </div>

                <!-- Card 2: Total Groups -->
                <div v-if="total_groups !== null" class="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between h-full border border-gray-200">
                  <div class="flex items-center justify-between mb-4">
                    <h1 class="text-4xl font-semibold text-gray-800">{{ total_groups }} </h1>
                    <UsersIcon class="text-gray-700 w-8 h-8" />
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold text-gray-700">Total Groups</p>
                    <a href="/customers/group/" class="text-blue-500 font-semibold">View all Groups &gt;</a>
                  </div>
                </div>
              </div>

              <!-- Right Side: Amount Receivable Chart -->
              <div v-if="amount_receivables !== null" class="bg-white shadow-md rounded-lg p-6 flex items-center justify-center h-full border border-gray-200">
                <div class="w-full h-64 flex flex-col items-center justify-center">
                  <p class="text-lg font-semibold text-gray-700 mb-4">Amount Receivable</p>
                  <div class="text-5xl font-bold text-gray-800">₱ {{ amount_receivables ?? 0 }}</div>
                  <p class="text-gray-500">This is a placeholder for the chart</p>
                </div>
              </div>
            </div>

            <!-- Payment History Table -->
            <div v-if="payments.length > 0" class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <p class="text-lg font-semibold text-gray-700 mb-4">Payment History</p>

              <!-- Payment Table -->
              <div class="overflow-x-auto max-h-96">
                <table class="min-w-full bg-white border-collapse">
                  <thead>
                    <tr class="bg-gray-100 text-gray-700">
                      <th class="py-2 px-4 border-b text-left">Family Name</th>
                      <th class="py-2 px-4 border-b text-left">First Name</th>
                      <th class="py-2 px-4 border-b text-left">Middle Name</th>
                      <th class="py-2 px-4 border-b text-left">Amount Paid</th>
                      <th class="py-2 px-4 border-b text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50">
                      <td class="py-2 px-4 border-b">{{ payment.family_name }}</td>
                      <td class="py-2 px-4 border-b">{{ payment.first_name }}</td>
                      <td class="py-2 px-4 border-b">{{ payment.middle_name }}</td>
                      <td class="py-2 px-4 border-b">{{ payment.amount_paid | currency }}</td>
                      <td class="py-2 px-4 border-b">{{ payment.document_status_code }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Payment Schedules Line Chart
            <div v-if="payments.length > 0" class="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <p class="text-lg font-semibold text-gray-700 mb-4">Payment Schedules</p>
              <PaymentSchedulesChart/>
            </div> -->

          </div>
        </main>
      </NuxtLayout>
    </div>
  </template>



  <script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref, onMounted } from "vue";
import { apiService } from '~/routes/api/API';
import PaymentHistoryChart from '../components/dashboard/PaymentHistoryChart/index.vue';
import PaymentSchedulesChart from '../components/dashboard/PaymentSchedulesChart/index.vue';

//   import DashboardCard from './DashboardCard.vue';
import {
Dialog,
DialogPanel,
Disclosure,
DisclosureButton,
DisclosurePanel,
Menu,
MenuButton,
MenuItem,
MenuItems,
TransitionChild,
TransitionRoot,
} from "@headlessui/vue";
import {
Bars3Icon,
BellIcon,
ChartBarSquareIcon,
ChartPieIcon,
Cog6ToothIcon,
CurrencyDollarIcon,
DocumentDuplicateIcon,
FolderIcon,
HomeModernIcon,
TruckIcon,
UsersIcon,
XMarkIcon,
LockClosedIcon,
AdjustmentsHorizontalIcon,
CreditCardIcon,
DocumentTextIcon,
ArrowLongLeftIcon,
FlagIcon,

} from "@heroicons/vue/24/outline";
import { ChevronRightIcon, ShareIcon } from "@heroicons/vue/20/solid";
import {
ChevronDownIcon,
ShoppingBagIcon,
} from "@heroicons/vue/24/outline";
import { UserIcon, UserCircleIcon } from "@heroicons/vue/24/outline";
import { InboxIcon } from "@heroicons/vue/24/outline";
import { ScaleIcon } from "@heroicons/vue/24/solid";
import { KeyIcon } from "@heroicons/vue/20/solid";
import { FireIcon } from "@heroicons/vue/24/solid";
import { BellAlertIcon } from "@heroicons/vue/20/solid";
import { PageNameService } from '~/models/PageName';

const sidebarOpen = ref(false);
const openPeopleDropdown = ref(false);

const name = ref('dashboard');

const navigation = [
{ name: "Dashboard", href: "/dashboard", icon: ChartPieIcon, current: false },

{ name: "Admin Panel", icon: UsersIcon, current: false,
    children: [
        { name: "Staff", href: "/#", icon: UserIcon, current: false },
        { name: "Staff Roles", href: "/#", icon: UserIcon, current: false },
        { name: "Permission", href: "/#", icon: InboxIcon, current: false },
        //  { name: "Staff Email Notification", href: "/#", icon: InboxIcon, current: false },

    ],
},


{ name: "Borrowers", icon: UsersIcon, current: false,
    children: [
        { name: "View Borrowers", href: "/#", icon: ScaleIcon, current: false },
        { name: "View Group Table", href: "/view_group_table", icon: ScaleIcon, current: false },
        { name: "View Group Member", href: "/view_group_member", icon: ScaleIcon, current: false },
        { name: "Add Borrower", href: "/#", icon: UserIcon, current: false },
        { name: "View Borrowers Group", href: "/#", icon: UserIcon, current: false },
    ],
},

{ name: "Loan", icon: ShareIcon, current: false,
    children: [
        { name: "Loan Application", href: "/loan_application", icon: CurrencyDollarIcon, current: false },
        { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
        { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
    ],
},

{ name: "Release Schedules", icon: KeyIcon, current: false,
    children: [
        { name: "Loan Application", href: "/#", icon: CurrencyDollarIcon, current: false },
        { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
        { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
    ],
},
{ name: "Payment", icon: FlagIcon, current: false,
    children: [
        { name: "Loan Application", href: "/#", icon: CurrencyDollarIcon, current: false },
        { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
        { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
    ],
},
{ name: "Report", icon: FireIcon, current: false,
    children: [
        { name: "Loan Application", href: "/#", icon: CurrencyDollarIcon, current: false },
        { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
        { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
    ],
},
{ name: "Help", href: "/#", icon: BellAlertIcon , current: false },

];

const userNavigation = [
{ name: "Your profile", href: "/profile" },
{ name: "Sign out", href: "/" },
];

function togglePeopleDropdown() {
openPeopleDropdown.value = !openPeopleDropdown.value;
}

function closePeopleDropdown() {
openPeopleDropdown.value = false;
}

function navigateTo(href) {
window.location.href = href;
closePeopleDropdown();
}

// Mock payments data (Replace with actual API data)
const payments = ref([]);
const amount_receivables = ref(0);
const total_customers = ref(0);
const total_groups = ref(0);

async function fetchPayments() {
  try {
    const response = await apiService.getGraphDataAll(); // Call your API service for payments
    payments.value = response.data.payments; // Update the payments data
    amount_receivables.value = response.data.total_amount_recievables ?? 0;
    debugger
    total_customers.value = response.data.total_customers ?? 0;
    total_groups.value = response.data.total_groups ?? 0;
  } catch (error) {
    console.error('Error fetching:', error);
  }
}

onMounted(fetchPayments);

// Filter for formatting currency
const currency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

// Filter for formatting date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US'); // Format as 'MM/DD/YYYY'
};
</script>
