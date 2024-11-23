<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm z-50">
      <div class="bg-gradient-to-b from-green-600 to-green-700 rounded-lg shadow-2xl max-w-md w-full relative transform transition-all duration-500 ease-in-out">

        <!-- Bottom Section (Green) with Employee Login Button -->
        <div class="bg-teal-900 p-4 rounded-b-lg flex items-center justify-center rounded-lg">
            <span class="text-white">Login</span>
          <div class="w-full flex items-center justify-between bg-transparent text-white py-3 px-4 rounded-lg"></div>
        </div>
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-white text-2xl font-bold hover:text-gray-200 transition transform hover:scale-110">
          ×
        </button>

        <!-- Center Section (White Background) -->
        <div class="bg-white p-8 text-center shadow-inner">

          <!-- Modal Header -->
          <h2 class="text-gray-800 text-2xl font-bold mb-8 text-center tracking-wide">
          </h2>

          <!-- Client Login Button -->
          <button
            @click="clientLogin"
            class=" button flex items-center justify-center w-full bg-teal-700 text-white py-5 rounded-full mb-8 hover:bg-teal-800 transition duration-300 transform hover:scale-105 shadow-lg text-lg font-semibold">
            <span>Client</span>
          </button>
        </div>

        <!-- Bottom Section (Green) with Employee Login Button -->
        <div class="bg-teal-900 p-1 rounded-b-lg flex items-center justify-center">
          <button
            @click="employeeLogin"
            class="button2 w-full flex items-center justify-between bg-transparent text-white py-2 px-4 rounded-lg hover:bg-teal-800 transition duration-300 transform hover:scale-105 shadow-lg text-base font-medium">
            <span>Employee Log in</span>
            <span class="text-xl font-bold">&rsaquo;</span>
          </button>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
props: {
    show: Boolean,
},
methods: {
    closeModal() {
        this.$emit("close");
    },
    employeeLogin() {
        this.$emit("employeeLogin");
    },
    clientLogin() {
        this.$emit("clientLogin");
    },
},
};
</script>

<style scoped>
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
  border-color: rgba(8, 243, 220, 0.844);
}

.button:hover .icon {
  transform: translate(4px);
}

.button:hover::before {
  animation: shine 2s ease-out infinite;
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

.button2:hover {
  transform: scale(1.05);
  border-color: rgba(8, 243, 220, 0.844);
}

.button2:hover .icon {
  transform: translate(4px);
}

.button2:hover::before {
  animation: shine 2s ease-out infinite;
}

.button2::before {
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
