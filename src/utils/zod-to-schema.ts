import { Effect, Data } from "effect";
import * as z from "zod";

class ZodValidationError extends Data.TaggedError("ZodValidationError")<{
  errors?: z.ZodError;
}> {}

export const zodToSchema = <T>(schema: z.ZodType<T>) => ({
  decode: (input: unknown) =>
    Effect.try({
      try: () => schema.parse(input),
      catch: (error) => {
        if (error instanceof z.ZodError) {
          return new ZodValidationError({ errors: error });
        }

        return new ZodValidationError({});
      },
    }),
});
