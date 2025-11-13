import { useState, type FC } from "react";
import { AiFillCloseCircle, AiFillEdit } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import CategoryModal from "../components/CategoryModal";
import { instance } from "../api/axios.api";
import type { ICategory } from "../types/types";
import { toast } from "react-toastify";


export const categoriesAction = async ({ request }: any) => {
    try {
        switch (request.method) {
            case "POST": {
                const formData = await request.formData();
                const title = {
                    title: formData.get('title')
                }
                await instance.post('/categories', title)
                return null;
            }
            case "PATCH": {
                const formData = await request.formData();
                const category = {
                    id: formData.get('id'),
                    title: formData.get('title')
                }
                await instance.patch(`/categories/category/${category.id}`, category)
                return null;

            }
            case "DELETE": {
                const formData = await request.formData();
                const categoryId = formData.get('id');
                await instance.delete(`/categories/category/${categoryId}`)
                return null;
            }
        }
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString());
    }
}



export const categoryLoader = async () => {
    try {
        const { data } = await instance.get<ICategory[]>('/categories');
        return data;
    } catch (error) {
        console.error('Loader error:', error);
    }
}

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[];
    const [categoryId, setCategoryId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    return <>
        <div className="mt-10 p-4 rounded-md bg-slate-800">
            <h1>Your category list</h1>
            {
                categories.map((category) => {
                    return <div key={category.id} className="flex flex-wrap items-center gap-1 mt-2">
                        <div className="group flex p-1 rounded-lg bg-black flex-items-center relative gap-1">
                            <span className="p-2 opacity-100 visible transition-all duration-500 group-hover:invisible group-hover:opacity-0">{category.title}</span>
                            <div className="flex absolute top-0 right-0 left-0 bottom-0 rounded-lg items-center justify-between p-2 opacity-0 invisible transition-all duration-5000 group-hover:visible group-hover:opacity-100">
                                <button onClick={() => {
                                    setVisibleModal(true);
                                    setCategoryId(category.id);
                                    setIsEdit(true)
                                }}>
                                    <AiFillEdit />
                                </button>
                                <Form className="flex" method="delete" action="/categories">
                                    <input type="hidden" name="id" value={category.id} />
                                    <button type="submit">
                                        <AiFillCloseCircle />
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div >
                })
            }

            < button className="flex mt-5 max-w-fit items-center gap-2 text-white/50 hover:text-white" onClick={() => { setVisibleModal(true) }}>
                <FaPlus />
                <span>Create a new category</span>
            </button >
        </div >
        {
            visibleModal && <CategoryModal type='post' id={1} setVisibleModal={setVisibleModal} />
        }

        {
            visibleModal && isEdit && <CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal} setIsEdit={setIsEdit} isEdit={isEdit} />
        }

    </>

}

export default Categories;