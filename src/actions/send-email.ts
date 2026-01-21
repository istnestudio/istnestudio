"use server";

import { ContactFormData } from "@/components/contact/contact-form";
import { sendEmailEffect } from "@/effects/send-email-effect";
import { Effect } from "effect";

export const sendEmail = async (data: ContactFormData) =>
  await Effect.runPromise(sendEmailEffect(data));
