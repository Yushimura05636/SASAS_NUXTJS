<template>
    <div>
        <NuxtLayout name="admin">
            <button @click="AddStudent">Add Student</button>

            <Head>
                <Title>Students - {{ runtimeConfig.public.appName }}</Title>
            </Head>

            <div>
                <Alert type="danger" :text="state.error?.message" v-if="state.error" />
                <div class="table-responsive">
                    <Table :columnHeaders="state.columnHeaders" :data="state.students" :isLoading="state.isTableLoading"
                        :sortData="state.sortData" @sort="sort">
                        <template #body
                            v-if="!(state.isTableLoading || (state.students?.data && state.students?.data.length === 0))">
                            <tr v-for="(student, index) in state.students?.data" :key="index">
                                <td>
                                    <span class="truncate">{{ student.firstname + " " + student.lastname }}</span>
                                </td>
                                <td>
                                    <span>{{ student.course }}</span>
                                </td>
                                <td>
                                    <span>{{ student.birthday }}</span>
                                </td>
                                <td>
                                    <span>{{ student.age }}</span>
                                </td>
                                <td>
                                    <span>{{ student.allowance }}</span>
                                </td>
                                <td class="flex">
                                    <FormButton type="submit" buttonStyle="primary" class="w-full mr-2" @click="editStudent(student)">
                                        Edit
                                    </FormButton>
                                    <FormButton type="submit" buttonStyle="primary" class="w-full" @click="deleteStudent(student.id)">
                                        Delete
                                    </FormButton>
                                </td>
                            </tr>
                        </template>
                    </Table>
                </div>
                <Pagination :data="state.students" @previous="previous" @next="next" />
            </div>

        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import { studentService } from '@/components/api/admin/StudentService'

import { useRouter } from 'vue-router';
const router = useRouter();

const runtimeConfig = useRuntimeConfig()
let currentTablePage = 1

const state = reactive({
    columnHeaders: [
        { name: 'Name', sorter: true, key: 'name' },
        { name: 'Course' },
        { name: 'Birthdate' },
        { name: 'Age' },
        { name: 'Allowance' },
        { name: '' },
    ],
    error: null,
    isTableLoading: false,
    sortData: {
        sortField: 'id',
        sortOrder: 'ascend',
    },
    students: [],
})

onMounted(() => {
    //pag mag enter sa dash eh read ni una
    fetchStudents()
})

function AddStudent(id: any): any {
  navigateTo('/admin/dashboard/AddStudent/');
}

// editFunction. dri pud ipasa ang id sa gipili na row padulong StudentService
function editStudent(student: any): any {
  studentService.setId(student.id);

  studentService.setFirstName(student.firstname);
  studentService.setLastName(student.lastname);
  studentService.setBirthDay(student.birthdate);
  studentService.setCourse(student.course);
  studentService.setAllowance(student.allowance);
  studentService.setAge(student.age);


  navigateTo('/admin/students/editStudent/');
}


//delete function
async function deleteStudent(id: any)
{
    const params = {
        //empty
    }
    const response = await studentService.deleteStudent(params, id);
    fetchStudents();

    if(response != null)
    {
        alert('Delete Sucessfully!');
        navigateTo('/admin/students');
    }
}

//method sa pag kuha sa db
async function fetchStudents() {
    state.isTableLoading = true
    state.error = null
    try {
        const params = {
            page: currentTablePage,
            sortField: state.sortData.sortField,
            sortOrder: state.sortData.sortOrder,
        }

        const response = await studentService.getStudents(params)
        state.students = response
    } catch (error: any) {
        state.error = error
    }
    state.isTableLoading = false
}

function previous() {
    currentTablePage--
    fetchStudents()
}

function next() {
    currentTablePage++
    fetchStudents()
}

function sort(sortingData: any) {
    currentTablePage = 1
    state.sortData = {
        sortField: sortingData.column,
        sortOrder: sortingData.sort,
    }
    fetchStudents()
}

function handleFilter(value: any) {
    currentTablePage = 1
    state.dataFilter = value
    fetchStudents()
}

</script>