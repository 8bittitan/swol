import InputError from '@/Components/InputError'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import { FormEventHandler } from 'react'
import { PageProps } from '@/types'
import { Label } from '@/Components/ui/label'
import { Input } from '@/Components/ui/input'
import { Button } from '@/Components/ui/button'

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean
    status?: string
    className?: string
}) {
    const user = usePage<PageProps>().props.auth.user

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        patch(route('profile.update'))
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-card-foreground">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-card-foreground">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        value={data.name}
                        required
                        autoFocus
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>

                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={data.email}
                        required
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <Button variant="secondary" disabled={processing}>
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-card-foreground">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
