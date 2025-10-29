import type { FC } from "react";
import { Form } from "react-router-dom";

interface Props {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
    isEdit?: boolean
    setIsEdit?: (isEdit: boolean) => void
}

const CategoryModal: FC<Props> = ({ type, id, setVisibleModal }) => {
    return <div className="fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
        <Form
            action="/categories"
            method={type}
            className="grid gap-2 w-[300px] p-5 rounded-md bg-slate-900"
            onSubmit={() => { setVisibleModal(false) }}
        >
            <label htmlFor="title">
                <small>Label</small>
                <input className="input w-full" type="text" name="title" placeholder="title" />
                <input type="hidden" name="id" value={id} />
            </label>

            <div className="flex items-center gap-2">
                <button className="btn btn-green" type='submit'>
                    {type === 'patch' ? 'Save' : 'Create'}
                </button>
                <button className="btn btn-red" onClick={() => { setVisibleModal(false) }}>Close</button>
            </div>
        </Form>
    </div >
}

export default CategoryModal;