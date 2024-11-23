<template>
  <NuxtLayout name="admin">
    <main>
        <div class="bg-white">
            <header class="w-full py-8 px-4 md:px-16">
            <div class="flex justify-between items-center">
                <img src="../img/LendCash_Logo-removebg-preview.png" class="w-20" alt="logo" />
            </div>
            </header>
        </div>

            <div class="container mx-auto p-4">
            <div class="flex justify-between items-center mb-4">
                <h1 class="text-xl font-bold">GROUP MEMBER DETAILS</h1>
            </div>
            <div class="mb-4">
                <input
                v-model="searchQuery"
                @input="fetchMembers"
                type="text"
                placeholder="Search..."
                class="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <table class="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Group Name</th>
                    <th class="py-2 px-4 border-b">Client Name</th>
                    <th class="py-2 px-4 border-b">Status</th>
                    <th class="py-2 px-4 border-b">Birth Place</th>
                    <th class="py-2 px-4 border-b">Date of Birth</th>
                    <th class="py-2 px-4 border-b">Civil Status</th>
                    <th class="py-2 px-4 border-b">Gender</th>
                    <th class="py-2 px-4 border-b">Occupation</th>
                    <th class="py-2 px-4 border-b">Address</th>
                    <th class="py-2 px-4 border-b">Contact Number</th>
                    <th class="py-2 px-4 border-b">Membership Date</th>
                    <th class="py-2 px-4 border-b">Date Registered</th>
                    <th class="py-2 px-4 border-b">Reference</th>
                    <th class="py-2 px-4 border-b">Miscellaneous</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="member in filteredMembers" :key="member.id">
                    <td class="py-2 px-4 border-b">{{ member.groupName }}</td>
                    <td class="py-2 px-4 border-b">{{ member.clientName }}</td>
                    <td class="py-2 px-4 border-b">{{ member.isActive ? 'Active' : 'Inactive' }}</td>
                    <td class="py-2 px-4 border-b">{{ member.birthPlace }}</td>
                    <td class="py-2 px-4 border-b">{{ member.dateOfBirth }}</td>
                    <td class="py-2 px-4 border-b">{{ member.civilStatus }}</td>
                    <td class="py-2 px-4 border-b">{{ member.gender }}</td>
                    <td class="py-2 px-4 border-b">{{ member.occupation }}</td>
                    <td class="py-2 px-4 border-b">{{ member.address }}</td>
                    <td class="py-2 px-4 border-b">{{ member.contactNumber }}</td>
                    <td class="py-2 px-4 border-b">{{ member.membershipDate }}</td>
                    <td class="py-2 px-4 border-b">{{ member.dateRegistered }}</td>
                    <td class="py-2 px-4 border-b">{{ member.reference }}</td>
                    <td class="py-2 px-4 border-b">{{ member.miscellaneous }}</td>
                </tr>
                </tbody>
            </table>
            </div>

            <div class="mt-4">
            <a href="Group" @click.prevent="goBack" class="bg-gray-500 text-white px-4 py-2 rounded inline-block">Back</a>
        </div>
    </main>
  </NuxtLayout>
</template>


  
  <script>
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'GroupMemberDetails',
    setup() {
      const members = ref([]);
      const searchQuery = ref('');
  
      // Fetch members from the API
      const fetchMembers = async () => {
        try {
          const response = await fetch(
            `https://api.example.com/members?search=${searchQuery.value}`
          );
          const data = await response.json();
          members.value = data.members;
        } catch (error) {
          console.error('Error fetching members:', error);
        }
      };
  
      // Automatically fetch members on page load
      onMounted(fetchMembers);
  
      const filteredMembers = computed(() => {
        if (searchQuery.value) {
          return members.value.filter(
            (member) =>
              member.groupName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
              member.clientName.toLowerCase().includes(searchQuery.value.toLowerCase())
          );
        }
        return members.value;
      });

  
      return {
        members,
        searchQuery,
        filteredMembers,
        fetchMembers,
      };
    },
  };
  </script>
  
  <style scoped>
  /**/
  </style>
  