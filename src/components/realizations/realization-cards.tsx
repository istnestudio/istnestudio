"use client";

import { useEffect, useRef } from "react";
import { RealizationCard } from "./realization-card";
import { useRealizations } from "./realizations-context";
import autoAnimate from "@formkit/auto-animate";
import { CardsGrid } from "../ui/cards-grid";
import { RealizationCardFragment } from "../../../graphql/generated";

const sortByCreationDate = (
  a: RealizationCardFragment,
  b: RealizationCardFragment,
) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();

export const RealizationCards = () => {
  const { realizations } = useRealizations();
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <CardsGrid ref={parent} className="w-full">
      {realizations.sort(sortByCreationDate).map((realization, idx) => (
        <RealizationCard {...realization} key={realization.slug} idx={idx} />
      ))}
    </CardsGrid>
  );
};
