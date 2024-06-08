import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Link, useForm } from '@inertiajs/react'
import { Routine as IRoutine } from '@/types'
import { cn } from '@/lib/utils'

type Props = {
    routine: IRoutine
}

export default function Routine({ routine }: Props) {
    const { delete: destroy } = useForm()

    const handleDelete = () => {
        destroy(route('routines.destroy', routine.id))
    }

    return (
        <Card key={routine.id}>
            <CardHeader className={cn('flex-row justify-between items-center')}>
                <CardTitle>
                    {routine.name}{' '}
                    {routine.remaining_weeks && (
                        <span className="ml-2 text-sm text-gray-500">
                            {routine.remaining_weeks} weeks remaining
                        </span>
                    )}
                </CardTitle>
                <Button size="icon" variant="outline" onClick={handleDelete}>
                    X
                </Button>
            </CardHeader>
            <CardContent>{routine.description}</CardContent>
            <CardFooter className="flex gap-2">
                <Button asChild>
                    <Link href={route('routines.show', routine.id)}>
                        View Plan
                    </Link>
                </Button>
                <Button variant="secondary" asChild>
                    <Link href={route('logs.create', routine.id)}>
                        Log Exercises
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
