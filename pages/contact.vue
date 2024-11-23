<template>
    <section class="py-14">
  <div class="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
    <div class="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
      <div class="max-w-lg space-y-3">
        <h3 class="text-indigo-600 font-semibold">
          Contact
        </h3>
        <p class="text-gray-800 text-3xl font-semibold sm:text-4xl">
          Let us know how we can help
        </p>
        <p>
          We’re here to help and answer any question you might have, We look forward to hearing from you! Please fill out the form, or use the contact information below.
        </p>
        <div>
          <ul class="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
            {#each contactMethods as item, index (index)}
              <li class="flex items-center gap-x-3">
                <div class="flex-none text-gray-400">{@html item.icon}</div>
                <p>{item.contact}</p>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
        <form on:submit|preventDefault={handleSubmit} class="space-y-5">
          <div>
            <label class="font-medium">
              Full name
            </label>
            <input type="text" bind:value={form.fullName} required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div>
            <label class="font-medium">
              Email
            </label>
            <input type="email" bind:value={form.email} required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div>
            <label class="font-medium">
              Company
            </label>
            <input type="text" bind:value={form.company} required class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
          </div>
          <div>
            <label class="font-medium">
              Message
            </label>
            <textarea bind:value={form.message} required class="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"></textarea>
          </div>
          <button type="submit" class="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

</template>

<script>
  let contactMethods = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>`,
      contact: "Support@example.com"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>`,
      contact: "+1 (555) 000-000"
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>`,
      contact: "Mountain View, California, United States."
    },
  ];

  let form = {
    fullName: '',
    email: '',
    company: '',
    message: ''
  };

  function handleSubmit() {
    // Handle form submission
    console.log("Form submitted", form);
  }
</script>

