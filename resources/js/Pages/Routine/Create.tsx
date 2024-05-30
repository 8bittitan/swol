import Page from '@/Components/page'
import PageTitle from '@/Components/page-title'
import { Button } from '@/Components/ui/button'
import { Calendar } from '@/Components/ui/calendar'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/Components/ui/popover'
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/Components/ui/select'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { useForm } from '@inertiajs/react'
import { CalendarIcon } from 'lucide-react'
import { FormEventHandler } from 'react'
import { ExerciseList } from '@/Components/workout-plan/exercise-list'

type FormInputs = {
    name: string
    description: string
    status: string
    exercises: {
        name: string
    }[]
    begin_date?: Date
    end_date?: Date
}

export default function CreateRoutinePage({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm<FormInputs>({
        name: '',
        description: '',
        status: 'active',
        exercises: [],
        begin_date: new Date(),
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('routines.store'))
    }

    if (Object.keys(errors).length > 0) {
        console.dir(errors)
    }

    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>Create a new routine</PageTitle>}
        >
            <Page>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-[500px,1fr] gap-4">
                        <ExerciseList
                            exercises={data.exercises}
                            setData={setData}
                        />
                        <div className="flex flex-col space-y-4">
                            <div className="flex w-full space-x-4">
                                <div className="flex flex-col flex-1 space-y-1">
                                    <Label htmlFor="name">Routine Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-sm font-semibold text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 space-y-1">
                                    <Label htmlFor="status">
                                        Routine Status
                                    </Label>
                                    <Select
                                        name="status"
                                        onValueChange={(val) =>
                                            setData('status', val)
                                        }
                                        value={data.status}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Active" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm font-semibold text-destructive">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Label htmlFor="description">
                                    Routine Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <p className="text-sm font-semibold text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1">
                                <Label>Routine Schedule</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant="outline"
                                            className="self-start font-normal"
                                        >
                                            <CalendarIcon className="mr-2 size-4" />
                                            <span>Pick a schedule</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="range"
                                            initialFocus
                                            defaultMonth={data.begin_date}
                                            selected={{
                                                from: data.begin_date,
                                                to: data.end_date,
                                            }}
                                            onSelect={(range) => {
                                                setData(
                                                    'begin_date',
                                                    range?.from,
                                                )
                                                setData('end_date', range?.to)
                                            }}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div
                                    className="p-4 rounded-lg bg-card"
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.effectAllowed = 'move'
                                        e.dataTransfer.setData(
                                            'exercise',
                                            JSON.stringify({
                                                name: 'Bicep curls',
                                            }),
                                        )
                                    }}
                                >
                                    <h3 className="text-card-foreground">
                                        Bicep Curls
                                    </h3>
                                </div>
                                <div
                                    className="p-4 rounded-lg bg-card"
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.effectAllowed = 'move'
                                        e.dataTransfer.setData(
                                            'exercise',
                                            JSON.stringify({
                                                name: 'Chest Press',
                                            }),
                                        )
                                    }}
                                >
                                    <h3 className="text-card-foreground">
                                        Chest Press
                                    </h3>
                                </div>
                                <div
                                    className="p-4 rounded-lg bg-card"
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.effectAllowed = 'move'
                                        e.dataTransfer.setData(
                                            'exercise',
                                            JSON.stringify({
                                                name: 'Squats',
                                            }),
                                        )
                                    }}
                                >
                                    <h3 className="text-card-foreground">
                                        Squats
                                    </h3>
                                </div>
                            </div>
                            <Button
                                disabled={processing}
                                type="submit"
                                className="self-start"
                            >
                                Save routine
                            </Button>
                        </div>
                    </div>
                </form>
            </Page>
        </Authenticated>
    )
}
