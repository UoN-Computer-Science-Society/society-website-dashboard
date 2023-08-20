"use client"

import AlertModal from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Faq } from "@prisma/client";
import axios from "axios";
import { Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod"

const formSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
})

type FaqFormValues = z.infer<typeof formSchema>

interface FaqFormProps {
    initialData: Faq | null;
}



const FaqForm = ({ initialData }: FaqFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Faq" : "Add Faq";
    const description = initialData ? "Edit a Faq" : "Add a Faq";
    const toastMessage = initialData ? "Faq updated" : "Faq created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<FaqFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            question: '',
            answer: '',
        }
    })

    const onSubmit = async (data: FaqFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                //initial data exists , update
                await axios.patch(`/api/faqs/${params.faqId}`, data)
            } else {
                //initial data doesn't exists , create
                await axios.post(`/api/faqs`, data)
            }

            router.refresh();
            router.push(`/faqs`)
            toast.success(toastMessage);
        } catch (error) {
            toast.error("Something Went Wrong")
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/faqs/${params.faqId}`);
            router.refresh();
            router.push(`/faqs`)
            toast.success("faq Deleted");
        } catch (error) {
            toast.error("Make sure to removed all product using this faq first");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }


    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={() => onDelete()}
                loading={loading}
            />
            <div className="flex items-center justify-between">

                <Heading
                    title={title}
                    description={description}
                />
                {initialData && (
                    <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => setOpen(true)}
                        disabled={loading}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}

                {!initialData && (
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => router.push(`/faqs`)}
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Question' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="answer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Answer' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit">{action}
                    </Button>
                </form>
            </Form>

        </>

    )
}

export default FaqForm