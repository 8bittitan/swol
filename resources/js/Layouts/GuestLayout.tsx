import ApplicationLogo from '@/Components/ApplicationLogo'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'
import { Link } from '@inertiajs/react'
import { PropsWithChildren } from 'react'

type Props = {
    title: string
}

export default function Guest({ children, title }: PropsWithChildren<Props>) {
    return (
        <div className="flex flex-col items-center min-h-screen pt-6 bg-background sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-foreground" />
                </Link>
            </div>

            <Card className="w-full px-6 py-4 mt-6 overflow-hidden shadow-md sm:max-w-md sm:rounded-lg">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    )
}
