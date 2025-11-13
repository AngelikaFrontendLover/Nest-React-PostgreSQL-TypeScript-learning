import { type FC } from "react";
import TransactionForm from "../components/TransactionForm";
import { instance } from "../api/axios.api";
import type { ICategory, IResponseTransactionLoader, ITransaction } from "../types/types";
import { toast } from "react-toastify";
import TransactionTable from "../components/TransactionTable";
import { useLoaderData } from "react-router-dom";
import Chart from "../components/Chart";

export const transactionLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories');
    const transactions = await instance.get<ITransaction[]>('/transactions');
    const totalIncome = await instance.get<number>('/transactions/income/find');
    const totalExpense = await instance.get<number>('/transactions/expense/find');

    const data = {
        categories: categories.data,
        transactions: transactions.data,
        totalIncome: totalIncome.data,
        totalExpense: totalExpense.data
    }
    return data;
}

export const transactionAction = async ({ request }: any) => {
    try {
        switch (request.method) {
            case "POST": {
                const formData = await request.formData();
                const newTransaction = {
                    title: formData.get('title'),
                    amount: +formData.get('amount'),
                    category: { id: +formData.get('category') },
                    type: formData.get('type')
                }
                await instance.post('/transactions', newTransaction);
                toast.success('Transaction added');
                return null
            }
            case "DELETE": {
                const formData = await request.formData();
                const transactionId = formData.get('id');
                await instance.delete(`/transactions/transaction/${transactionId}`)
                toast.success('Transaction deleted');
                return null;
            }
        }
    } catch (err: any) {
        const error = err.response?.data.message
        toast.error(error.toString());
    }
}

const Transactions: FC = () => {

    const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader;
    return <>
        <div className="grid grid-cols-3 gap-4 mt-4 items-start">
            <div className="grid col-span-2">
                <TransactionForm />
            </div>
            <div className="rounded-md bg-slate-800 p-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="uppercase text-md font-bold text-center">
                            Total Income:
                        </p>
                        <p className="bg-green-500 p-1 text-center rounded-sm mt-2">
                            {totalIncome}
                        </p>
                    </div>
                    <div>
                        <p className="uppercase text-md font-bold text-center">
                            Total Expense:
                        </p>
                        <p className="bg-red-500 p-1 text-center rounded-sm mt-2">
                            {totalExpense}
                        </p>
                    </div>
                </div>
                <p>Chart</p>
                <>
                    <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
                </>
            </div>
        </div>
        <div>
            <h1 className="my-5">Table</h1>
            <TransactionTable limit={5} />
        </div>
    </>
}

export default Transactions;