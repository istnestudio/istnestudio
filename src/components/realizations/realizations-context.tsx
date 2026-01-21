"use client";

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { RealizationCardFragment } from "../../../graphql/generated";

export const categories = ["web", "brand", "content"] as const;
export type Category = (typeof categories)[number];

type RealizationsContextProps = {
  category: Category;
  setCategory: Dispatch<SetStateAction<Category>>;
  realizations: RealizationCardFragment[];
};

export const RealizationsContext = createContext<RealizationsContextProps>({
  category: "web",
  setCategory: () => {},
  realizations: [],
});

export const useRealizations = () => useContext(RealizationsContext);

type RealizationsContextProviderProps = PropsWithChildren<{
  realizations: RealizationCardFragment[];
}>;

export const RealizationsContextProvider = ({
  realizations,
  children,
}: RealizationsContextProviderProps) => {
  const [category, setCategory] = useState<Category>("web");

  const filteredRealizations = realizations.filter(
    (r) => r.category === category,
  );

  return (
    <RealizationsContext.Provider
      value={{
        category,
        setCategory,
        realizations: filteredRealizations || [],
      }}
    >
      {children}
    </RealizationsContext.Provider>
  );
};
