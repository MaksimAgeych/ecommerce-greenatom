import { useAppSelector } from '../store/rootReducer'

export function useAuth() {
    const { id, token, email } = useAppSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        id,
        token,
    }
}