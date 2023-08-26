"use client"

import AlertModal from "@/components/alert-modal";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@prisma/client";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod"
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    date: z.date(),
    venue: z.string().min(1),
    imageUrl: z.string().min(1),
    link: z.string().min(1),
    isArchived: z.boolean().default(false).optional(),
})

type EventFormValues = z.infer<typeof formSchema>

interface EventFormProps {
    initialData: Event | null;
}



const EventForm = ({ initialData }: EventFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit UpcomingEvent" : "Add UpcomingEvent";
    const description = initialData ? "Edit a UpcomingEvent" : "Add a UpcomingEvent";
    const toastMessage = initialData ? "UpcomingEvent updated" : "UpcomingEvent created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<EventFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            venue: '',
            date: new Date(),
            isArchived: false,
            imageUrl: '',
            link: '',
        }
    })

    const onSubmit = async (data: EventFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                //initial data exists , update
                await axios.patch(`/api/events/${params.eventId}`, data)
            } else {
                //initial data doesn't exists , create
                await axios.post(`/api/events`, data)
            }

            router.refresh();
            router.push(`/events`)
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
            await axios.delete(`/api/events/${params.eventId}`);
            router.refresh();
            router.push(`/events`)
            toast.success("Event Deleted");
        } catch (error) {
            toast.error("Make sure to removed all product using this Event first");
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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
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

                      <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder='Event description' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />   

                        <FormField
                            control={form.control}
                            name="venue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Venue</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Event venue' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            type="datetime-local"
                                            value={format(new Date(field.value), "yyyy-MM-dd'T'HH:mm")}
                                            onChange={(e) => field.onChange(parseISO(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Link</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Event registration link' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isArchived"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            // @ts-ignore
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Archived
                                        </FormLabel>
                                        <FormDescription>
                                            This event will not appear in anywhere of website
                                        </FormDescription>
                                    </div>
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

export default EventForm