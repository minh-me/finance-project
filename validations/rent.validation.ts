import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const createDescriptionSchema = toTypedSchema(
  z.object({
    title: z.string(),
    description: z.string(),
  }),
);
