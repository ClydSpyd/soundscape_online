
const initialState = {
  token: localStorage.getItem('t'),
  isAuthenticated: false,
  loading: true,
  user: null
}

export default function(state=initialState, action){
  const { type, payload } = action

  switch(type){

    case 'REGISTER_SUCCESS':
    case 'USER_LOGGEDIN':
      localStorage.setItem('t', payload)
      return {
        ...state,
        token:payload,
        isAuthenticated: true,
        loading: false,
        error:null
      }

    case 'USER_LOADED':
      return{
        ...state,
        isAuthenticated:true,
        user:payload,
        loading:false
      }

    case 'REGISTER_FAIL':
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('t')
      return{
        ...state,
        token: null,
        isAuthenticated:false,
        user:null,
        loading:false,
        error: payload
      }

    case 'SET_ERROR':
      return{
        ...state,
        error:payload
      }

    case 'CLEAR_ERROR':
      return{
        ...state,
        error:null
      }
      
    default:
      return state
  }
}