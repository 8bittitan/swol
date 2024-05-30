import { Exercise, Log, Routine } from '@/types'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'

export function useLogs(routine: Routine, exercise: Exercise) {
    const { isLoading, data } = useQuery<{ data: Log[] }>({
        queryKey: ['logs', routine.id, exercise.id],
        queryFn: async () => {
            const res = await fetch(
                route('api.logs.show', {
                    routineId: routine.id,
                    exerciseId: exercise.id,
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
