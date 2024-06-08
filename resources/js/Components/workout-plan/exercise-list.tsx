import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/Components/ui/button'
import { X } from 'lucide-react'

type Exercise = {
    name: string
    id: number
    day_of_week: number
}

type Props = {
    exercises: Exercise[]
    setData: (field: string, exercises: { name: string }[]) => void
}

export function ExerciseList({ exercises, setData }: Props) {
    const [dropping, setDropping] = useState(false)

    function removeExercise(idx: number) {
        exercises.splice(idx, 1)

        setData('exercises', exercises)
    }

    return (
        <div>
            <h4 className="mb-2 text-lg font-bold">Exercises for routine</h4>
            <div
                className={cn(
                    'flex flex-col flex-1 min-h-full space-y-4 border border-dashed border-muted rounded-lg',
                    {
                        'border-primary': dropping,
                    },
                )}
                onDragOver={(e) => {
                    if (e.dataTransfer.types.includes('exercise')) {
                        e.preventDefault()
                        e.stopPropagation()
                    }

                    setDropping(true)
                }}
                onDragLeave={() => {
                    setDropping(false)
                }}
                onDrop={(e) => {
                    const transfer: Exercise = JSON.parse(
                        e.dataTransfer.getData('exercise'),
                    )

                    setData(
                        'exercises',
                        exercises.concat({
                            ...transfer,
                            day_of_week: 1,
                        }),
                    )
                    setDropping(false)
                }}
            >
                {exercises.map((exercise, i) => (
                    <Exercise
                        key={i}
                        exercise={exercise}
                        removeExercise={() => removeExercise(i)}
                    />
                ))}
            </div>
        </div>
    )
}

type ExerciseProps = {
    exercise: {
        name: string
        id: number
        day_of_week: number
    }
    removeExercise(): void
}

function Exercise({ exercise, removeExercise }: ExerciseProps) {
    return (
        <div className="p-4 h-16 rounded-lg bg-card flex justify-between items-center group">
            <h3 className="text-card-foreground">{exercise.name}</h3>

            <Button
                size="icon"
                variant="outline"
                className="hidden group-hover:inline-flex"
                type="button"
                onClick={removeExercise}
            >
                <X className="size-5 text-destructive fill-current" />
            </Button>
        </div>
    )
}
