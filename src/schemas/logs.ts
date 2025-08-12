import z from "zod";

const MAX_SIZE = 50 * 1024 * 1024; 

const LogSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  mediaType: z.enum(["image", "video"]),
  mediaFile: z
    .instanceof(File)
    .refine((file) => file != null, "Arquivo é obrigatório")
    .refine((file) => file.size <= MAX_SIZE, "Arquivo deve ter no máximo 50MB"),
});

export default LogSchema;
