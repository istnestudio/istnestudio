import { Data, Effect } from "effect";
import {
  Resend,
  CreateEmailOptions,
  ErrorResponse,
  CreateBatchOptions,
} from "resend";

class MissingApiKeyError extends Data.TaggedError("MissingApiKeyError") {}
class ResendSendError extends Data.TaggedError("ResendSendError")<{
  error: ErrorResponse;
}> {}

const initializeResendEffect = Effect.gen(function* () {
  if (!process.env.RESEND_TOKEN)
    return yield* Effect.fail(new MissingApiKeyError());

  return new Resend(process.env.RESEND_TOKEN);
});

export const resendSendEffect = (emailOptions: CreateEmailOptions) =>
  Effect.gen(function* () {
    const resend = yield* initializeResendEffect;

    const result = yield* Effect.tryPromise({
      try: () => resend.emails.send(emailOptions),
      catch: (error) => new ResendSendError({ error: error as ErrorResponse }),
    });

    if (process.env.NODE_ENV === "development") console.log(result);
  });

export const resendSendBatchEffect = (emailOptions: CreateBatchOptions) =>
  Effect.gen(function* () {
    const resend = yield* initializeResendEffect;

    const result = yield* Effect.tryPromise({
      try: () => resend.batch.send(emailOptions),
      catch: (error) => new ResendSendError({ error: error as ErrorResponse }),
    });

    if (process.env.NODE_ENV === "development") console.log(result);
  });
