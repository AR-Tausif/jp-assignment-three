import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.string(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});

export const userValidations = {
  userSchema,
};
