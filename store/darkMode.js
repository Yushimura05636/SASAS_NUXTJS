import { defineStore } from 'pinia'

export const useDarkModeStore = defineStore('darkModeStore',
    {
        persist: true,
        state: () => ({
            darkMode: false,
        }),
        actions: {
            toggleDarkMode() {
                this.darkMode = !this.darkMode
            },
            resetUser() {
                this.user = true
            },
        },
        getters: {
            getDarkMode: (state) => state.darkMode,
        },
    },
)
