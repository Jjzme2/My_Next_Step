import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        })
        if (!response.ok) {
          throw new Error('Invalid login credentials')
        }
        const data = await response.json()
        this.setUser(data.username)
        this.setToken(data.token)
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      this.setUser(null)
      this.setToken(null)
    },
    async register(username, email, password) {
      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        })
        if (!response.ok) {
          throw new Error('Registration failed')
        }
        const data = await response.json()
        this.setUser(data.username)
        this.setToken(data.token)
      } catch (error) {
        console.error(error)
      }
    },
    initialize() {
      const token = localStorage.getItem('authToken')
      const username = localStorage.getItem('username')
      if (token && username) {
        this.setUser(username)
        this.setToken(token)
      }
    },
    setUser(username) {
      this.user = username
      localStorage.setItem('username', username)
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('authToken', token)
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    username: (state) => state.user,
  },
})
