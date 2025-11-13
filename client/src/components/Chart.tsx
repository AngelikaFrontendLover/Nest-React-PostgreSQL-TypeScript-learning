import { Pie, PieChart, Cell, Legend, Tooltip } from 'recharts';


const COLORS = ['#FA8072', '#6B8E23'];

interface IChart {
    totalIncome: number
    totalExpense: number
}

const Chart: FC<IChart> = ({ totalIncome, totalExpense }: IChart) => {

    const data = new Array(
        {
            value: totalExpense,
            name: 'Expense'
        },
        {
            value: totalIncome,
            name: 'Income'
        }
    )

    return <PieChart width={240} height={240}>
        <Pie
            data={data}
            cx='50%'
            cy='50%'
            innerRadius="60%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
        >
            {
                data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
            }
        </Pie>
        <Legend />
        <Tooltip />
    </PieChart>
}

export default Chart;