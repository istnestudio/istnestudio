import { request } from "@/lib/cms";
import {
  HomepageDocument,
  RealizationCardsDocument,
} from "../../graphql/generated";

import { Icon } from "@/components/ui/icons";
import { H1, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { RealizationsContextProvider } from "@/components/realizations/realizations-context";
import { RealizationsCategorySelect } from "@/components/realizations/realizations-category-select";
import { RealizationCards } from "@/components/realizations/realization-cards";
import { Centered } from "@/components/centered";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const { homepage } = await request(HomepageDocument);

  return {
    title: homepage?.seo?.data?.title,
    description: homepage?.seo?.data?.description,
    keywords: homepage?.seo?.keywords,
    openGraph: {
      images: homepage?.seo?.data?.image?.url,
    },
  };
};

const Homepage = async () => {
  const [{ homepage }, { allRealizations }] = await Promise.all([
    request(HomepageDocument),
    request(RealizationCardsDocument),
  ]);

  return (
    <Container>
      <Centered>
        <div className="flex w-full flex-col items-center text-center">
          <Icon icon="logo" />
          <H1 className="mt-12">{homepage?.title}</H1>
          <P className="mt-6">{homepage?.subtitle}</P>
        </div>
      </Centered>
      <Centered>
        <Link href="/contact" className="sticky top-8 z-20 w-full">
          <Button
            color="white"
            className="mt-6 w-full justify-between"
            icon="arrowRight"
            iconPosition="right"
          >
            Kontakt
          </Button>
        </Link>
      </Centered>
      <RealizationsContextProvider realizations={allRealizations}>
        <Centered>
          <RealizationsCategorySelect className="mt-12 mb-4 w-full lg:mt-4 lg:mb-12" />
        </Centered>
        <RealizationCards />
      </RealizationsContextProvider>
    </Container>
  );
};

export default Homepage;
