import z from "zod";

const LogSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  mediaType: z.enum(["image", "video"]),
  mediaFile: z
    .any()
    .refine((files) => files?.length > 0, "Arquivo é obrigatório"),
});

export default LogSchema;