import { PropsWithChildren } from 'react'

export default function PageTitle({ children }: PropsWithChildren) {
    return (
        <h2 className="text-xl font-semibold leading-tight text-foreground">
            {children}
        </h2>
    )
}
