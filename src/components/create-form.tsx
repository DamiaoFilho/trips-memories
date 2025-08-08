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
import TripSchema from "@/schemas/trip";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/auth";
import { supabase } from "../../lib/supaBaseClient";


export default function CreateForm() {
    const { user } = useUser();
    const form = useForm<z.infer<typeof TripSchema>>({
        resolver: zodResolver(TripSchema),
        defaultValues: {
            tripName: "",
            description: "",
        },
    });

    const onSubmit = async (data: any) => {
        console.log("Form submitted with data:", data);
        try {
            const file = data.coverImage[0];
            const filePath = `${user?.id}/${Date.now()}-${file.name}`;

            const { error: uploadError } = await supabase.storage
                .from('trips')
                .upload(filePath, file);

            if(uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl} } = await supabase.storage
                .from('trips')
                .getPublicUrl(filePath);

        }catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="tripName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da viagem</FormLabel>
                            <FormControl>
                                <Input placeholder="Viagem na praia" {...field} />
                            </FormControl>
                            <FormDescription>
                                Esse é o nome da sua viagem
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
                            <FormLabel>Descrição da viagem</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descrever sua viagem" {...field} />
                            </FormControl>
                            <FormDescription>
                                Essa é a descrição da viagem
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data da Viagem</FormLabel>
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
                                                    <span>Escolha uma data</span>
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
                                A data da sua viagem.
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
                            <FormLabel>Imagem de capa</FormLabel>
                            <FormControl>
                                <Input type="file" accept="image/*" {...field} />
                            </FormControl>
                            <FormDescription>
                                Essa é a sua imagem de capa.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <section className="flex flex-row items-center space-x-4 justify-around">
                    <Button className="w-[70%]" type="submit">Criar viagem</Button>
                    <Button className="w-[25%]" variant={"outline"} type="reset">Cancelar</Button>
                </section>
            </form>
        </Form>
    )
}
