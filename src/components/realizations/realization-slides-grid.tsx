"use client";

import Image from "next/image";
import { RealizationQuery } from "../../../graphql/generated";
import { CardsGrid } from "../ui/cards-grid";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";

export const RealizationsSlidesGrid = ({
  slides,
  lightbox,
  className,
}: RealizationQuery["realization"] & {
  className?: string;
}) => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={lightbox.map(({ url, width, height, alt }) => ({
          src: url || "",
          alt: alt || "",
          width: width || 0,
          height: height || 0,
        }))}
      />
      <CardsGrid className={className}>
        {slides.map(({ responsiveImage, blurUpThumb, id }, idx) => (
          <Image
            className="cursor-pointer"
            onClick={() => setIndex(idx)}
            key={id + idx}
            blurDataURL={blurUpThumb || ""}
            alt={responsiveImage?.alt || ""}
            src={responsiveImage?.src || ""}
            sizes={responsiveImage?.sizes || ""}
            width={responsiveImage?.width || 0}
            height={responsiveImage?.height || 0}
          />
        ))}
      </CardsGrid>
    </>
  );
};
