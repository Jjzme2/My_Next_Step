import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'

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
          const errorData = await response.json()
          throw new Error(errorData.message || 'Invalid login credentials')
        }
        const data = await response.json()
        this.setUser(data.username)
        this.setToken(data.token)
      } catch (error) {
        console.error('Login error:', error)
      }
    },
    logout() {
      this.setUser(null)
      this.setToken(null)
      localStorage.removeItem('username')
      localStorage.removeItem('authToken')
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
          const errorData = await response.json()
          throw new Error(errorData.message || 'Registration failed')
        }
        const data = await response.json()
        this.setUser(data.username)
        this.setToken(data.token)
      } catch (error) {
        console.error('Registration error:', error)
      }
    },
    initialize() {
      console.log('Initializing auth store')
      const token = localStorage.getItem('authToken')
      const username = localStorage.getItem('username')
      if (token && username && this.isTokenValid(token)) {
        this.user = username
        this.token = token
      }
    },
    setUser(username) {
      this.user = username
      if (username) {
        localStorage.setItem('username', username)
      } else {
        localStorage.removeItem('username')
      }
    },
    setToken(token) {
      this.token = token
      if (token) {
        localStorage.setItem('authToken', token)
      } else {
        localStorage.removeItem('authToken')
      }
    },
    isTokenValid(token) {
      try {
        const decoded = jwt_decode(token)
        const currentTime = Date.now() / 1000
        return decoded.exp > currentTime
      } catch (error) {
        return false
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    username: (state) => state.user,
  },
})
