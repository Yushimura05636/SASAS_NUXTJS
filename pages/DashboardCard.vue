<template>
    <div class="w-full sm:w-1/4 xl:w-1/4 mb-4">
      <div class="relative flex items-center justify-between px-6 py-4 shadow-md rounded-xl bg-white border border-gray-300 h-32">
        <div class="flex items-center">
          <div class="p-3 rounded-md bg-gray-800">
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                :d="iconPath"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h4 class="text-xl font-bold text-gray-800">{{ value }}</h4>
            <p class="text-gray-500 text-sm">{{ title }}</p>
          </div>
        </div>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm rounded">
          <a :href="viewLink">View</a>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      },
      viewLink: {
        type: String,
        default: "#"
      }
    },
    computed: {
      iconPath() {
        return this.icon;
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    transition: transform 0.3s ease-in-out;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  </style>