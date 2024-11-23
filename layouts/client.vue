<template>
<div class="flex h-screen bg-gray-200">
<!-- Sidebar for mobile -->
<TransitionRoot as="template" :show="sidebarOpen">
  <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
    <TransitionChild
      as="template"
      enter="transition-opacity ease-linear duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity ease-linear duration-300"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-gray-900/80" />
    </TransitionChild>

    <div class="fixed inset-0 flex">
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1 bg-gray-800 shadow-lg rounded-r-lg h-screen">
          <div class="flex grow flex-col gap-y-3 overflow-y-auto text-gray-200 px-4 pb-4">
            <div class="flex h-16 shrink-0 items-center justify-between">
              <img class="h-12 w-auto" src="../img/LendCash_Logo-removebg-preview.png" :alt="name.company" />
              <h1 class="text-lg font-bold text-indigo-400">{{ name.company }}</h1>
              <button @click="sidebarOpen = false" class="text-gray-400 hover:text-white focus:outline-none">
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div v-for="item in menuHeaderTitles" :key="item.headerTitle" class="my-4">
              <template v-if="item.headerTitle">
                <div
                  class="text-gray-400 text-xs uppercase tracking-wide font-semibold px-4 pt-2 select-none pointer-events-none"
                  v-text="item.headerTitle"
                ></div>
              </template>
            </div>

            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-4">
                <li v-for="item in menuItems" :key="item.name" @click="item.subLinks?.length ? toggleChild(item.name) : navigateTo(item.href)">
                  <div>
                    <a
                      href="#"
                      @click.prevent="toggleHighlight(item.name)"
                      :class="{
                        'border-l-4 border-indigo-500 bg-gray-700 text-white': highlightedItem === item.name,
                        'text-gray-400 hover:bg-gray-700 hover:text-white': highlightedItem !== item.name
                      }"
                      class="group flex items-center gap-x-2 rounded-lg p-2 text-sm leading-5 font-semibold transition duration-200"
                    >
                      <component :is="item.icon" class="h-4 w-4" aria-hidden="true" />
                      <span>{{ item.name }}</span>
                      <span class="ml-auto" v-if="item.subLinks?.length">
                        <template v-if="isChildVisible[item.name]">
                          <ChevronUpIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </template>
                        <template v-else>
                          <ChevronDownIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
                        </template>
                      </span>
                    </a>

                    <!-- Child Links -->
                    <Transition
                      name="fade"
                      enter-active-class="transition-opacity duration-300"
                      enter-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-active-class="transition-opacity duration-300"
                      leave-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <ul v-if="isChildVisible[item.name]" class="pl-4">
                        <li v-for="subLink in item.subLinks" :key="subLink.name">
                          <a
                            :href="subLink.href"
                            class="flex items-center text-gray-300 hover:text-indigo-400 p-2 rounded-md transition duration-200"
                          >
                            <component :is="subLink.icon" class="h-4 w-4 ml-1 mr-1" aria-hidden="true" />
                            <span>{{ subLink.name }}</span>
                          </a>
                        </li>
                      </ul>
                    </Transition>
                  </div>
                </li>

                <!-- Settings Link -->
                <li class="mt-auto">
                  <a
                    href="/user_account/profile?settings=settings"
                    class="group flex items-center gap-x-2 rounded-lg p-2 text-sm font-semibold leading-5 text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
                  >
                    <Cog6ToothIcon class="h-5 w-5" aria-hidden="true" />
                    <span>Settings</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </DialogPanel>
      </TransitionChild>
    </div>
  </Dialog>
</TransitionRoot>



<!-- Desktop Sidebar -->
<div
    :class="{'lg:w-100': isChildVisible.home || isChildVisible.about, 'lg:w-50': !isChildVisible.home && !isChildVisible.about}"
    class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col overflow-hidden"
  >
    <div class="flex grow flex-col gap-y-3 bg-gray-900 shadow-lg rounded-r-lg text-gray-200 px-2 pb-4 overflow-hidden">
      <div class="flex items-center justify-center h-16">
        <button @click="toggleSidebar" class="text-gray-400 hover:text-white focus:outline-none">
          <Bars3Icon class="h-8 w-10" aria-hidden="true" />
        </button>
      </div>
      <nav class="flex flex-1 flex-col scrollable">
        <ul role="list" class="flex flex-1 flex-col gap-y-2">

          <!-- Static Header Title -->
          <li v-for="item in menuItems" :key="item.name">
            <template v-if="item.headerTitle">
              <div class="text-gray-500 font-medium text-xs uppercase tracking-wider px-4 py-2">
                {{ item.headerTitle }}
              </div>
            </template>

            <template v-else>
              <!-- Menu Item -->
              <div
                @click="item.subLinks?.length ? toggleChild(item.name) : navigateTo(item.href); toggleHighlight(item.name)"
                :class="{
                  'border-l-4 border-indigo-500 bg-gray-800 text-white': highlightedItem === item.name,
                  'text-gray-400 hover:bg-gray-700 hover:text-white': highlightedItem !== item.name
                }"
                class="cursor-pointer group flex items-center p-2 rounded-lg transition duration-200"
              >
                <component :is="item.icon" class="h-8 w-8" aria-hidden="true" />
                <span
                  :class="{
                    'ml-1 text-sm font-semibold sr-only': item.subLinks && item.subLinks.length || !item.subLinks || !item.subLinks.length
                  }"
                >
                  {{ item.name }}
                </span>
              </div>

              <!-- Submenu -->
              <Transition
                name="fade"
                enter-active-class="transition-opacity duration-300"
                enter-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300"
                leave-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ul v-if="isChildVisible[item.name]" class="pl-4">
                  <li v-for="subLink in item.subLinks" :key="subLink.name">
                    <a
                      :href="subLink.href"
                      class="flex items-center text-gray-300 hover:text-indigo-400 p-2 rounded-md transition duration-200"
                    >
                      <component :is="subLink.icon" class="h-6 w-6 mr-2" aria-hidden="true" />
                      <span class="text-sm sr-only">{{ subLink.name }}</span>
                    </a>
                  </li>
                </ul>
              </Transition>
            </template>
          </li>

          <!-- Settings Link -->
          <li class="mt-auto">
            <a
              href="/user_account/profile?settings=settings"
              class="group flex items-center justify-center rounded-lg p-2 text-sm font-semibold leading-5 text-gray-400 hover:bg-gray-800 hover:text-white transition duration-200"
            >
              <Cog6ToothIcon class="h-6 w-6" aria-hidden="true" />
              <span class="ml-3 sr-only">Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>


<!-- Desktop Sidebar Expanded -->
<Transition
    name="slide"
    enter-active-class="transition-transform duration-300 ease-in-out"
    enter-class="transform -translate-x-full"
    enter-to-class="transform translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in-out"
    leave-class="transform translate-x-0"
    leave-to-class="transform -translate-x-full"
  >
    <div
      v-if="sidebarExpanded"
      class="fixed inset-0 lg:w-64 lg:bg-gray-900 lg:border lg:border-gray-700 z-50 shadow-lg rounded-lg overflow-x-auto overflow-y-auto"
    >
      <!-- Sidebar Header -->
      <div class="flex h-16 items-center justify-between bg-gray-800 shadow-md px-4 rounded-t-lg">
        <img class="h-12 w-auto" src="../img/LendCash_Logo-removebg-preview.png" :alt="name.company" />
        <h1 class="text-lg font-bold text-indigo-400">{{ name.company }}</h1>
        <button @click="toggleSidebar" class="text-gray-400 hover:text-white focus:outline-none">
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <div v-for="item in menuHeaderTitles" :key="item.headerTitle" class="my-4 mb-2">
        <template v-if="item.headerTitle && item.headerTitle.trim() !== ''">
          <div
            class="text-gray-400 text-md uppercase tracking-wide font-semibold px-4 pt-2 select-none pointer-events-none"
            v-text="item.headerTitle"
          ></div>
        </template>
      </div>

      <!-- Navigation Items -->
      <nav class="flex flex-1 flex-col mt-2 scrollable">
        <ul role="list" class="flex flex-1 flex-col gap-y-2 px-4">
          <li v-for="item in menuItems" :key="item.name">
            <!-- Menu Item -->
            <div
              @click="item.subLinks?.length ? toggleChild(item.name) : navigateTo(item.href); toggleHighlight(item.name)"
              :class="{
                'border-l-4 border-indigo-500 bg-gray-800 text-white': highlightedItem === item.name,
                'text-gray-400 hover:bg-gray-700 hover:text-white': highlightedItem !== item.name
              }"
              class="cursor-pointer flex items-center justify-between p-2 rounded-lg text-md font-semibold transition duration-200"
            >
              <div class="flex items-center space-x-2">
                <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                <span class="font-medium">{{ item.name }}</span>
              </div>
              <!-- Only show chevron icons if there are subLinks -->
              <span class="ml-auto" v-if="item.subLinks?.length">
                <template v-if="isChildVisible[item.name]">
                  <ChevronUpIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </template>
                <template v-else>
                  <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </template>
              </span>
            </div>

            <!-- Child Links -->
            <Transition
              name="fade"
              enter-active-class="transition-opacity duration-300 ease-in"
              enter-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-300 ease-out"
              leave-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ul v-if="isChildVisible[item.name]" class="pl-4 space-y-1">
                <li v-for="subLink in item.subLinks" :key="subLink.name">
                  <a
                    :href="subLink.href"
                    class="flex items-center text-gray-300 hover:text-indigo-400 p-2 rounded-md transition duration-200"
                  >
                    <component :is="subLink.icon" class="h-6 w-6 mr-2" aria-hidden="true" />
                    <span>{{ subLink.name }}</span>
                  </a>
                </li>
              </ul>
            </Transition>
          </li>

          <!-- Settings Link -->
          <li class="mt-auto">
            <a
              href="/user_account/profile?settings=settings"
              class="group flex items-left justify-left rounded-lg p-2 text-md font-semibold leading-5 text-gray-400 hover:bg-gray-700 hover:text-white transition duration-200"
            >
              <Cog6ToothIcon class="h-6 w-6" aria-hidden="true" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </Transition>


<!-- Header -->
<div :class="['flex-1', sidebarExpanded ? 'lg:pl-64' : 'lg:pl-16']">
<div class="sticky top-0 z-40 flex h-16 items-center justify-between gap-x-4 border-b border-gray-300 bg-white px-4 shadow-sm sm:gap-x-6 lg:px-8 transition-all duration-300">
<button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
    <span class="sr-only">Open sidebar</span>
    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
</button>
<h1 class="text-lg font-semibold">{{ formattedPageName }}</h1>

<!-- User Dropdown -->
<!-- User Dropdown -->
<div class="relative">
<button
type="button"
@click="toggleDropdown"
class="flex items-center text-gray-700 focus:outline-none"
>
<span v-if="state.user && name.value" class="mr-2">{{ name.value }}</span>
<span v-else class="mr-2">User</span>
<img
    class="h-8 w-8 rounded-full"
    src="https://www.shutterstock.com/image-vector/cute-cat-pixel-style-260nw-2138544923.jpg"
    alt="User Avatar"
/>
</button>
<Transition
enter="transition ease-out duration-100"
enter-from="transform opacity-0 scale-95"
enter-to="transform opacity-100 scale-100"
leave="transition ease-in duration-75"
leave-from="transform opacity-100 scale-100"
leave-to="transform opacity-0 scale-95"
>
<div
    v-if="dropdownOpen"
    class="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
>
    <div class="py-2 flex flex-col items-center">
    <img
        class="h-32 w-32 rounded-full mb-2"
        src="https://www.shutterstock.com/image-vector/cute-cat-pixel-style-260nw-2138544923.jpg"
        alt="User Avatar"
    />
    <span class="font-semibold text-gray-800 text-center mb-2">{{ state.user.last_name }}</span>

    <a
        href="/user_account/profile?settings=profile"
        class="flex items-center justify-center border border-blue-500 text-blue-500 font-medium hover:bg-blue-100 rounded-md px-10 py-1 transition duration-200"
        @click="closeDropdown"
    >
        Profile
    </a>
    <a
        href="/"
        class="flex items-center justify-center border border-red-500 text-red-500 font-medium hover:bg-red-100 rounded-md mt-2 px-10 py-1 transition duration-200"
        @click="closeDropdown"
    >
        Logout
    </a>
    </div>
</div>
</Transition>
</div>

</div>

    <!-- Main content -->
    <div>
<!-- Other layout components like the sidebar, header, etc. -->

<main class="flex-1 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg px-6 py-8 sm:px-8 lg:px-10">
    <div v-if="PageNameService.pageName == 'Dashboard'" class="max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800">Welcome to LendCash!</h2>
    <p class="mt-2 text-gray-600">Here you can manage your loans, payments, and more.</p>
    </div>
    <slot />
</main>
</div>
    </div>
</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { ref } from 'vue';
import { Dialog, TransitionRoot } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, HomeIcon, InformationCircleIcon, Cog6ToothIcon, CreditCardIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';
import { ChartPieIcon, UsersIcon, BookOpenIcon, CurrencyDollarIcon, KeyIcon, FlagIcon, FireIcon, BellAlertIcon, ShareIcon,DocumentCheckIcon  } from '@heroicons/vue/24/outline';
import { PageNameService } from '~/models/PageName';
import { apiService } from '~/routes/api/API';
import { UserService } from '~/models/User';
import { authService } from '~/components/api/AuthService';

const sidebarOpen = ref(false);
const dropdownOpen = ref(false);
const sidebarExpanded = ref(false);
const isChildVisible = ref({ home: false, about: false });
const selectedMenu = ref<string | null>(null);
const hoveredItem = ref<string | null>(null);
const highlightedItem = ref<string | null>(null);

const route = useRoute();

const toggleDropdown = () => {
dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
dropdownOpen.value = false;
};

const toggleSidebar = () => {
sidebarExpanded.value = !sidebarExpanded.value;
};

// Menu items data
const menuHeaderTitles = ref([
{
    headerTitle: '',
},
]);
const menuItems = ref([
{
name: 'Dashboard',
icon: ChartPieIcon,
href: '/dashboard',
},
]);

const state = {
user: [],
}

const name = reactive({
value: '',
company: 'LendCash',
})



const toggleChild = (child) => {
// Toggle the child visibility
isChildVisible.value[child] = !isChildVisible.value[child];

// Adjust the width only if the child is being opened
if (isChildVisible.value[child]) {
// Check if any child is already visible
for (let key in isChildVisible.value) {
    if (key !== child && isChildVisible.value[key]) {
    isChildVisible.value[key] = false; // Close other child if needed
    }
}
}

if (selectedMenu.value === name) {
selectedMenu.value = null;
} else {
selectedMenu.value = name;
}
};

const toggleHighlight = (itemName: string) => {
if (highlightedItem.value === itemName) {
highlightedItem.value = null; // Toggle off if already highlighted
} else {
highlightedItem.value = itemName; // Highlight the clicked item
}
};

const formattedPageName = computed(() => {
// Extract the path segment for the current page
const pageName = route.path.split('/')[1] || 'dashboard';

// Replace underscores with spaces, make uppercase
return pageName.replace(/_/g, ' ').toUpperCase();
});


function isPageNameTrue(): string {
return PageNameService.pageName;
}

async function AUTH_USER(){
try {

    const response = await apiService.checkUserAuthentication({});

} catch (error) {
    toast.error(`${error}`, {autoClose: 5000})
}
}

async function userDetails(){
try {

    const response = await apiService.getOwnUserDetailsdNoAUTH({});

    //set the value of the user
    state.user = response.data;

    //set the name value
    name.value = response.data.first_name ?? 'No User';

    //set globally
    UserService.first_name = response.data.first_name;
    UserService.last_name = response.data.last_name;
    UserService.middle_name = response.data.middle_name;
    UserService.usr_id = response.data.id;

} catch (error) {
    console.log(`${error}`)
}
}

onMounted(() => {

//check if user is auth
//AUTH_USER();

//get the user details
userDetails();

//set interval
const user_details_interval = setInterval(userDetails, 2000);
setTimeout(() => {
    clearInterval(user_details_interval);
}, 2100);
})
</script>

<style scoped>
.logo-container {
margin-top: 50%; /* Adjust this value as needed */
}

body {
font-family: 'Arial', sans-serif; /* Use a clean sans-serif font */
}

.bg-gray-900 {
background-color: #2c2f33; /* Darker background for modern feel */
}

.text-gray-200 {
color: #dcdcdc; /* Lighter text for contrast */
}

.text-gray-400 {
color: #b9bbbe; /* Slightly lighter text */
}

.text-gray-300 {
color: #b9bbbe; /* Uniform color for text in expanded sidebar */
}

.hover\:bg-gray-800:hover {
background-color: #23272a; /* Darker hover state */
}

.bg-gray-900 {
background-color: #1e1e2f; /* Darker background for modern feel */
}

.text-indigo-400 {
color: #3f83f8; /* Brand color for the sidebar header */
}

.text-gray-300 {
color: #b9bbbe; /* Text color for links */
}

.hover\:text-indigo-400:hover {
color: #3f83f8; /* Hover color for links */
}

.transition-transform {
transition: transform 0.3s ease; /* Smooth transition for sidebar */
}
/* Sidebar Transition */
.sidebar-enter-active, .sidebar-leave-active {
transition: transform 0.3s ease, opacity 0.3s ease;
}
.sidebar-enter, .sidebar-leave-to /* .sidebar-leave-active in <2.1.8 */ {
transform: translateX(-100%);
opacity: 0;
}

/* Dropdown Menu Transition */
.dropdown-enter-active, .dropdown-leave-active {
transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter, .dropdown-leave-to /* .dropdown-leave-active in <2.1.8 */ {
opacity: 0;
transform: translateY(-10px);
}

/* Button Hover Effects */
.button-hover:hover {
background-color: rgba(255, 255, 255, 0.1); /* Darken on hover */
transition: background-color 0.3s ease;
}

/* Sidebar Background */
.sidebar {
background-color: #1f2937; /* Gray 800 */
}

/* Dropdown Menu Styling */
.dropdown {
background-color: #fff; /* White */
border-radius: 0.375rem; /* Rounded */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Header Transition */
.header-transition {
transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Main Content Transition */
.main-content {
transition: padding-left 0.3s ease; /* Smooth transition for content when sidebar opens/closes */
}

/* Active Link Animation */
.nav-link-active {
color: #4f46e5; /* Indigo */
font-weight: bold;
transition: color 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
opacity: 0;
transform: translate(-100%);
}
.slide-enter-active, .slide-leave-active {
transition: transform 0.3s ease-in-out;
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
transform: translateX(-100%);
}

/* Hide scrollbar for all elements but keep the scrollable functionality */
.scrollable {
overflow-y: scroll; /* Enable vertical scrolling */
overflow-x: hidden; /* Disable horizontal scrolling */
}

/* Hide scrollbar for Webkit browsers */
.scrollable::-webkit-scrollbar {
display: none; /* Hide scrollbar */
}

/* For Firefox */
.scrollable {
scrollbar-width: none; /* Hide scrollbar */
}


</style>
