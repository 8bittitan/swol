export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export interface Plan {
    id: number
    name: string
    description: string | null
    status: string
    start_date: string
    end_date: string
    remaining_weeks: number | null
}

export interface Exercise {
    id: number
    name: string
    workout_plan_id: number
}

export interface Log {
    id: number
    exercise?: Exercise
    exercise_id: number
    is_warmup: boolean
    reps: number
    weight: number
    workout_plan_id: number
    user_id: number
    created_at: string
    updated_at: string
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User
    }
}
