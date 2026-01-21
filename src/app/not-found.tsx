import { Centered } from "@/components/centered";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { H1, P } from "@/components/ui/typography";
import Link from "next/link";

const NotFound = () => (
  <Container>
    <Centered>
      <div>
        <Link href="/" className="w-full">
          <Button
            color="white"
            icon="arrowLeft"
            iconPosition="left"
            className="w-full justify-between"
          >
            Strona główna
          </Button>
        </Link>
        <div>
          <H1 className="mt-12 text-7xl">
            ERROR <span className="text-error">404</span>
          </H1>

          <P className="mt-4 text-base">Nie odnaleziono oczekiwanej strony</P>
        </div>
      </div>
    </Centered>
  </Container>
);

export default NotFound;
