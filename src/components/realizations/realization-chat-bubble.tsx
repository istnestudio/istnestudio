import { cn } from "@/utils/cn";
import { RealizationQuery } from "../../../graphql/generated";
import { P } from "../ui/typography";

type RealizationChatBubbleProps = NonNullable<
  RealizationQuery["realization"]
>["chatBubbles"][number];

export const RealizationChatBubble = ({
  isDev,
  message,
}: RealizationChatBubbleProps) => {
  return (
    <section
      aria-label={
        isDev
          ? "Wiadomość od Pana Programisty"
          : "Wiadomość od Pana Projektanta"
      }
      className={cn("flex gap-3", {
        "flex-row-reverse": isDev,
      })}
    >
      <div className="mt-4 h-6 w-6 shrink-0 rounded-full bg-[#c0c0c0]" />
      <div className="flex flex-col gap-3">
        <p
          className={cn(
            "self-start font-schrifted text-[0.625rem] font-medium text-gray-darker",
            {
              "self-end": isDev,
            },
          )}
        >
          {isDev ? "Pan Programista" : "Pan Projektant"}
        </p>
        <div
          className={cn(
            "relative rounded-2xl bg-bubble-designer px-6 py-3 text-left",
            {
              "bg-bubble-dev text-background": isDev,
            },
          )}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("absolute top-0 left-0 text-bubble-designer", {
              "text-bubble-dev right-0 left-auto -rotate-90": isDev,
            })}
          >
            <path
              d="M-2.64167e-05 -2.19355e-06L24 0L24 24L-2.64167e-05 -2.19355e-06Z"
              fill="currentColor"
            />
          </svg>
          <P className="leading-4.5">{message}</P>
        </div>
      </div>
    </section>
  );
};
