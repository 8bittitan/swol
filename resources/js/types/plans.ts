export type Plan = {
    id: number;
    name: string;
    description: string | null;
    status: string;
    start_date: string;
    end_date: string;
    remaining_weeks: number | null;
};
