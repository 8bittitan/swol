import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Plan } from "@/types/plans";
import { Button } from "@/Components/ui/button";
import PageTitle from "@/Components/page-title";

type Props = {
    plans: Plan[];
};

export default function Overview({ auth, plans }: PageProps<Props>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<PageTitle>Overview</PageTitle>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {plans.map((plan) => (
                        <Card key={plan.id}>
                            <CardHeader>
                                <CardTitle>
                                    {plan.name}{" "}
                                    {plan.remaining_weeks && (
                                        <span className="ml-2 text-sm text-gray-500">
                                            {plan.remaining_weeks} weeks
                                            remaining
                                        </span>
                                    )}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>{plan.description}</CardContent>
                            <CardFooter>
                                <Button variant="secondary" asChild>
                                    <Link href={route("logs.create", plan.id)}>
                                        Log Exercises
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
