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
import { Exercise, PageProps, Plan } from '@/types'
import { useLogs } from '@/lib/logs'
import { formatLogsForChart } from '@/lib/logs'
import { LogsChart } from '@/Components/logs-chart'

type Props = {
    workoutPlan: Plan
    exercises: Exercise[]
}

export default function ShowWorkoutPlanPage({
    auth,
    workoutPlan,
    exercises,
}: PageProps<Props>) {
    const [selectedExerise, setSelectedExercise] = useState(exercises[0])
    const { isLoading, data } = useLogs(workoutPlan, selectedExerise)

    const logs = useMemo(() => {
        if (!data) return null

        return formatLogsForChart(data.data)
    }, [data])

    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>{workoutPlan.name}</PageTitle>}
        >
            <Page>
                <p>{workoutPlan.description}</p>
                <div className="space-y-4">
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="secondary">
                                    {selectedExerise.name}
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
                            <p>Loading...</p>
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
