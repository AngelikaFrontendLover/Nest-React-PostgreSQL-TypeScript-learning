import { type FC } from "react";
import img from '../assets/404.png'
import { Link } from "react-router-dom";

const ErrorPage: FC = () => {
    return <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10">
        <img src={img} className="w-80" alt="error-page" />
        <Link to={'/'} className="bg-sky-500 rounded-md px-6">Back</Link>
    </div>
}

export default ErrorPage;