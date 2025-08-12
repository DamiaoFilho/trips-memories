import { z } from "zod";

const TripSchema = z.object({
  tripName: z.string().min(3, "O nome da viagem deve ter pelo menos 3 caracteres."),
  description: z.string().optional(),
  date: z.date(),
  coverImage: z
    .any()
    .refine((files) => files?.length == 1, "A imagem de capa é obrigatória.")
    .refine((files) => files?.[0]?.size <= 50000000, `O tamanho máximo é 5MB.`)
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Apenas formatos .jpg, .png e .webp são suportados."
    ),
});

export default TripSchema;