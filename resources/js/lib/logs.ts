import { Exercise, Log, Plan } from '@/types'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

export function useLogs(workoutPlan: Plan, exercise: Exercise) {
    const { isLoading, data } = useQuery<{ data: Log[] }>({
        queryKey: ['logs', workoutPlan.id, exercise.id],
        queryFn: async () => {
            const res = await fetch(
                route('api.logs.show', {
                    workoutPlan: workoutPlan,
                    exercise: exercise,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )

            return await res.json()
        },
        refetchOnWindowFocus: false,
    })

    return {
        isLoading,
        data,
    }
}

export function formatLogsForChart(logs: Log[]) {
    return logs.map((log) => ({
        ...log,
        created_at: format(log.created_at, 'MMM d, yyyy'),
    }))
}
