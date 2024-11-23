<template>

  <div class="bg-white">
    <header class="py-8 px-4 md:px-16">
  <div class="container mx-auto flex justify-between items-center scroll-pop">
    <a href="/" class="block">
      <div class="flex items-center gap-2">
        <img src="../img/LendCash_Logo-removebg-preview.png" class="w-20" alt="logo">
        <p class="text-2xl font-serif text-teal-950">LendCash</p>
      </div>
    </a>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <!-- FEATURES -->
    <nav class="hidden md:flex gap-10">
    <div class="relative nav-item">
        <a href="features" class="text-gray-600 hover:text-teal-600 font-bold">Features</a>
<div class="info-box">
    <section class="features-section py-12 bg-teal-50">
        <h2 class="text-2xl font-bold text-center text-teal-600 mb-8">Microfinance Features</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    <div v-for="feature in features" :key="feature.title" class="feature-card p-6 text-center bg-white rounded-lg shadow-md">
      <h3 class=" text-lg font-semibold text-teal-600 mb-2">{{ feature.title }}</h3>
      <p class="text-sm text-gray-600">{{ feature.description }}</p>
    </div>
  </div>
</section>

  <div class="additional-info text-center mt-6">
    <h3 class="text-lg font-semibold text-teal-600 mb-2">Why Microfinance Matters</h3>
    <p class="text-medium text-gray-600">
      Microfinance plays a critical role in promoting financial inclusion by providing small loans and financial services to individuals and businesses that lack access to traditional banking. It empowers entrepreneurs to start or expand small businesses, contributing to economic growth and job creation. Additionally, microfinance institutions often offer training and support to help clients manage their finances effectively, fostering sustainable development.
    </p>
    <h3 class="text-lg font-semibold text-teal-600 mb-2">Key Services Offered</h3>
    <ul class="list-disc list-inside text-medium text-gray-600">
      <li>MICROLOANS: Small, low-interest loans designed for those without access to conventional credit.</li>
      <li>GROUP LENDING: Allowing clients to form groups to borrow collectively, reducing risk for lenders.</li>
      <li>WEBSITE SERVICES: Implementing website solutions to improve accessibility for clients.</li>
    </ul>
  </div>
</div>
</div>

<!-- ABOUT Section -->
<div class="relative nav-item">
    <a href="/about" class="text-gray-600 hover:text-teal-600 font-bold">About</a>
    <div class="info-box">
      <h2 class="text-2xl font-bold text-center text-teal-600 mb-8">About Us</h2>

      <!-- About Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-8xl mx-auto">
        <div
          v-for="aboutItem in aboutDetails"
          :key="aboutItem.title"
          class="about-card p-6 text-center bg-white rounded-lg shadow-md"
        >
          <div class="feature-icon mb-4">
            <component :is="aboutItem.icon" class="w-12 h-12 text-teal-600 mx-auto" />
          </div>
          <h3 class="text-lg font-semibold text-teal-600 mb-2">{{ aboutItem.title }}</h3>
          <p class="text-medium text-gray-600">{{ aboutItem.description }}</p>
        </div>
      </div>

      <!-- Mission -->
      <div class="additional-info text-center mt-6">
        <h3 class="text-lg font-bold text-teal-600 mb-2">MISSION</h3>
        <h4 class="text-lg font-bold text-teal-600 mb-2">{{ mission.title }}</h4>
        <h5>"{{ mission.subtitle }}"</h5>
        <p class="text-medium text-gray-600">{{ mission.description }}</p>

        <!-- Vision -->
        <h3 class="text-lg font-bold text-teal-600 mb-2">VISION</h3>
        <h4 class="text-lg font-bold text-teal-600 mb-2">{{ vision.title }}</h4>
        <h5>"{{ vision.subtitle }}"</h5>
        <p class="text-medium text-gray-600">{{ vision.description }}</p>

        <!-- History -->
        <h3 class="text-lg font-bold text-teal-600 mb-2">History Background of LendCash</h3>
        <p class="text-medium text-gray-600">{{ history }}</p>

        <!-- Impact -->
        <h3 class="text-lg font-semibold text-teal-600 mb-2">Impact on Communities</h3>
        <p class="text-medium text-gray-600">{{ impact }}</p>
      </div>

      <!-- Team Section -->
      <h3 class="text-lg font-semibold text-teal-600 mb-2">Meet Our Team</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="member in team"
          :key="member.name"
          class="team-member p-4 bg-white rounded-lg shadow-md text-center"
        >
          <img :src="member.image || placeholderImage" :alt="member.name" class="w-24 h-24 rounded-full mx-auto mb-2" />
          <h4 class="font-bold text-teal-600">{{ member.name }}</h4>
          <p class="text-sm text-gray-600">{{ member.role }}</p>
          <p class="text-xs text-gray-500">{{ member.description }}</p>
          <div class="social-media mt-2">
            <a :href="member.facebook" target="_blank" class="text-gray-600 hover:text-teal-600 mx-2">
              <i class="fab fa-facebook"></i>
            </a>
            <a :href="`mailto:${member.email}`" class="text-gray-600 hover:text-teal-600 mx-2">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

        <!-- CONTACT -->
    <div class="relative nav-item">
      <a href="contact" class="text-gray-600 hover:text-teal-600 font-bold">Contact</a>
      <div class="info-box">
        <section class="contact-us py-12 bg-teal-50">
    <h2 class="text-2xl font-bold text-center text-teal-700 mb-8">Contact Us: LendCash Microfinance</h2>
    <p class="text-center text-gray-600 mb-4">
        At LendCash, we are dedicated to empowering individuals and small businesses through accessible financial solutions.
        Whether you have questions about our lending system, need assistance, or want to share feedback, we’re here to help!
    </p>

    <h3 class="text-lg font-semibold text-teal-600 mb-4">Our Lending System</h3>
    <ul class="list-disc list-inside mb-6 text-gray-600">
        <li><strong>Microloans</strong>: Small loans designed for individuals and entrepreneurs to start or grow their businesses.</li>
        <li><strong>Group Lending</strong>: Allowing clients to form groups to borrow collectively, reducing risk for lenders.</li>
        <li><strong>Website Services</strong>: Implementing website solutions to improve accessibility for clients.</li>
    </ul>

    <h3 class="text-lg font-semibold text-teal-600 mb-4">Get in Touch</h3>
    <div class="contact-info mb-6">
        <p><strong>Customer Support:</strong></p>
        <p>Phone: +1-800-555-0199</p>
        <p>Email: <a href="mailto:ERD@lendcash.com" class="text-teal-600">ERD@lendcash.com</a></p>
        <p>Office Hours: Monday to Friday, 9 AM - 5 PM (EST)</p>
    </div>

    <h3 class="text-lg font-semibold text-teal-600 mb-4">Visit Us:</h3>
    <p>Location: Acacia-Magsaysay, Davao City, Philippines</p>

    <h3 class="text-lg font-semibold text-teal-600 mb-4">Follow Us on Social Media:</h3>
    <div class="social-media">
        <a href="https://www.facebook.com/lendcash" class="text-green-600">Facebook</a> |
        <a href="https://www.instagram.com/lendcash" class="text-green-600">Instagram</a>
    </div>

    <h3 class="text-lg font-semibold text-teal-600 mb-4">Feedback & Inquiries</h3>
    <p class="text-gray-600 mb-4">
        We value your input! If you have suggestions, comments, or questions, please reach out through our contact form on our website or send us an email.
        We strive to respond to all inquiries within 24 hours.
    </p>

    <p class="text-center text-gray-600 mt-6">
        Join us in our mission to empower dreams through microfinance. Together, we can make a difference!
    </p>
</section>

      </div>
    </div>
  </nav>
    <div class="flex flex-col md:flex-row items-center gap-4 pop-in">
      <button
      @click="toggleModal"
      class=" button w-full md:w-auto bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 animate__animated animate__pulse animate__infinite flex justify-center items-center whitespace-nowrap"
        >
      Log in
      </button>
      <LoginModal
      :show="showModal"
      v-if="showModal"
      @close="showModal = false"
      @employeeLogin="employeeLogin"
      @clientLogin="clientLogin"
      />
    </div>

  </div>
</header>

<main class="py-16 px-4 md:px-16">
    <div class="container mx-auto flex flex-col md:flex-row gap-16 scroll-pop">
    <div class="md:w-1/2">
      <h2 class="text-5xl font-bold text-teal-600 mb-4">LendCash Microfinance System for ERD Financial Solution</h2>
      <p class="text-l font-mono text-gray-600 mb-8">An Online Microfinance Lending System designed to empower individuals and small businesses by providing quick and easy access to financial services.</p>
      <a href="customer_register">
        <div class="flex items-center gap-4">
          <button class="button">
                Register to Loan!
                <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                <path
                  clip-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  fill-rule="evenodd"
                ></path>
              </svg>
          </button>
        </div>
    </a>
    </div>
    <div class="md:w-1/2 flex justify-center items-center animate__animated animate__zoomIn">
      <img src="../img/handsakebg_1sect.jpg" alt="LendCash" class="w-full h-auto rounded-lg shadow-lg">
    </div>
</div>

    <div class="relative bg-cover bg-no-repeat">
  <div class="container mx-auto mt-16 mb-24 scroll-pop text-center">
    <h3 class="text-6xl font-bold text-teal-600 mb-6">LendCash Offers</h3>
    <p class="text-l font-mono text-gray-500 mb-10">Creating Opportunities, One Microloan at a Time!</p>

    <div class="flex justify-center pop-in"> <!-- Flexbox added to center the grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/grouping.png" alt="Group Lending" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">Group Lending</h4>
          <p class="text-gray-600 font-serif text-center">Offers small groups of individuals the opportunity to come together to access financial services, guaranteeing each other's loans and fostering a sense of shared responsibility and mutual support.</p>
        </div>

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/no-hidden-fees.png" alt="No Surcharges" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">No Surcharges</h4>
          <p class="text-gray-600 font-serif text-center">Providing loans and financial services without hidden fees ensures transparency, making financial products more accessible and affordable.</p>
        </div>

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/no-collaretal.png" alt="No Collateral" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">No Collateral</h4>
          <p class="text-gray-600 font-serif text-center">Access credit and financial services without the need for collateral, enabling individuals, especially those with limited assets, to secure loans.</p>
        </div>

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/easy-loan-process.png" alt="Easy Loan Process" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">Easy Loan Process</h4>
          <p class="text-gray-600 font-serif text-center">Our streamlined loan process makes borrowing simple, reducing the complexity and time typically involved so you can focus on what matters most.</p>
        </div>

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/loan-disbursement.png" alt="Quick Cash Disbursement" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">Quick Cash Disbursement</h4>
          <p class="text-gray-600 font-serif text-center">Get access to funds when you need them the most. Our streamlined process ensures that you receive your cash swiftly and efficiently.</p>
        </div>

        <div class="bg-white rounded-md p-6 shadow-lg pop-in flex flex-col items-center">
          <img src="../img/hassle-free.png" alt="Hassle-Free Requirements" class="w-16 h-16 mb-4">
          <h4 class="text-xl font-bold text-teal-600 mb-2 text-center">Hassle-Free Requirements</h4>
          <p class="text-gray-600 font-serif text-center">Simplified borrowing requirements make the process accessible and efficient for everyone, ensuring a smoother experience for both borrowers and lenders.</p>
        </div>

      </div>
    </div>
  </div>
</div>




    <!-- Additional Content: How It Works Section -->
    <section class="py-16 pop-in">
      <div class="container mx-auto text-center">
        <h3 class="text-6xl font-bold  text-teal-600 mb-6 pop-in">How It Works</h3>
        <p class="text-l text-gray-500 mb-10">We make it easy for you to get access to funds when you need them the most.</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div class="bg-white rounded-md p-6 shadow-lg pop-in">
      <img src="../img/transaction.png" alt="Register" class="w-16 h-16 mb-4 mx-auto">
      <h4 class="text-xl font-bold text-teal-600 mb-2">Step 1: Requirements</h4>
      <p class="text-gray-600">Bring the necessary requirements to register for membership.</p>

      <button @click="toggleRequirements" class="mt-4 text-sm text-teal-500 hover:text-teal-700">
        See Requirements List
      </button>
      <div v-if="showRequirements" class="mt-4 p-4 border rounded-md shadow-md bg-gray-50">
  <ul class="list-disc list-inside text-gray-700 space-y-2">
    <li class="text-teal-600">REQ NO.1: Bring a 2x2 picture ID</li>
    <li class="text-teal-600">REQ NO.2: Any proof of income</li>
    <li class="text-teal-600">REQ NO.3: Any type of house bills</li>
    <li class="text-teal-600">REQ NO.4: Valid IDs (bring any one of the following):
      <ul class="list-disc list-inside pl-6 text-gray-600 space-y-1">
        <li>Passport</li>
        <li>PSA birth certificate</li>
        <li>Driver's license</li>
        <li>TIN ID</li>
        <li>ePhilSys</li>
        <li>PhilHealth ID</li>
        <li>Postal ID</li>
        <li>NBI Clearance</li>
        <li>Police clearance</li>
        <li>Senior Citizen ID</li>
      </ul>
    </li>
  </ul>
</div>
    </div>
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-2s">
            <img src="../img/no-hidden-fees.png" alt="Apply for Loan" class="w-16 h-16 mb-4 mx-auto">
            <h4 class="text-xl font-bold text-teal-600 mb-2">Step 2: Apply for Loan</h4>
            <p class="text-gray-600">Fill in  loan application form, and we’ll guide you through the process step-by-step.</p>
          </div>
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-3s">
            <img src="../img/money.png" alt="Receive Funds" class="w-16 h-16 mb-4 mx-auto">
            <h4 class="text-xl font-bold text-teal-600 mb-2">Step 3: Receive Funds</h4>
            <p class="text-gray-600">Once approved, funds will be disbursed quickly so you can start using them immediately.</p>
          </div>
        </div>
      </div>
    </section>


    <!-- Additional Content: Frequently Asked Questions Section -->
    <section class="py-16 pop-in">
      <div class="container mx-auto text-center">
        <h3 class="text-6xl font-bold text-teal-600 mb-6">Frequently Asked Questions</h3>
        <p class="text-lg text-gray-600 mb-10">Got questions? We have the answers. Here are some of the most frequently asked questions:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-1s">
            <h4 class="text-xl font-bold text-teal-600 mb-4">What is LendCash?</h4>
            <p class="text-gray-600">LendCash is an online microfinance platform that provides loans to individuals and small businesses without the need for collateral.</p>
          </div>
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-2s">
            <h4 class="text-xl font-bold text-teal-600 mb-4">How do I apply for a loan?</h4>
            <p class="text-gray-600">You can apply for a loan by going to the site or company, filling out a simple application form, and submitting your details for review.</p>
          </div>
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-3s">
            <h4 class="text-xl font-bold text-teal-600 mb-4">Do I need to provide collateral?</h4>
            <p class="text-gray-600">No, we do not require any collateral for the loan. We believe in empowering everyone, regardless of their financial capabilities.</p>
          </div>
          <div class="bg-white rounded-md p-6 shadow-lg animate__animated animate__fadeInUp animate__delay-4s">
            <h4 class="text-xl font-bold text-teal-600 mb-4">How soon can I receive the funds?</h4>
            <p class="text-gray-600">Once your loan is approved, the money will be disbursed within the scheduled date.</p>
          </div>
        </div>
      </div>
    </section>

  </main>
  <footer class="pt-10 bg-teal-900 pop-in">
    <div class="max-w-screen-xl mx-auto px-3 md:px-5">
      <div class="justify-between items-center gap-12 md:flex">
        <div class="flex-1 max-w-lg">
          </div>

    </div>
      <div class="flex-1 mt-16 space-y-6 justify-between sm:flex md:space-y-0">
        <div class="flex flex-col gap-6 text-white">
          <h4 class="text-white font-bold">Company</h4>
          <ul class="space-y-4">
            <li><a href="#about" class="duration-150 hover:text-teal-500">About Us</a></li>
            <li><a href="#team" class="duration-150 hover:text-teal-500">Our Team</a></li>
            <li><a href="#careers" class="duration-150 hover:text-teal-500">Careers</a></li>
            <li><a href="#press" class="duration-150 hover:text-teal-500">Press</a></li>
          </ul>
        </div>
        <div class="flex flex-col gap-6 text-white">
          <h4 class="text-white font-bold">Support</h4>
          <ul class="space-y-4">
            <li><a href="#faq" class="duration-150 hover:text-teal-500">FAQs</a></li>
            <li><a href="#contact" class="duration-150 hover:text-teal-500">Contact Support</a></li>
            <li><a href="#help" class="duration-150 hover:text-teal-500">Help Center</a></li>
          </ul>
        </div>
        <div class="flex flex-col gap-6 text-white">
          <h4 class="text-white font-bold">Legal</h4>
          <ul class="space-y-4">
            <li><a href="#privacy" class="duration-150 hover:text-teal-500">Privacy Policy</a></li>
            <li><a href="#terms" class="duration-150 hover:text-teal-500">Terms of Service</a></li>
            <li><a href="#security" class="duration-150 hover:text-teal-500">Security</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-white items-center justify-between sm:flex">
        <p class="text-teal-500">© 2024 LendCash. All rights reserved.</p>
        <div class="flex items-center gap-x-6 text-teal-500 mt-6">
          <a href="javascript:void()">
            <svg
              class="w-6 h-6 hover:text-white duration-150"
              fill="none"
              viewBox="0 0 48 48"
            >
              <g clip-path="url(#a)">
                <path
                  fill="currentColor"
                  d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24c0 11.979 8.776 21.908 20.25 23.708v-16.77h-6.094V24h6.094v-5.288c0-6.014 3.583-9.337 9.065-9.337 2.625 0 5.372.469 5.372.469v5.906h-3.026c-2.981 0-3.911 1.85-3.911 3.75V24h6.656l-1.064 6.938H27.75v16.77C39.224 45.908 48 35.978 48 24z"
                />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M0 0h48v48H0z" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="javascript:void()">
            <svg
              class="w-6 h-6 hover:text-white duration-150"
              fill="none"
              viewBox="0 0 48 48"
            >
              <g clip-path="url(#clip0_17_80)">
                <path
                  fill="currentColor"
                  d="M15.1 43.5c18.11 0 28.017-15.006 28.017-28.016 0-.422-.01-.853-.029-1.275A19.998 19.998 0 0048 9.11c-1.795.798-3.7 1.32-5.652 1.546a9.9 9.9 0 004.33-5.445 19.794 19.794 0 01-6.251 2.39 9.86 9.86 0 00-16.788 8.979A27.97 27.97 0 013.346 6.299 9.859 9.859 0 006.393 19.44a9.86 9.86 0 01-4.462-1.228v.122a9.844 9.844 0 007.901 9.656 9.788 9.788 0 01-4.442.169 9.867 9.867 0 009.195 6.843A19.75 19.75 0 010 39.078 27.937 27.937 0 0015.1 43.5z"
                />
              </g>
              <defs>
                <clipPath id="clip0_17_80">
                  <path fill="#fff" d="M0 0h48v48H0z" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="javascript:void()">
            <svg
              class="w-6 h-6 hover:text-white duration-150"
              fill="currentColor"
              viewBox="0 0 48 48"
            >
              <g fill="currentColor" clip-path="url(#clip0_910_44)">
                <path
                  fill-rule="evenodd"
                  d="M24 1A24.086 24.086 0 008.454 6.693 23.834 23.834 0 00.319 21.044a23.754 23.754 0 003.153 16.172 23.98 23.98 0 0012.938 10.29c1.192.221 1.641-.518 1.641-1.146 0-.628-.024-2.45-.032-4.442-6.676 1.443-8.087-2.817-8.087-2.817-1.089-2.766-2.663-3.493-2.663-3.493-2.178-1.478.163-1.45.163-1.45 2.413.17 3.68 2.461 3.68 2.461 2.138 3.648 5.616 2.593 6.983 1.976.215-1.545.838-2.596 1.526-3.193-5.333-.6-10.937-2.647-10.937-11.791a9.213 9.213 0 012.472-6.406c-.246-.6-1.069-3.026.234-6.322 0 0 2.015-.64 6.602 2.446a22.904 22.904 0 0112.017 0c4.583-3.086 6.594-2.446 6.594-2.446 1.307 3.288.484 5.714.238 6.322a9.194 9.194 0 012.476 6.414c0 9.163-5.615 11.183-10.957 11.772.859.742 1.626 2.193 1.626 4.421 0 3.193-.028 5.762-.028 6.548 0 .636.433 1.38 1.65 1.146a23.98 23.98 0 0012.938-10.291 23.754 23.754 0 003.151-16.175A23.834 23.834 0 0039.56 6.69 24.086 24.086 0 0024.009 1H24z"
                  clip-rule="evenodd"
                />
                <path
                  d="M9.089 35.264c-.052.119-.243.154-.398.071-.155-.083-.27-.237-.214-.36.056-.122.242-.154.397-.07.155.082.274.24.215.359zM10.063 36.343a.4.4 0 01-.493-.11c-.155-.167-.187-.396-.068-.499.12-.102.334-.055.489.11.155.167.19.396.072.499zM11.008 37.714c-.147.103-.397 0-.536-.206a.395.395 0 010-.569c.147-.098.397 0 .537.202.139.202.143.47 0 .573zM12.292 39.042c-.131.146-.397.106-.616-.091-.219-.198-.27-.467-.139-.609.131-.142.397-.102.624.091.226.194.27.466.131.609zM14.092 39.816c-.06.186-.33.269-.6.19-.27-.08-.449-.3-.397-.49.051-.19.326-.277.6-.19.274.087.449.297.397.49zM16.056 39.95c0 .194-.223.36-.509.364-.286.004-.52-.154-.52-.348 0-.193.222-.36.508-.363.286-.004.52.15.52.347zM17.884 39.646c.036.194-.163.395-.45.443-.285.047-.536-.067-.572-.257-.035-.19.171-.395.45-.447.278-.05.536.068.572.261z"
                />
              </g>
              <defs>
                <clipPath id="clip0_910_44">
                  <path fill="#fff" d="M0 0h48v48H0z" />
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="javascript:void()">
            <svg
              class="w-6 h-6 hover:text-white duration-150"
              fill="currentColor"
              viewBox="0 0 48 48"
            >
                <g clip-path="url(#clip0_17_63)">
                  <path
                    d="M24 4.322c6.413 0 7.172.028 9.694.14 2.343.104 3.61.497 4.453.825 1.116.432 1.922.957 2.756 1.791.844.844 1.36 1.64 1.79 2.756.329.844.723 2.12.826 4.454.112 2.53.14 3.29.14 9.693 0 6.413-.028 7.172-.14 9.694-.103 2.344-.497 3.61-.825 4.453-.431 1.116-.957 1.922-1.79 2.756-.845.844-1.642 1.36-2.757 1.791-.844.328-2.119.722-4.453.825-2.532.112-3.29.14-9.694.14-6.413 0-7.172-.028-9.694-.14-2.343-.103-3.61-.497-4.453-.825-1.115-.431-1.922-.956-2.756-1.79-.844-.844-1.36-1.641-1.79-2.757-.329-.844-.723-2.119-.826-4.453-.112-2.531-.14-3.29-.14-9.694 0-6.412.028-7.172.14-9.694.103-2.343.497-3.609.825-4.453.431-1.115.957-1.921 1.79-2.756.845-.844 1.642-1.36 2.757-1.79.844-.329 2.119-.722 4.453-.825 2.522-.113 3.281-.141 9.694-.141zM24 0c-6.516 0-7.331.028-9.89.14-2.55.113-4.304.526-5.822 1.116-1.585.619-2.926 1.435-4.257 2.775-1.34 1.332-2.156 2.672-2.775 4.247C.666 9.806.253 11.55.141 14.1.028 16.669 0 17.484 0 24s.028 7.331.14 9.89c.113 2.55.526 4.304 1.116 5.822.619 1.585 1.435 2.925 2.775 4.257a11.732 11.732 0 004.247 2.765c1.528.591 3.272 1.003 5.822 1.116 2.56.112 3.375.14 9.89.14 6.516 0 7.332-.028 9.891-.14 2.55-.113 4.303-.525 5.822-1.116a11.732 11.732 0 004.247-2.765 11.732 11.732 0 002.766-4.247c.59-1.528 1.003-3.272 1.115-5.822.113-2.56.14-3.375.14-9.89 0-6.516-.027-7.332-.14-9.891-.112-2.55-.525-4.303-1.115-5.822-.591-1.594-1.407-2.935-2.747-4.266a11.732 11.732 0 00-4.247-2.765C38.194.675 36.45.262 33.9.15 31.331.028 30.516 0 24 0z"
                  />
                  <path
                    d="M24 11.672c-6.806 0-12.328 5.522-12.328 12.328 0 6.806 5.522 12.328 12.328 12.328 6.806 0 12.328-5.522 12.328-12.328 0-6.806-5.522-12.328-12.328-12.328zm0 20.325a7.998 7.998 0 010-15.994 7.998 7.998 0 010 15.994zM39.694 11.184a2.879 2.879 0 11-2.878-2.878 2.885 2.885 0 012.878 2.878z"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_63">
                    <path d="M0 0h48v48H0z" />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import LoginModal from '~/components/login/LoginModal.vue';
import { authService } from "~/components/api/AuthService";

const router = useRouter();
const showModal = ref(false);

// Function to toggle modal visibility
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const employeeLogin = () => {
  showModal.value = false; // Close modal
  console.log("Redirecting to login..."); // Debugging log
  router.push('/login'); // Adjust this route as needed
};
const clientLogin = () => {
  showModal.value = false; // Close modal
  console.log("Redirecting to login..."); // Debugging log
  router.push('/client_login'); // Adjust this route as needed
};

// Define the features using a ref for reactivity
const features = ref([
  {
    title: "Loan Management",
    description: "Efficiently manage loan applications, approvals, and disbursements.",
  },
  {
    title: "Customer Details",
    description: "Maintain detailed customer information, track financial histories, and view eligibility.",
  },
  {
    title: "Transaction History",
    description: "View and record all transactions in a comprehensive ledger format.",
  },
  {
    title: "Financial Reporting",
    description: "Generate financial statements and track organizational performance with ease.",
  },
]);

// Define the reactive variable for requirements visibility
const showRequirements = ref(false);

// Define the toggle function
const toggleRequirements = () => {
  showRequirements.value = !showRequirements.value; // Toggle the visibility
};

async function removeToken() {
    try {
        const token = localStorage.getItem('_token');

        if(token){

          // Remove the token from local storage
          localStorage.removeItem('_token'); // Adjust the key based on your implementation

          //go back to the landing page
        }
    } catch (error) {
        toast.error(`${error}`, {
            autoClose: 3000,
        })
    }
}

// Temporary data for About Section
const aboutDetails = [
  { title: "Our Mission", description: "Empowering dreams through microfinance.", icon: "div" },
  { title: "Our Vision", description: "A world where aspirations are within reach.", icon: "div" },
  { title: "Our History", description: "Founded to serve underserved communities.", icon: "div" },
];

const mission = {
  title: "Mission Statement for LendCash",
  subtitle: "Empowering Dreams, One Loan at a Time.",
  description:
    "At LendCash, our mission is to provide accessible and affordable microfinance solutions that empower individuals and small businesses to achieve their financial goals. We are committed to fostering financial inclusion by offering a range of tailored products, exceptional customer service, and educational resources that promote responsible borrowing and entrepreneurship.",
};

const vision = {
  title: "Vision Statement for LendCash",
  subtitle: "A World Where Every Aspiration is Within Reach.",
  description:
    "Our vision is to create a world where financial resources are accessible to everyone, regardless of their background or circumstances. We envision a future where individuals and communities thrive through empowered financial decisions, sustainable economic growth, and opportunities for all, transforming lives and fostering prosperity across the globe.",
};

const history =
  "LendCash was founded in response to the growing need for accessible financial services in underserved communities. Recognizing the barriers faced by individuals and small businesses in securing traditional loans, the company set out to create a microfinance platform that empowers its clients with the financial resources necessary to achieve their goals.";

const impact =
  "By providing financial resources to underserved populations, microfinance fosters community development. It enables clients to invest in education, healthcare, and small business ventures, leading to improved living standards and economic stability. Additionally, it encourages women’s empowerment, as many microfinance programs target female entrepreneurs, helping to break cycles of poverty.";

const team = [
  {
    name: "Adrian Sastre",
    role: "Leader and Programmer",
    description: "Student at STI College Davao, BSIT program.",
    facebook: "https://facebook.com/adrian",
    email: "adrian@example.com",
    image: "",
  },
  {
    name: "Eric Ramones",
    role: "Programmer",
    description: "Student at STI College Davao, BSIT program.",
    facebook: "https://facebook.com/eric",
    email: "eric@example.com",
    image: "",
  },
  {
    name: "Froy Lao",
    role: "Programmer",
    description: "Student at STI College Davao, BSIT program.",
    facebook: "https://facebook.com/froy",
    email: "froy@example.com",
    image: "",
  },
  {
    name: "Maviel Segurog",
    role: "Programmer",
    description: "Student at STI College Davao, BSIT program.",
    facebook: "https://facebook.com/maviel",
    email: "maviel@example.com",
    image: "",
  },
];

const placeholderImage = ""; // Placeholder for missing team images


onMounted(() => {
    removeToken();
})


</script>

<style scoped>

.features-section {
  background-color: #f9fafb;
}

.feature-card {
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.info-box {
  display: none;
  position: absolute; /* Change to absolute for positioning */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust to center it */
  top: 100%; /* Position below the link */
  width: 900px; /* Set a fixed width for the box */
  height: 500px;; /* Allow height to adjust based on content */
  background-color: white;
  border: 1px solid green;
  padding: 20px; /* Increased padding */
  border-radius: 12px;
  box-shadow: 0 6px 10px rgba(28, 161, 28, 0.479);
  z-index: 20;
  overflow-y: auto; /* Enables vertical scrolling */
}

.nav-item:hover .info-box {
  display: block; /* Show the info box on hover */
}




/* Utility classes */
.container {
  max-width: 1200px;
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

.icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease-in-out;
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

@keyframes shine {
  0% {
    left: -100px;
  }

  60% {
    left: 100%;
  }

  to {
    left: 100%;
  }
}
</style>
