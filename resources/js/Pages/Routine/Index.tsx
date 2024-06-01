import PageTitle from '@/Components/page-title'
import { Button } from '@/Components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/Components/ui/card'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Plan } from '@/types/plans'
import { Link } from '@inertiajs/react'

type IndexPageProps = {
    routines: Plan[]
}

export default function RoutineIndexPage({
    auth,
    routines,
}: PageProps<IndexPageProps>) {
    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>Routines</PageTitle>}
        >
            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-end mb-8">
                    <Button asChild>
                        <Link href={route('routines.create')}>
                            Create a new routine
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {routines.map((routine) => (
                        <Card key={routine.id}>
                            <CardHeader>
                                <CardTitle>{routine.name}</CardTitle>
                                {routine.description && (
                                    <CardDescription>
                                        {routine.description}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <span>{routine.status}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}
