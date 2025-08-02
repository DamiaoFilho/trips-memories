import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function CreateForm() {
    const form = useForm()

    const onSubmit = (data: any) => {
        console.log("Form submitted with data:", data);
        // Here you can handle the form submission, e.g., send data to an API
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="Trip Name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trip Name</FormLabel>
                            <FormControl>
                                <Input placeholder="My Amazing Trip" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your trip name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trip Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Describe your trip" {...field} />
                            </FormControl>
                            <FormDescription>
                                This description of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="Date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trip Date</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}                                            
                                            captionLayout="dropdown"
                                            lang="pt"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormDescription>
                                The date of your trip.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Image</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/*" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your cover image.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <section className="flex flex-row items-center space-x-4 justify-around">
                    <Button className="w-[70%]" type="submit">Create Trip</Button>
                    <Button className="w-[25%]" variant={"outline"} type="reset">Cancel</Button>
                </section>
            </form>
        </Form>
    )
}
