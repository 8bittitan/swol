import Page from "@/Components/page";
import PageTitle from "@/Components/page-title";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/Components/ui/select";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

type FormInputs = {
    name: string;
    description: string;
    status: string;
    exercises: {
        name: string;
    }[];
};

export default function CreateWorkoutPlanPage({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm<FormInputs>({
        name: "",
        description: "",
        status: "active",
        exercises: [],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("plans.store"));
    };

    if (Object.keys(errors).length > 0) {
        console.dir(errors);
    }

    return (
        <Authenticated
            user={auth.user}
            header={<PageTitle>Create a new workout plan</PageTitle>}
        >
            <Page>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-[500px,1fr] gap-4">
                        <div>
                            <h4 className="mb-2 text-lg font-bold">
                                Exercises for plan
                            </h4>
                            <div
                                className="flex flex-col flex-1 min-h-full space-y-4 border border-dashed rounded-lg"
                                onDragOver={(e) => {
                                    if (
                                        e.dataTransfer.types.includes(
                                            "exercise"
                                        )
                                    ) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                }}
                                onDrop={(e) => {
                                    const transfer = JSON.parse(
                                        e.dataTransfer.getData("exercise")
                                    );

                                    setData(
                                        "exercises",
                                        data.exercises.concat(transfer)
                                    );
                                }}
                            >
                                {data.exercises.map((exercise, i) => (
                                    <div
                                        key={i}
                                        className="p-4 rounded-lg bg-stone-200"
                                    >
                                        {exercise.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="flex w-full space-x-4">
                                <div className="flex flex-col flex-1 space-y-1">
                                    <Label htmlFor="name">Plan name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-sm font-semibold text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 space-y-1">
                                    <Label htmlFor="status">Plan status</Label>
                                    <Select
                                        name="status"
                                        onValueChange={(val) =>
                                            setData("status", val)
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
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <p className="text-sm font-semibold text-destructive">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2">
                                <div
                                    className="p-4 rounded-lg bg-stone-200"
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.effectAllowed = "move";
                                        e.dataTransfer.setData(
                                            "exercise",
                                            JSON.stringify({
                                                name: "Bicep curls",
                                            })
                                        );
                                    }}
                                >
                                    <h3>Bicep Curls</h3>
                                </div>
                            </div>
                            <Button
                                disabled={processing}
                                type="submit"
                                className="self-start"
                            >
                                Save workout plan
                            </Button>
                        </div>
                    </div>
                </form>
            </Page>
        </Authenticated>
    );
}
