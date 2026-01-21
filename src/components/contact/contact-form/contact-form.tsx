"use client";

import { cn } from "@/utils/cn";
import { Input } from "../../ui/input";
import { TextArea } from "../../ui/text-area";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { ContactFormData, ContactFormSchema } from "./schema";
import { sendEmail } from "@/actions/send-email";
import toast from "react-hot-toast";

const addSpaces = (number: string) => {
  number = number.replace(/\D/g, "");
  number = number.match(/.{1,3}/g)?.join(" ") || "";
  return number;
};

export const ContactForm = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(ContactFormSchema),
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ContactFormData) => {
    startTransition(async () => {
      const success = await sendEmail(data);

      if (success) {
        toast.success("Pomyślnie wysłano wiadomość!");
        reset();
        return;
      }

      toast.error("Wystąpił błąd! Spróbuj ponownie później");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "w-full space-y-2 rounded-2xl bg-gray-light p-4",
        className,
      )}
    >
      <h2 className="text-[0.65rem] uppercase">Formularz kontaktowy</h2>
      <Input label="imię" name="name" register={register} error={errors.name} />
      <Input
        label="mail"
        type="email"
        name="email"
        register={register}
        error={errors.email}
      />
      <Input
        label="telefon"
        name="phone"
        error={errors.phone}
        register={register}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          if (target.value.length > 11)
            target.value = target.value.slice(0, 11);

          const spacedValue = addSpaces(target.value);
          target.value = spacedValue;

          register("phone").onChange(e);
        }}
      />
      <TextArea
        label="wiadomość"
        name="message"
        className="resize-none"
        error={errors.message}
        register={register}
      />
      <div className="flex items-start gap-4 py-2">
        <Checkbox
          id="terms"
          name="terms"
          register={register}
          error={errors.terms}
        />
        <label
          htmlFor="terms"
          className={cn(
            "cursor-pointer text-left font-schrifted text-[0.65rem] leading-4",
            {
              "text-error": errors.terms,
            },
          )}
        >
          Wypełnienie formularza oznacza, że podane w nim dane osobowe będą
          przetwarzane w celu przesłania oferty oraz kontaktu w jej sprawie.
          Więcej informacji znajdziesz w naszej{" "}
          <Link href="/privacy-policy" className="underline">
            polityce prywatności
          </Link>
          .
        </label>
      </div>
      <Button
        color={isPending ? "pending" : "black"}
        icon="arrowRight"
        iconPosition="right"
        className="w-full justify-between"
        disabled={isPending}
      >
        {isPending ? "Wysyłanie..." : "Wyślij wiadomość"}
      </Button>
    </form>
  );
};
