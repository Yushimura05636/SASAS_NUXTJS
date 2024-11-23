<template>
    <NuxtLayout name="admin">
        <div>
            
            <div class="mt-5">
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                    <div class="overflow-x-auto  ">
                            <Table class="w-full "
                            :columnHeaders="state.columnHeaders"
                            :data="state.users"
                            :isLoading="state.isTableLoading"
                            :sortData="state.sortData"
                            >
                                <template #body
                                    v-if="!(state.isTableLoading || (state.users?.data === 0))">

                                    <tr v-for="(user, index) in state.users?.data" :key="index" class="">

                                        <td class="py-2 border-b border-gray-300 ">
                                            <span>{{ user.id }}</span>
                                        </td>
                                        <td class="py-2 border-b border-gray-300  ">
                                            <span>{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</span>
                                        </td>
                                        <td class="py-2 border-b border-gray-300 ">
                                            <span>{{ user.email }}</span>
                                        </td>
                                        <td class="border-b border-gray-300 cursor-pointer ">
                                            <FormButton @click="managePermissions(user.id)" class="button hover:bg-blue-800 text-white rounded pl-5 pr-5">Manage</FormButton>
                                        </td>
                                    </tr>
                                </template>
                            </Table>
                        </div>
                        <!-- <Pagination :data="state.datas" @previous="previous" @next="next" /> -->
                        <div class="ml-10 mb-5 ">
                    </div>
            </div>
    </div>
    </NuxtLayout>
</template>


    <script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    import { ref, reactive, onMounted } from 'vue'
    import { apiService } from '~/routes/api/API'
    import { UserService } from '~/models/User';
import { navigateTo } from 'nuxt/app';
import { PermissionService } from '~/models/Permission';
import { PageNameService } from '~/models/PageName';


    const state = reactive({
        columnHeaders: [
            { name: 'Select' },
            { name: 'Full Name' },
            { name: 'Email' },
            { name: 'Action' }
        ],
        error: null,
        isTableLoading: false,
        sortData: {
            sortField: 'id',
            sortOrder: 'descend',
        },
        users: [],
        searchQuery: '',
    })

    async function fetchUsers() {
        state.isTableLoading = true
        state.error = null;
        ;
        try {
            const params = {};
            const response = await apiService.getUser(params)
            state.users = response
            console.log(state.users);
            // assuming response.data is an array of users
        } catch (error: any) {
            state.error = error;
            state.isTableLoading = true;
        }
        state.isTableLoading = false
    }

    async function managePermissions(userId: number) {
        try {
            debugger
            UserService.usbl_id = userId;
            const response = await apiService.authUserUpdate({});
            navigateTo('/permission/manage');
        } catch (error: any) {
            state.error = error;
        }
        state.isTableLoading = true;
    }

    // function managePermissions(userId: number) {
    //     console.log('User ID:', userId); // Log the ID to check
    //     navigateTo({ name: 'Permission', params: { id: userId } });
    // }

    onMounted(() => {
        PageNameService.pageName = 'Permissions';
        fetchUsers()
    })
    </script>


<style>
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
  }</style>