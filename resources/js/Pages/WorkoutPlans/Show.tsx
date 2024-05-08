import Page from "@/Components/page";
import PageTitle from "@/Components/page-title";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";

type Props = {
    workoutPlan: {
        name: string;
        description: string;
        status: string;
    };
};

export default function ShowWorkoutPlanPage({
    auth,
    workoutPlan,
}: PageProps<Props>) {
    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>{workoutPlan.name}</PageTitle>}
        >
            <Page>
                <p>{workoutPlan.description}</p>
            </Page>
        </Authenticated>
    );
}
