"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Header from "@/components/auth/header";
import BackButton from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    messageLabel?: string;
    showSocials?: boolean;
}

export default function CardWrapper({
    children, headerLabel, backButtonLabel, backButtonHref, messageLabel, showSocials
}:CardWrapperProps) {
    return (
        <Card className="shadow-md w-full sm:w-[500px] mx-auto">
            <CardHeader>
                <Header headerLabel={headerLabel} messageLabel={messageLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <BackButton backButtonHref={backButtonHref} backButtonLabel={backButtonLabel}/>
            </CardFooter>
        </Card>
    )
}