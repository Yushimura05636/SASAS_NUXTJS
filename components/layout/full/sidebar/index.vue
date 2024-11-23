<template>
    <v-navigation-drawer
        v-model="drawer"
        left
        elevation="0"
        app
        class="leftSidebar"
    >
        <!-- Logo part -->
        <div class="pa-5">
            <LayoutFullLogo />
        </div>

        <!-- Navigation -->
        <div>
            <div class="overflow-y-auto max-h-[calc(100vh-160px)]"> <!-- Use max-height to create a scrollable area -->
                <v-list class="pa-6">
                    <!-- Menu Loop -->
                    <template v-for="(item, i) in sidebarMenu" :key="item.title">
                        <!-- Item Sub Header -->
                        <LayoutFullVerticalSidebarNavGroup v-if="item.header" :item="item" />

                        <!-- Parent Item with Child Menu -->
                        <v-list-group
                            v-if="item.children"
                            v-model="item.isOpen"
                            class="leftPadding"
                            :prepend-icon="false"
                            no-action
                        >
                            <!-- Parent Menu Item -->
                            <template v-slot:activator="{ props }">
                                <v-list-item
                                    v-bind="props"
                                    class="mb-1"
                                    :class="{ 'active-item': isActive }"
                                    density="compact"
                                    min-height="45"
                                    rounded
                                    variant="text"
                                    @click="toggleActive"
                                >
                                    <template v-slot:prepend>
                                        <!-- Window Icon -->
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="icon-tabler icon-tabler-app-window"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/>
                                            <path d="M6 8h.01"/>
                                            <path d="M9 8h.01"/>
                                        </svg>
                                    </template>

                                    <v-list-item-title class="mr-auto">{{ item.title }}</v-list-item-title>

                                    <template v-slot:append>
                                        <i class="mdi-chevron-up mdi v-icon" :class="{ 'rotate-icon': !item.isOpen }"/>
                                    </template>
                                </v-list-item>
                            </template>

                            <!-- Child Menu Items -->
                            <v-list-item
                                v-for="(child, index) in item.children"
                                :key="index"
                                :href="child.href"
                                link
                                class="mb-1"
                                density="compact"
                                min-height="45"
                                rounded
                                variant="text"
                            >
                                <template v-slot:prepend>
                                    <!-- Dot Icon -->
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="icon-tabler icon-tabler-point"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                                    </svg>
                                </template>

                                <v-list-item-title v-if="child.title">{{ child.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>

                        <!-- Single Item -->
                        <LayoutFullVerticalSidebarNavItem
                            v-else-if="!item.children && item.title"
                            :item="item"
                            class="leftPadding"
                        />
                    </template>
                </v-list>
                <div class="pa-4">
                    <LayoutFullVerticalSidebarExtraBox />
                </div>
            </div>
        </div>
    </v-navigation-drawer>

    <!-- Header -->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <!-- Toggle Button -->
                <v-btn
                    icon
                    variant="flat"
                    size="small"
                    @click="toggleDrawer"
                    class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
                >
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <!-- Notification -->
                <LayoutFullVerticalHeaderNotificationDD />
            </div>
            <div>
                <!-- Upgrade button -->
                <v-btn
                    class="mr-2 bg-primary"
                    href="https://adminmart.com/templates/nuxtjs/"
                    target="_blank"
                >
                    Download Free
                </v-btn>
                <!-- User Profile -->
                <LayoutFullVerticalHeaderProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, shallowRef, onUnmounted, onMounted } from 'vue';
import sidebarItems from '../vertical-sidebar/sidebarItem'; // Adjust the import path as necessary
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { Menu2Icon } from 'vue-tabler-icons';
import UserBottom from '../user-buttom/index.vue';

const sidebarMenu = shallowRef(sidebarItems);
const drawer = ref(true);

// Toggle drawer
const toggleDrawer = () => {
    drawer.value = !drawer.value;
};

const sidebarHeight = ref(window.innerHeight - 100); // Adjust for other elements

onMounted(() => {
    window.addEventListener('resize', updateSidebarHeight);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSidebarHeight);
});

const updateSidebarHeight = () => {
    alert(1)
    sidebarHeight.value = window.innerHeight - 100;
    console.log(sidebarHeight.value)
};

</script>


<style scoped>
.leftPadding {
    padding-left: 0px;
}

/* Remove top padding for the entire list */
.pa-6 {
    padding: 0;
}

/* Adjust margins to reduce spacing between items */
.mb-1 {
    margin-bottom: 0;
}

/* Specific styling for headers */
.header {
    margin: 0;
    padding: 0;
}

/* Adjust the height of the header, if necessary */
.v-app-bar {
    height: auto;
    padding: 0;
}

/* Specific styles for list items */
.v-list-item {
    margin-top: 0;
    margin-bottom: 0;
    padding: 10px 15px;
}

/* Add transition for smooth sidebar toggle */
.v-navigation-drawer {
    transition: transform 0.3s ease-in-out;
}

.v-navigation-drawer--hidden {
    transform: translateX(-100%);
}

/* Set max height of scrollable area */
.scrollnavbar {
    max-height: calc(100vh - 160px); /* Adjust based on header/footer space */
    overflow-y:unset;
    overflow-wrap: inherit;
}

/* Adjust the sidebar scroll track */
.scrollnavbar .ps__rail-y {
    right: 4px; /* Position closer or further from the right edge */
    width: 8px; /* Adjust width of scrollbar track */
}

/* Customize the scrollbar thumb appearance */
.scrollnavbar .ps__thumb-y {
    background-color: #888; /* Customize color */
    border-radius: 4px; /* Round the edges */
    width: 8px;
}

.scrollnavbar .ps__rail-y:hover .ps__thumb-y {
    background-color: #555; /* Darken on hover for a better UX */
}
</style>
