import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";

type IndexPageProps = {
    workoutPlans: {
        id: number;
        name: string;
        description: string | null;
        status: string;
    }[];
};

export default function WorkoutPlansIndexPage({
    auth,
    workoutPlans,
}: PageProps<IndexPageProps>) {
    return (
        <Authenticated user={auth.user}>
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1>Plans page</h1>

                    <Button asChild>
                        <Link href={route("plans.create")}>
                            Create a new plan
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 grid-cols-2">
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
    );
}
