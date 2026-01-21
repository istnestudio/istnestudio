import { request } from "@/lib/cms";
import { renderNodeRule, StructuredText } from "react-datocms";
import { PrivacyPolicyDocument } from "../../../graphql/generated";
import { Container } from "@/components/ui/container";
import { Centered } from "@/components/centered";
import { Button } from "@/components/ui/button";
import {
  isHeading,
  isList,
  isListItem,
  isParagraph,
} from "datocms-structured-text-utils";
import { H1, P } from "@/components/ui/typography";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const { privacyPolicy } = await request(PrivacyPolicyDocument);

  return {
    title: privacyPolicy?.seo?.data?.title,
    description: privacyPolicy?.seo?.data?.description,
    keywords: privacyPolicy?.seo?.keywords,
    openGraph: {
      images: privacyPolicy?.seo?.data?.image?.url,
    },
  };
};

const PrivacyPolicyPage = async () => {
  const { privacyPolicy } = await request(PrivacyPolicyDocument);

  return (
    <Container>
      <Centered>
        <div className="text-left">
          <Link href="/">
            <Button
              color="white"
              className="sticky top-8 w-full justify-between"
              icon="arrowLeft"
              iconPosition="left"
            >
              Wróć
            </Button>
          </Link>
          <div className="mt-12 space-y-6">
            <StructuredText
              data={privacyPolicy?.content}
              customNodeRules={[
                renderNodeRule(isHeading, ({ node, children, key }) => {
                  switch (node.level) {
                    case 1:
                      return <H1 key={key}>{children}</H1>;
                    case 2:
                      return (
                        <h2
                          key={key}
                          className="text-base leading-6 tracking-[10%]"
                        >
                          {children}
                        </h2>
                      );
                    case 3:
                      return (
                        <h3
                          key={key}
                          className="text-sm leading-5.5 tracking-[10%]"
                        >
                          {children}
                        </h3>
                      );
                    case 4:
                      return (
                        <h4
                          key={key}
                          className="text-xs leading-4.5 tracking-[10%]"
                        >
                          {children}
                        </h4>
                      );
                    default:
                      return null;
                  }
                }),
                renderNodeRule(isParagraph, ({ children, key }) => (
                  <P key={key}>{children}</P>
                )),
                renderNodeRule(isList, ({ node, children, key }) => {
                  const base =
                    "space-y-0 list-outside text-xs font-schrifted ml-3 ";

                  return node.style === "numbered" ? (
                    <ol key={key} className={`${base}list-decimal`}>
                      {children}
                    </ol>
                  ) : (
                    <ul key={key} className={`${base}list-disc`}>
                      {children}
                    </ul>
                  );
                }),
                renderNodeRule(isListItem, ({ children, key }) => (
                  <li key={key} className="font-schrifted text-xs leading-4.5">
                    {children}
                  </li>
                )),
              ]}
            />
          </div>
        </div>
      </Centered>
    </Container>
  );
};

export default PrivacyPolicyPage;
