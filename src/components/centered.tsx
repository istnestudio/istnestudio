import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from "react";

type WithClassNameAndRef = {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  forwardedRef?: React.Ref<HTMLDivElement>;
};

export const Centered = ({ children }: PropsWithChildren) => {
  const childrenArr = Children.toArray(children);

  if (childrenArr.length > 0 && isValidElement(childrenArr[0])) {
    const first = childrenArr[0] as ReactElement<WithClassNameAndRef>;
    const existingRef = first.props.ref || first.props.forwardedRef;

    childrenArr[0] = cloneElement(first, {
      className: `${first.props.className || ""} lg:w-[calc(33%-12px)]`,
      ref: existingRef,
    });
  }

  return childrenArr;
};
