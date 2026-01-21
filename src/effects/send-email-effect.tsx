import {
  ContactFormSchema,
  ContactFormData,
} from "@/components/contact/contact-form";
import MessageConfirmationEmail from "@/components/emails/message-confirmation";
import MessageReturnEmail from "@/components/emails/message-return";
import { resendSendBatchEffect } from "@/lib/resend";
import { zodToSchema } from "@/utils/zod-to-schema";
import { Data, Effect } from "effect";

class MissingFromEmailError extends Data.TaggedError("MissingFromEmailError") {}
class MissingReturnEmailError extends Data.TaggedError(
  "MissingReturnEmailError",
) {}

const validator = zodToSchema(ContactFormSchema);

export const sendEmailEffect = (data: ContactFormData) =>
  Effect.gen(function* () {
    const contactData = yield* validator.decode(data);

    const { name, email } = contactData;

    if (!process.env.FROM_EMAIL) {
      console.log(process.env);
      return yield* Effect.fail(new MissingFromEmailError());
    }

    if (!process.env.RETURN_EMAIL)
      return yield* Effect.fail(new MissingReturnEmailError());

    yield* resendSendBatchEffect([
      {
        from: `Biuro <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: "Potwierdzenie wysłania wiadomości",
        react: <MessageConfirmationEmail />,
      },
      {
        from: `Biuro <${process.env.FROM_EMAIL}>`,
        to: process.env.RETURN_EMAIL,
        subject: `Nowa wiadomość od: ${name}`,
        react: <MessageReturnEmail {...contactData} />,
      },
    ]);

    return true;
  }).pipe(
    Effect.catchTags({
      ResendSendError: (error) => {
        console.log(`[Resend API Error]: ${error.error.message}`);
        return Effect.succeed(false);
      },
      ZodValidationError: (error) => {
        console.log("[Email Validation Error]:");
        console.log(error.errors);
        return Effect.succeed(false);
      },
      MissingApiKeyError: () => {
        console.log("[Send Email Error]: Missing Resend API Key");
        return Effect.succeed(false);
      },
      MissingFromEmailError: () => {
        console.log("[Send Email Error]: Missing FROM_EMAIL env");
        return Effect.succeed(false);
      },
      MissingReturnEmailError: () => {
        console.log("[Send Email Error]: Missing RETURN_EMAIL env");
        return Effect.succeed(false);
      },
    }),
  );
