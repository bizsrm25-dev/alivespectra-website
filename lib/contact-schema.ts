import { z } from "zod";

export const STAGES = [
  "Entrepreneur",
  "Startup",
  "SME",
  "Corporation",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  company: z.string().optional(),
  stage: z.enum(STAGES),
  interests: z.array(z.string()).min(1, "Pick at least one area."),
  message: z.string().min(10, "A sentence or two helps us help you."),
  /** Honeypot — must stay empty; bots tend to fill it. */
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
