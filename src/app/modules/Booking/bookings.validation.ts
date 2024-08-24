import { z } from "zod";

const bookingSchema = z.object({
  body: z.object({
    date: z.string(),
    slots: z.array(z.string()),
    room: z.string(),
  }),
});

export const bookingValidations = {
  bookingSchema,
};
