export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
    username?: string
    avatar?: string
}

export interface Routine {
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
    force: string
    category: string
    equipment: string
    primary_muscles: string
    complexity: string
    created_at: string
    updated_at: string
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
