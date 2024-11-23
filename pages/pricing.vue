<template>
    <section class='py-14'>
      <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div class='relative max-w-xl mx-auto text-center'>
          <h3 class='text-gray-800 text-3xl font-semibold sm:text-4xl'>
            Pricing for all sizes
          </h3>
          <div class='mt-3 max-w-xl'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
            </p>
          </div>
        </div>
        <div class='mt-16 grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          <div v-for="(plan, index) in plans" :key="index"
               class="relative flex flex-col items-stretch rounded-xl border-2 mt-6"
               :class="{ 'mt-10': plan.isMostPop }">
            <span v-if="plan.isMostPop"
                  class="absolute top-0 left-0 right-0 mx-auto w-32 -mt-5 px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
              Most popular
            </span>
            <div class="p-8 space-y-4 border-b">
              <span class='text-indigo-600 font-medium'>
                {{ plan.name }}
              </span>
              <div class='text-gray-800 text-3xl font-semibold'>
                ${{ plan.price }} <span class="text-xl text-gray-600 font-normal">/mo</span>
              </div>
              <p>
                {{ plan.desc }}
              </p>
              <button class='px-3 py-3 w-full rounded-lg font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150'>
                Get Started
              </button>
            </div>
            <ul class='p-8 space-y-3'>
              <li class="pb-2 text-gray-800 font-medium">
                Features
              </li>
              <li v-for="(feature, featureIndex) in plan.features" :key="featureIndex"
                  class='flex items-center gap-5'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'PricingComponent',
    data() {
      return {
        plans: [
          {
            name: "Basic plan",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 12,
            isMostPop: false,
            features: [
              "Curabitur faucibus",
              "massa ut pretium maximus",
              "Sed posuere nisi",
              "Pellentesque eu nibh et neque",
              "Suspendisse a leo",
              "Praesent quis venenatis ipsum",
              "Duis non diam vel tortor",
            ],
          },
          {
            name: "Startup",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 35,
            isMostPop: true,
            features: [
              "Curabitur faucibus",
              "massa ut pretium maximus",
              "Sed posuere nisi",
              "Pellentesque eu nibh et neque",
              "Suspendisse a leo",
              "Praesent quis venenatis ipsum",
              "Duis non diam vel tortor",
            ],
          },
          {
            name: "Enterprise",
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            price: 60,
            isMostPop: false,
            features: [
              "Curabitur faucibus",
              "massa ut pretium maximus",
              "Sed posuere nisi",
              "Pellentesque eu nibh et neque",
              "Suspendisse a leo",
              "Praesent quis venenatis ipsum",
              "Duis non diam vel tortor",
            ],
          },
        ]
      };
    },
  };
  </script>