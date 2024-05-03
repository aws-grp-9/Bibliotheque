"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { BackButton } from "@/components/ui/back-button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth";
import { FormError } from "@/components/ui/form-error";
//import { useClient } from 'use-client';

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            userType: "lecteur" // Définir la valeur par défaut de userType
        }
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setError("");
        startTransition(() => {
            login(data).then((res) => {
                setError(res?.error);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Connectez-vous"
            backButtonLabel="Vous n'avez pas de compte ?"
            backButtonHref="/auth/register"
            messageLabel="Accédez à votre compte"
            showSocials
        >
            <BackButton />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email : </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="exemple@uvsq.cm" type="email" />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mot de passe : </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isPending} placeholder="********" type="password" />
                                </FormControl>
                                <FormMessage className="text-sm" />
                            </FormItem>
                        )} />
                        <FormItem>
                            <FormLabel>Type d'utilisateur : </FormLabel>
                            <FormControl>
                                <select {...form.register("userType")} disabled={isPending} className="block w-full border-gray-600 rounded-lg focus:border-blue-700 focus:ring-blue-700">
                                    <option value="lecteur">Lecteur</option>
                                    <option value="bibliothequaire">Bibliothécaire</option>
                                </select>
                            </FormControl>
                        </FormItem>
                    </div>
                    <FormError message={error} />
                    <Button type="submit" disabled={isPending} className="w-full">Se connecter</Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
