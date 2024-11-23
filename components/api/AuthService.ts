import BaseAPIService from '~/components/api/BaseAPIService'

class AuthService extends BaseAPIService {
    async login(params: object): Promise<any> {
        return await this.request(`/login`, 'POST', params)
    }

    async loginClient(params: object): Promise<any> {
        return await this.request(`/loginClient`, 'POST', params)
    }

    async logout(): Promise<any> {
        return await this.request(`/logout`, 'POST')
    }

    async sendVerification(params: object): Promise<any> {
        return await this.request(`/NoAUTH/SendVerification`, 'POST', params)
    }

    async verifyVerification(params: object, code: number): Promise<any> {
        return await this.request(`/NoAUTH/VerifyVerification/${code}`, 'POST', params)
    }

    async sendVerificationClient(params: object): Promise<any> {
        return await this.request(`/client/SendVerification`, 'POST', params)
    }
    async verifyVerificationClient(params: object, code: number): Promise<any> {
        return await this.request(`/client/VerifyVerification/${code}`, 'POST', params)
    }


}

export const authService = new AuthService()
