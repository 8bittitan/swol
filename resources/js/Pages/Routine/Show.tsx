import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'

import Page from '@/Components/page'
import PageTitle from '@/Components/page-title'
import { Button } from '@/Components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Exercise, PageProps, Routine } from '@/types'
import { useLogs } from '@/lib/logs'
import { formatLogsForChart } from '@/lib/logs'
import { LogsChart } from '@/Components/logs-chart'
import { Skeleton } from '@/Components/ui/skeleton'

type Props = {
    routine: Routine
    exercises: Exercise[]
}

export default function RoutineShowPage({
    auth,
    routine,
    exercises,
}: PageProps<Props>) {
    const [selectedExercise, setSelectedExercise] = useState(exercises[0])
    const { isLoading, data } = useLogs(routine, selectedExercise)

    const logs = useMemo(() => {
        if (!data) return null

        return formatLogsForChart(data.data)
    }, [data])

    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>{routine.name}</PageTitle>}
        >
            <Page>
                <p>{routine.description}</p>
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary">
                                    {selectedExercise.name}
                                    <ChevronDown className="ml-2 size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {exercises.map((exercise) => (
                                    <DropdownMenuItem
                                        key={exercise.id}
                                        onClick={() => {
                                            setSelectedExercise(exercise)
                                        }}
                                    >
                                        {exercise.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div>
                        {isLoading ? (
                            <Skeleton className="w-full h-[400px]" />
                        ) : !logs || logs.length < 1 ? (
                            <p>No logs found for this exercise.</p>
                        ) : (
                            <LogsChart data={logs} />
                        )}
                    </div>
                </div>
            </Page>
        </Authenticated>
    )
}
