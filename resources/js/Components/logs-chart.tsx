import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { Log } from '@/types'

type Props = {
    data: Log[]
}

export function LogsChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: 0,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="created_at" />
                <YAxis dataKey="weight" />
                <Line
                    dataKey="weight"
                    fill="currentColor"
                    className="fill-foreground text-foreground"
                />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    )
}
