import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { PageProps, Routine as IRoutine } from '@/types'
import PageTitle from '@/Components/page-title'
import Routine from '@/Components/overview/routine'

type Props = {
    routines: IRoutine[]
}

export default function Overview({ auth, routines }: PageProps<Props>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle>Overview</PageTitle>}
        >
            <Head title="Overview" />

            <div className="py-12">
                <div className="mx-auto space-y-4 max-w-7xl sm:px-6 lg:px-8">
                    {routines.map((routine) => (
                        <Routine key={routine.id} routine={routine} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
