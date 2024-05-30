import { useEffect, FormEventHandler } from 'react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import { Head, Link, useForm } from '@inertiajs/react'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'
import { Checkbox } from '@/Components/ui/checkbox'

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string
    canResetPassword: boolean
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('login'))
    }

    return (
        <GuestLayout title="Log in">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>

                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 space-y-1">
                    <Label htmlFor="password">Password</Label>

                    <Input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) =>
                                setData('remember', Boolean(checked))
                            }
                        />
                        <Label htmlFor="remember" className="ml-2">
                            Remember me
                        </Label>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm underline rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <Button className="ml-4" disabled={processing}>
                        Log in
                    </Button>
                </div>
            </form>

            <div>
                <Button variant="outline" asChild className="w-full">
                    <a href={route('oauth.redirect', { provider: 'github' })}>
                        Login with GitHub
                    </a>
                </Button>
            </div>
        </GuestLayout>
    )
}
