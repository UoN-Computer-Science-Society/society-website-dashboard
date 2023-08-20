"use client"

import AlertModal from "@/components/alert-modal";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Partner } from "@prisma/client";
import axios from "axios";
import { Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod"
import { Input } from "../ui/input";

const formSchema = z.object({
    name: z.string().min(1),
    imageUrl: z.string().min(1),
})

type PartnerFormValues = z.infer<typeof formSchema>

interface PartnerFormProps {
    initialData: Partner | null;
}



const PartnerForm = ({ initialData }: PartnerFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Partner" : "Add Partner";
    const description = initialData ? "Edit a Partner" : "Add a Partner";
    const toastMessage = initialData ? "Partner updated" : "Partner created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<PartnerFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            imageUrl: '',
        }
    })

    const onSubmit = async (data: PartnerFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                //initial data exists , update
                await axios.patch(`/api/partners/${params.partnerId}`, data)
            } else {
                //initial data doesn't exists , create
                await axios.post(`/api/partners`, data)
            }

            router.refresh();
            router.push(`/partners`)
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
            await axios.delete(`/api/partners/${params.partnerId}`);
            router.refresh();
            router.push(`/partners`)
            toast.success("partner Deleted");
        } catch (error) {
            toast.error("Make sure to removed all product using this partner first");
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
                        onClick={() => router.push(`/partners`)}
                        disabled={loading}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <Separator />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Partner Name' {...field}
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

export default PartnerForm