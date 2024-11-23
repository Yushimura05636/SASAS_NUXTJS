<template>
    <NuxtLayout name="admin">
      <main class="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <!-- Header -->
        <section class="mb-6">
          <h1 class="text-xl sm:text-2xl font-semibold">
            Welcome, <span class="font-bold text-gray-700">Loan Releasing Manager</span>
          </h1>
          <p class="text-gray-500 text-xs sm:text-sm">
            Current time in Philippines: {{ philippineTime }}
          </p>
        </section>
        
        <!-- Statistics Cards -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white p-4 rounded-lg shadow-md text-center">
            <p class="text-gray-500 font-bold">Total Payments</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-700">102</h2>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md text-center">
            <p class="text-gray-500 font-bold">Loans To Collect</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-700">83</h2>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md text-center">
            <p class="text-gray-500 font-bold">Total Collections</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-700">68</h2>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md text-center">
            <p class="text-gray-500 font-bold">Pending payments</p>
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-700">71</h2>
          </div>
        </section>
        
        <!-- Charts Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <!-- Income per Day Chart -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-base sm:text-lg font-semibold text-gray-700">Income per day</h3>
              <span class="text-gray-500 text-xs sm:text-sm">i</span>
            </div>
            <!-- Placeholder for Chart -->
            <div class="h-40 sm:h-48 bg-blue-100 rounded-md flex items-center justify-center">
              <p class="text-gray-500">[Income per Day Chart Placeholder]</p>
            </div>
          </div>
          
          <!-- New Applications Chart -->
          <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-base sm:text-lg font-semibold text-gray-700">New applications</h3>
              <span class="text-gray-500 text-xs sm:text-sm">LAST 7 DAYS</span>
            </div>
            <!-- Placeholder for Chart -->
            <div class="h-40 sm:h-48 bg-yellow-100 rounded-md flex items-center justify-center">
              <p class="text-gray-500">[New Applications Chart Placeholder]</p>
            </div>
          </div>
        </section>
      </main>
    </NuxtLayout>
  </template>
  

<script setup>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { ref } from "vue";
import { apiService } from '~/routes/api/API';
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


const navigation = [
// { name: "Dashboard", href: "/dashboard", icon: ChartPieIcon, current: false },

{ name: "Receive Loan Approval", icon: UsersIcon, current: false,
    children: [
        { name: "", href: "/#", icon: UserIcon, current: false },
        { name: "", href: "/#", icon: UserIcon, current: false },
        { name: "", href: "/#", icon: InboxIcon, current: false },
        //  { name: "Staff Email Notification", href: "/#", icon: InboxIcon, current: false },

    ],
},


// { name: "Borrowers", icon: UsersIcon, current: false,
//     children: [
//         { name: "View Borrowers", href: "/#", icon: ScaleIcon, current: false },
//         { name: "View Group Table", href: "/view_group_table", icon: ScaleIcon, current: false },
//         { name: "View Group Member", href: "/view_group_member", icon: ScaleIcon, current: false },
//         { name: "Add Borrower", href: "/#", icon: UserIcon, current: false },
//         { name: "View Borrowers Group", href: "/#", icon: UserIcon, current: false },
//     ],
// },

// { name: "Loan", icon: ShareIcon, current: false,
//     children: [
//         { name: "Loan Application", href: "/loan_application", icon: CurrencyDollarIcon, current: false },
//         { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
//         { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
//     ],
// },

// { name: "Release Schedules", icon: KeyIcon, current: false,
//     children: [
//         { name: "Loan Application", href: "/#", icon: CurrencyDollarIcon, current: false },
//         { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
//         { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
//     ],
// },
// { name: "Payment", icon: FlagIcon, current: false,
//     children: [
//         { name: "Loan Application", href: "/#", icon: CurrencyDollarIcon, current: false },
//         { name: "Loan Release", href: "/#", icon:  CreditCardIcon, current: false },
//         { name: "Payment Schedule", href: "/#", icon: CreditCardIcon, current: false },
//     ],
// },
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
const philippineTime = ref('')
const stats = ref({
  pendingApplications: 0,
  unresolvedTasks: 0,
  unreadEmails: 0,
  pendingPayments: 0
})

// Mock function to simulate fetching data from an API
const fetchStatistics = async () => {
  try {
    const response = await fetch('https://disease.sh/v3/covid-19/all')
    const data = await response.json()

    stats.value.pendingApplications = data.cases           // Total COVID cases
    stats.value.unresolvedTasks = data.deaths              // Total deaths
    stats.value.unreadEmails = data.recovered              // Total recovered
    stats.value.pendingPayments = data.active              // Active cases
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
  }
}

// Function to update Philippine time
const updatePhilippineTime = () => {
  const date = new Date()
  const options = { timeZone: 'Asia/Manila', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  philippineTime.value = date.toLocaleString('en-US', options)
}

// Fetch statistics and time on component mount
onMounted(() => {
  fetchStatistics()
  updatePhilippineTime()
  setInterval(updatePhilippineTime, 1000) // Update time every second
})
</script>
