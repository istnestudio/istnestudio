import * as z from "zod";

const transformToLower = (field: string) => field.toLowerCase();
const transformPhoneNumber = (phone: string) => phone.replaceAll(" ", "");

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { error: "Imię jest wymagane" })
    .transform(transformToLower),
  email: z
    .email({ error: "Niepoprawny email" })
    .min(1, { error: "Niepoprawny email" })
    .transform(transformToLower),
  phone: z
    .string()
    .min(11, { error: "Niepoprawny numer telefonu" })
    .max(11, { error: "Niepoprawny numer telefonu" })
    .refine((phone) => !isNaN(parseInt(transformPhoneNumber(phone))), {
      error: "Niepoprawny numer telefonu",
    }),
  message: z
    .string()
    .min(1, { error: "Wiadomość jest wymagana" })
    .transform(transformToLower),
  terms: z
    .boolean()
    .refine((accepted) => accepted, { error: "Pole jest wymagane" }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
