"use client";
import CardWrapper from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import { BackButton } from "@/components/ui/back-button";
import {useForm} from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/auth";
import { useTransition, useState } from "react";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/form-success";

export const RegisterForm = () => {
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        }
    });
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(()=>{
           register(data).then((res)=>{
            setError(res?.error);
            setSuccess(res?.success);
           })
        })
    }
    return(
        <CardWrapper
            headerLabel="Inscrivez vous"
            backButtonLabel="Vous avez déjà un compte ?"
            backButtonHref="/auth/login"
            messageLabel="Créer un compte"
            showSocials
        >
            <BackButton />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({field})=>(
                            <FormItem>
                            <FormLabel>Nom : </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending}  placeholder="Luce Lina" type="text"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({field})=>(
                            <FormItem>
                            <FormLabel>Email : </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending}  placeholder="exemple@uvsq.cm" type="email"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="password" render={({field})=>(
                            <FormItem>
                            <FormLabel>Mot de passe : </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending} placeholder="********" type="password"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>

                        <FormField control={form.control} name="email" render={({field})=>(
                            <FormItem>
                            <FormLabel>Numéro étudiant : </FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isPending}  placeholder="22356745" type="matricule"/>
                            </FormControl>
                            <FormMessage className="text-sm"/>
                            </FormItem>
                        )}/>




                        <label htmlFor="studyYear">Année d'étude:</label>
                                <select id="studyYear" name="studyYear" required>
                                    <option value="1">1ère année</option>
                                    <option value="2">2ème année</option>
                                    <option value="3">3ème année</option>
                                    <option value="4">Master 1</option>
                                    <option value="5">Master 2</option>
                                </select>



                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button type="submit" disabled={isPending} className="w-full">Créer un compte</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}