"use client"

import AlertModal from "@/components/alert-modal";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventDescriptionContent } from "@prisma/client";
import axios from "axios";
import { Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod"

const formSchema = z.object({
    description: z.string().min(1),
    order: z.string().min(1),
})

type EventCustomDescriptionContentFormValues = z.infer<typeof formSchema>

interface EventCustomDescriptionContentFormProps {
    initialData: EventDescriptionContent | null;
}



const EventCustomDescriptionContentForm = ({ initialData }: EventCustomDescriptionContentFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Description Content" : "Add Description Content";
    const description = initialData ? "Edit a Description Content" : "Add a Description Content";
    const toastMessage = initialData ? "Description Content updated" : "Description Content created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<EventCustomDescriptionContentFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            description: '',
            order: '',
        }
    })

    const onSubmit = async (data: EventCustomDescriptionContentFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                //initial data exists , update
                await axios.patch(`/api/events/${params.eventId}/descriptions/title/${params.eventdescriptionId}/content/${params.eventdescriptioncontentId}`, data)
            } else {
                //initial data doesn't exists , create
                await axios.post(`/api/events/${params.eventId}/descriptions/title/${params.eventdescriptionId}/content`, data)
            }

            router.refresh();
            router.push(`/events/${params.eventId}/custom_description/viewAll`)
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
            await axios.delete(`/api/events/${params.eventId}/descriptions/title/${params.eventdescriptionId}/content/${initialData?.id}`);
            router.refresh();
            router.push(`/events/${params.eventId}/custom_description/viewAll`)
            toast.success("Description title Deleted");
        } catch (error) {
            toast.error("Make sure to removed all content using this title first");
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
                        onClick={() => router.push(`/events`)}
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Custom Description Content' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Order
                                    </FormLabel>
                                    <FormDescription>
                                        This will determine the order of this description in the event layout
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Event title' {...field}
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

export default EventCustomDescriptionContentForm