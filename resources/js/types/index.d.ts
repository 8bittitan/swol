export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string
}

export interface Exercise {
    id: number
    name: string
    workout_plan_id: number
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User
    }
}
