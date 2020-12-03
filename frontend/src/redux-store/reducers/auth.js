const defaultState = {
  userrole: 0,
  user: undefined,
  message: null,
  authError: null,
  resetError: null,
  checkout: false
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: action.error
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        user: action.user,
        userrole: action.user.user.role,
        authError: null
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {};

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authError: null,
        message: action.message
      }

    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.error
      }
    case 'CHECK_OUT':
      console.log('start to checkout')
      return {
        ...state,
        checkout: true
      }
      case 'FINISH_CHECK_OUT':
        console.log('finsied to checkout')
        return {
          ...state,
          checkout: false
        }
    case 'RESET_SUCCESS':
      console.log('An email was sent to your email to reset the password')
      return {
        ...state,
        resetError: null
      }
    case 'UPDATE_SUCCESS':
      console.log('Profile updated')
      return {
        ...state,
        user: action.auth

      }
    case 'RESET_ERROR':
      console.log('Email is not in the system')
      return {
        ...state,
        resetError: 'Email is not in the system'
      }
    default:
      return state
  }
};

