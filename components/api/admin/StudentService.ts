import BaseAPIService from '~/components/api/BaseAPIService'

class StudentService extends BaseAPIService {
    async getStudents(params: object): Promise<any> {
        return await this.request(`/students`, 'GET', params)
    }
}

export const studentService = new StudentService()