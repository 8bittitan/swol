import { PropsWithChildren } from "react";

export default function Page({ children }: PropsWithChildren) {
    return (
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8">
            {children}
        </div>
    );
}
