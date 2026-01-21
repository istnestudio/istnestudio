import type { Metadata } from "next";
import { request } from "@/lib/cms";
import { notFound } from "next/navigation";
import {
  RealizationDocument,
  RealizationSlugsDocument,
} from "../../../../graphql/generated";
import { Centered } from "@/components/centered";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { H1, P } from "@/components/ui/typography";
import { RealizationChatBubble } from "@/components/realizations/realization-chat-bubble";
import { RealizationsSlidesGrid } from "@/components/realizations/realization-slides-grid";

export const generateStaticParams = async () => {
  const realizations = await request(RealizationSlugsDocument);
  return realizations?.allRealizations.map(({ slug }) => ({ slug })) || [];
};

export const generateMetadata = async ({
  params,
}: PageProps<"/realizations/[slug]">): Promise<Metadata> => {
  const slug = (await params).slug;
  const { realization } = await request(RealizationDocument, { slug });

  if (!realization) return {};

  return {
    title: `Istnestudio | ${realization?.title}`,
    description: realization?.description,
    keywords: realization?.keywords,
    openGraph: {
      images: realization.slides[0].responsiveImage?.src,
    },
  };
};

const RealizationPage = async ({
  params,
}: PageProps<"/realizations/[slug]">) => {
  const slug = (await params).slug;

  if (!slug) notFound();

  const { realization } = await request(RealizationDocument, { slug });

  if (!realization) notFound();

  return (
    <>
      <Container>
        <Centered>
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
        </Centered>
        <Centered>
          <div className="mt-6 flex flex-col gap-6">
            <H1>{realization.title}</H1>
            <div className="flex h-6 w-full items-center justify-between rounded-lg border border-foreground">
              <P className="-mt-0.5 flex-1">{realization.realizationYear}</P>
              <div className="flex-1 border-r border-l border-foreground">
                <P className="-mt-0.5">{realization.realizationTime}</P>
              </div>
              <P className="-mt-0.5 flex-1">{realization.category}</P>
            </div>
            <P>{realization.description}</P>
            <div className="flex flex-col gap-4">
              {realization.chatBubbles.map((bubble) => (
                <RealizationChatBubble {...bubble} key={bubble.message} />
              ))}
            </div>
            <Link href="/contact">
              <Button
                color="white"
                className="w-full justify-between"
                icon="arrowRight"
                iconPosition="right"
              >
                Kontakt
              </Button>
            </Link>
          </div>
        </Centered>
        <RealizationsSlidesGrid {...realization} className="mt-12" />
        <Centered>
          {realization.buttonLink && (
            <a href={realization.buttonLink.href || "#"} className="mt-12">
              <Button className="w-full" color="black">
                {realization.buttonLink.display}
              </Button>
            </a>
          )}
        </Centered>
      </Container>
    </>
  );
};

export default RealizationPage;
