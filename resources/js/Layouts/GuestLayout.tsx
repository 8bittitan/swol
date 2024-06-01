import ApplicationLogo from '@/Components/ApplicationLogo'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

type Props = {}

export default function Guest({ children }: PropsWithChildren<Props>) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-background sm:justify-center sm:pt-0">
            <div className="pb-12">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-foreground" />
                </Link>
            </div>

            {children}
        </div>
    )
}
