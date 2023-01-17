import { useDispatch, useSelector } from "react-redux"
import { onChecking, onLogin, onLogout } from "../store/auth/authSlice";
import crudApi from "../api/crudApi";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        dispatch(onChecking());
        try {
            const {data} = await crudApi.post('/auth', { email, password});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid}));

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }

    const startRegister = async({name, email, password, password2}) => {
        dispatch(onChecking());
        try {
            const {data} = await crudApi.post('/auth/new', {name, email, password, password2});

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({
                name: data.name, 
                email: data.email, 
                password: data.password,
                password2: data.password2
            }));

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
        
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const { data } = crudApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin({name: data.name, uid: data.uid}));
            
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout())
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        errorMessage,
        status,
        user,

        //metodos
        checkAuthToken,
        startLogin,
        startRegister,
        startLogout
    }
}