import { useRef, useState, type FC } from "react";
import { FaPlus } from "react-icons/fa";
import { Form, useLoaderData } from "react-router-dom";
import type { IResponseTransactionLoader } from "../types/types";
import CategoryModal from "./CategoryModal";


const TransactionForm: FC = () => {
    const { categories } = useLoaderData() as IResponseTransactionLoader;
    const [visibleModal, setVisibleModal] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = () => {
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.reset();
            }
        }, 100);
    }

    return <div className="rounded-md bg-slate-900 p-4">
        <Form
            className="grid gap-2"
            method="post"
            action="/transactions"
            onSubmit={handleSubmit}
            ref={formRef}
        >
            <label htmlFor="title" className="grid bg-slate-900">
                <span>Title</span>
                <input className="input border-slate-400" type="text" placeholder="Title" name="title" required />
            </label>
            <label htmlFor="amount" className="grid bg-slate-900">
                <span>Amount</span>
                <input className="input border-slate-400" type="number" min="0" placeholder="Amount" name="amount" required />
            </label>

            {/* Select */}
            {categories.length ?
                <label htmlFor="category" className="grid">
                    <span>Catagory</span>
                    <select name="category" required className="input border-slate-400">
                        {categories.map((ctg, idx) => (<option value={ctg.id} key={idx}>{ctg.title}</option>))}
                    </select>
                </label> : <h2 className="mt-1 text-red-300">To continue, create a category...</h2>}

            {/* Add catrgory  */}
            <button
                onClick={() => { setVisibleModal(true) }}
                className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white" >
                <FaPlus />
                <span>Manage Categories:</span>
            </button>
            {/* Radio buttons */}
            <div className="flex gap-4 items-center">
                <label className="cursor-pointer flex items-center gap-2">
                    <input type="radio" name="type" value={"income"} className="form-radio text-blue-600" />
                    <span>Income</span>
                </label>
                <label className="cursor-pointer flex items-center gap-2">
                    <input type="radio" name="type" value={"expense"} className="form-radio text-blue-600" />
                    <span>Expense</span>
                </label>
            </div>

            {/* Submit button */}
            <button className="btn btn-green max-w-fit mt-2" type="submit">
                Submit
            </button>
        </Form>

        {/* Add Modal */}
        {visibleModal && (
            <CategoryModal type="post" setVisibleModal={setVisibleModal} />
        )}
    </div>
}
export default TransactionForm;