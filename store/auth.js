import AuthService from '~/services/AuthService.js'
import { useCookies } from 'vue3-cookies'
import { ElMessage } from 'element-plus'

const authService = AuthService.getInstance()

export const useAuthStore = defineStore('auth', () => {
  const { cookies } = useCookies()
  const user = ref(null)
  const token = ref(null)

  const login = async (credentials) => {
    try {

      const { data } = await authService.login(credentials)
      const { user: userData, token: authToken } = data || {}
      if (!authToken) {
        throw new Error('Invalid Credentials')
      }

      user.value = userData
      token.value = authToken
      const cookieOptions = { secure: true, sameSite: 'Strict' }

      cookies.set('access_token', authToken, cookieOptions)
      cookies.set('user', JSON.stringify(userData), cookieOptions)
      cookies.set('tokenType', 'Bearer', cookieOptions)

      return data
    } catch (error) {
      ElMessage.error(error.message || 'Login failed')
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`)
    }
  }

  //getMe function
  const getMe = async () => {
    try {
      const { data } = await authService.getMe()
      if (!data) {
        throw new Error('No data returned')
      }
      user.value = data
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Login failed')
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`)
    }
  }

  const logout = () => {
    user.value = null
    token.value = null

    cookies.remove('access_token')
    cookies.remove('user')
    cookies.remove('tokenType')
  }

  return {
    user: computed(() => user.value),
    token,
    login,
    logout,
    getMe,
  }
})
