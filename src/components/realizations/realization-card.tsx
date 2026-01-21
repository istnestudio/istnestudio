"use client";

import Image from "next/image";
import { RealizationCardFragment } from "../../../graphql/generated";
import useEmblaCarousel from "embla-carousel-react";
import { Icon } from "../ui/icons";
import { H2 } from "../ui/typography";
import { Button } from "../ui/button";
import Link from "next/link";

export const RealizationCard = ({
  slides,
  title,
  slug,
}: RealizationCardFragment) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  return (
    <article ref={emblaRef} className="embla relative aspect-4/5 w-full">
      <div className="embla__container h-full w-full basis-full">
        {slides.map(({ responsiveImage, id, blurUpThumb }, idx) => (
          <Image
            className="embla__slide"
            key={id + idx}
            blurDataURL={blurUpThumb || ""}
            alt={responsiveImage?.alt || ""}
            src={responsiveImage?.src || ""}
            sizes={responsiveImage?.sizes || ""}
            width={responsiveImage?.width || 0}
            height={responsiveImage?.height || 0}
          />
        ))}
      </div>

      <H2 className="absolute top-8 left-1/2 -translate-x-1/2 text-background">
        {title}
      </H2>
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute top-1/2 left-8 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-foreground text-background"
        aria-label="Poprzedni slide"
      >
        <Icon icon="chevronLeft" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute top-1/2 right-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-foreground text-background"
        aria-label="Następny slide"
      >
        <Icon icon="chevronRight" />
      </button>
      <Link href={`/realizations/${slug}`}>
        <Button
          color="black"
          className="absolute bottom-8 left-1/2 w-[calc(100%-64px)] -translate-x-1/2"
        >
          Zobacz wiecej
        </Button>
      </Link>
    </article>
  );
};
