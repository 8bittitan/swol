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
    workoutPlans: Plan[]
}

export default function WorkoutPlansIndexPage({
    auth,
    workoutPlans,
}: PageProps<IndexPageProps>) {
    return (
        <Authenticated user={auth.user} header={<PageTitle>Plans</PageTitle>}>
            <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex items-center justify-end mb-8">
                    <Button asChild>
                        <Link href={route('plans.create')}>
                            Create a new plan
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {workoutPlans.map((plan) => (
                        <Card key={plan.id}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                {plan.description && (
                                    <CardDescription>
                                        {plan.description}
                                    </CardDescription>
                                )}
                            </CardHeader>
                            <CardContent>
                                <span>{plan.status}</span>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </Authenticated>
    )
}
