import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card'
import { Plan } from '@/types/plans'
import { Button } from '@/Components/ui/button'
import PageTitle from '@/Components/page-title'

type Props = {
    routines: Plan[]
}

export default function Overview({ auth, routines }: PageProps<Props>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle>Overview</PageTitle>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    {routines.map((routine) => (
                        <Card key={routine.id}>
                            <CardHeader>
                                <CardTitle>
                                    {routine.name}{' '}
                                    {routine.remaining_weeks && (
                                        <span className="ml-2 text-sm text-gray-500">
                                            {routine.remaining_weeks} weeks
                                            remaining
                                        </span>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>{routine.description}</CardContent>
                            <CardFooter className="flex gap-2">
                                <Button asChild>
                                    <Link
                                        href={route(
                                            'routines.show',
                                            routine.id,
                                        )}
                                    >
                                        View Plan
                                    </Link>
                                </Button>
                                <Button variant="secondary" asChild>
                                    <Link
                                        href={route('logs.create', routine.id)}
                                    >
                                        Log Exercises
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
