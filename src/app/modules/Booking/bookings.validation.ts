import { z } from "zod";

const bookingSchema = z.object({
  body: z.object({
    date: z.string(),
    slots: z.array(z.string()),
    room: z.string(),
  }),
});

const bookingUpdateByAdmin = z.object({
  body: z.object({
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]),
  }),
});
export const bookingValidations = {
  bookingSchema,
  bookingUpdateByAdmin,
};
