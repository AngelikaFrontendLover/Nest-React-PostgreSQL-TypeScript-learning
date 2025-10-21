import { type FC, type JSX } from 'react';
import { useAuth } from '../hooks/useAuth';
import img from '../assets/lock.png'

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth();
    return <>
        {
            isAuth ? children : <div className='flex flex-col justify-center items-center mt-20 gap-10'>
                <h2 text-2xl>To view this page you must log in.</h2>
                <img className="w-1/3" src={img} alt="" />
            </div>
        }
    </>
};
