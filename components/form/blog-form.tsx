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

import axios from "axios";
import { format, parseISO } from "date-fns";
import { Trash, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod"
import { Textarea } from "../ui/textarea";
import { Blog, Image } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    date: z.date(),
    venue: z.string().min(1),
    year: z.string().min(1),
    coverImageUrl: z.string().min(1),
    images: z.object({ url: z.string() }).array(),
    isArchived: z.boolean().default(false).optional(),
})

type BlogFormValues = z.infer<typeof formSchema>

interface BlogFormProps {
    initialData: Blog & {
        images: Image[]
    } | null;
}



const BlogForm = ({ initialData }: BlogFormProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Edit Previous Event" : "Add Previous Event";
    const description = initialData ? "Edit a Previous Event" : "Add a Previous Event";
    const toastMessage = initialData ? "Previous Event updated" : "Previous Event created";
    const action = initialData ? "Save Changes" : "Create";


    const form = useForm<BlogFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            title: '',
            content: '',
            venue: '',
            year: '',
            coverImageUrl: '',
            date: new Date(),
            isArchived: false,
            images: [],
        }
    })

    const onSubmit = async (data: BlogFormValues) => {
        try {
            setLoading(true)
            if (initialData) {
                //initial data exists , update
                await axios.patch(`/api/blogs/${params.blogId}`, data)
            } else {
                //initial data doesn't exists , create
                await axios.post(`/api/blogs`, data)
            }

            router.refresh();
            router.push(`/blogs`)
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
            await axios.delete(`/api/blogs/${params.blogId}`);
            router.refresh();
            router.push(`/blogs`)
            toast.success("blog Deleted");
        } catch (error) {
            toast.error("Make sure to removed all event using this blog first");
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
                        onClick={() => router.push(`/blogs`)}
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
                        name="coverImageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Blog Cover Image</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Photo(Multiple)</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value.map((image) => image.url)}
                                        disabled={loading}
                                        onChange={(url) => field.onChange([...field.value, { url }])}
                                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
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
                                            placeholder='blog title' {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder='Blog Content' {...field}
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
                                            placeholder='blog venue' {...field}
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
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Academic year</FormLabel>
                                    <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a academic year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value='2022-2023'>Adademic year 2022-2023</SelectItem>
                                            <SelectItem value='2021-2022'>Adademic year 2021-2022</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            This blog will not appear in anywhere of website
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

export default BlogForm