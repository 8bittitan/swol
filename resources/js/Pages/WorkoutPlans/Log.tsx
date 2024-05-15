import PageTitle from '@/Components/page-title'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import type { Exercise, PageProps } from '@/types'
import type { Plan } from '@/types/plans'
import { useForm } from '@inertiajs/react'
import type { FormEventHandler } from 'react'

type IndexPageProps = {
    workout_plan: Plan
    exercises: Exercise[]
}

export default function WorkoutPlansLogPage({
    auth,
    workout_plan,
    exercises,
}: PageProps<IndexPageProps>) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        exercise_id: number | null
        reps: number
        weight: number
        is_warmup: boolean
        is_bodyweight: boolean
    }>({
        exercise_id: null,
        reps: 0,
        weight: 0,
        is_warmup: false,
        is_bodyweight: false,
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('logs.store', workout_plan.id), {
            onSuccess() {
                reset()
            },
        })
    }

    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>{workout_plan.name} Log</PageTitle>}
        >
            <form
                onSubmit={handleSubmit}
                className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8"
            >
                <div className="flex items-center justify-end mb-8">
                    <Button type="submit" disabled={processing}>
                        Log Exercise
                    </Button>
                </div>

                <div className="flex flex-col max-w-screen-sm space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <div>{JSON.stringify(errors, null, 2)}</div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="exercise_id">Exercise</Label>
                        <Select
                            defaultValue={data.exercise_id?.toString()}
                            name="exercise_id"
                            onValueChange={(val) =>
                                setData('exercise_id', parseInt(val))
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select an exercise" />
                            </SelectTrigger>
                            <SelectContent>
                                {exercises.map((exercise) => (
                                    <SelectItem
                                        key={exercise.id}
                                        value={exercise.id.toString()}
                                    >
                                        {exercise.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="is_warmup">Warmp-up Set?</Label>
                        <Checkbox
                            defaultChecked={data.is_warmup}
                            name="is_warmup"
                            id="is_warmup"
                            onCheckedChange={(checked) =>
                                setData('is_warmup', Boolean(checked))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reps">Reps</Label>
                        <Input
                            defaultValue={data.reps}
                            type="number"
                            id="reps"
                            name="reps"
                            onChange={(e) =>
                                setData('reps', parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                            defaultValue={data.weight}
                            type="number"
                            id="weight"
                            name="weight"
                            onChange={(e) =>
                                setData('weight', parseInt(e.target.value))
                            }
                        />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="is_bodyweight">
                            Using body weight?
                        </Label>
                        <Checkbox
                            defaultChecked={data.is_bodyweight}
                            name="is_bodyweight"
                            id="is_bodyweight"
                            onCheckedChange={(checked) =>
                                setData('is_bodyweight', Boolean(checked))
                            }
                        />
                    </div>
                </div>
            </form>
        </Authenticated>
    )
}
