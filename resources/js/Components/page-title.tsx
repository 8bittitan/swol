import { PropsWithChildren } from "react";

export default function PageTitle({ children }: PropsWithChildren) {
    return (
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
            {children}
        </h2>
    );
}
