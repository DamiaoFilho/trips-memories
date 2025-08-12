"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
import { supabase } from "../../../lib/supaBaseClient";
import { useUser } from "@/context/auth";
import { toast } from "sonner";
import LogSchema from "@/schemas/logs";
import { TripLogI } from "@/types/trips";
import { set } from "date-fns";

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripId: string;
  onLogAdded?: () => void;
}

export function ModalAddFile({ isOpen, onClose, tripId, onLogAdded }: AddLogModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const form = useForm<z.infer<typeof LogSchema>>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      title: "",
      description: "",
      mediaType: "image",
      mediaFile: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof LogSchema>) => {
    setIsSubmitting(true);
    try {
      const file = data.mediaFile[0];
      const filePath = `${user?.id}/logs/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = await supabase.storage.from("uploads").getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("log")
        .insert({
          trip_id: tripId,
          title: data.title,
          description: data.description,
          media_type: data.mediaType,
          url: publicUrl,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        throw insertError;
      }

      toast.success("Memória adicionada com sucesso!");
      form.reset();

      if (onLogAdded) {
        await onLogAdded();
      }

      onClose();
    } catch (error: any) {
      console.error("Error uploading log:", error);
      toast.error(`Erro ao adicionar memória: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar uma nova memória</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Pôr do sol na calçada de Copacabana"
                      {...field}
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
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva esse momento..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mediaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Mídia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="image">Foto</SelectItem>
                      <SelectItem value="video">Vídeo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mediaFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Arquivo do computador</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".jpg,.jpeg,.png,.mp4,image/jpeg,image/png,video/mp4"
                      onChange={(e) => onChange(e.target.files)}
                      {...fieldProps}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                    Adicionando...
                  </>
                ) : (
                  "Adicionar Memória"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
