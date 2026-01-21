import { request } from "@/lib/cms";
import { ContactDocument } from "../../../graphql/generated";
import { Container } from "@/components/ui/container";
import { Centered } from "@/components/centered";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import { ContactForm } from "@/components/contact/contact-form";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const { contact } = await request(ContactDocument);

  return {
    title: contact?.seo?.data?.title,
    description: contact?.seo?.data?.description,
    keywords: contact?.seo?.keywords,
    openGraph: {
      images: contact?.seo?.data?.image?.url,
    },
  };
};

const ContactPage = async () => {
  const { contact } = await request(ContactDocument);

  if (!contact?.details) return null;

  const [email, phone] = contact.details?.split("/");

  return (
    <Container>
      <Centered>
        <div>
          <Link href="/" className="sticky top-8 z-20 w-full">
            <Button
              color="white"
              className="z-10 mt-6 w-full justify-between"
              icon="arrowLeft"
              iconPosition="left"
            >
              Wróć
            </Button>
          </Link>
          <div className="mt-12 flex flex-col gap-6">
            <H1>{contact?.title}</H1>
            <P>{contact?.description}</P>
            <p className="text-[0.65rem] uppercase">
              <a href={`mailto:${email.trim()}`} className="underline">
                {email}
              </a>
              /
              <a href={`tel:${phone.trim()}`} className="underline">
                {phone}
              </a>
            </p>
          </div>
          <ContactForm className="mt-12" />
        </div>
      </Centered>
    </Container>
  );
};

export default ContactPage;
