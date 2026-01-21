import { ReactElement } from "react";

type IconProps = {
  className?: string;
};

const icons = {
  logo: ({ className }) => (
    <svg
      width="106"
      height="24"
      viewBox="0 0 106 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M106 24H0V0H106V24ZM6.42424 9.6V17.6H8.0303V9.6H6.42424ZM11.2424 16V17.6H16.0606V16H11.2424ZM24.0909 16V17.6H27.303V16H24.0909ZM30.5152 9.6V17.6H32.1212V11.2H35.3333V9.6H30.5152ZM35.3333 11.2V17.6H36.9394V11.2H35.3333ZM41.7576 16V17.6H44.9697V16H41.7576ZM49.7879 16V17.6H54.6061V16H49.7879ZM62.6364 16V17.6H65.8485V16H62.6364ZM69.0606 9.6V16H70.6667V17.6H75.4848V9.6H73.8788V16H70.6667V9.6H69.0606ZM83.5152 6.4V9.6H80.303V11.2H83.5152V16H80.303V11.2H78.697V16H80.303V17.6H85.1212V6.4H83.5152ZM88.3333 9.6V17.6H89.9394V9.6H88.3333ZM94.7576 16V17.6H97.9697V16H94.7576ZM16.0606 14.4V16H17.6667V14.4H16.0606ZM22.4848 6.4V9.6H20.8788V11.2H22.4848V16H24.0909V11.2H27.303V9.6H24.0909V6.4H22.4848ZM40.1515 11.2V16H41.7576V14.4H44.9697V12.8H41.7576V11.2H40.1515ZM54.6061 14.4V16H56.2121V14.4H54.6061ZM61.0303 6.4V9.6H59.4242V11.2H61.0303V16H62.6364V11.2H65.8485V9.6H62.6364V6.4H61.0303ZM93.1515 11.2V16H94.7576V11.2H93.1515ZM97.9697 11.2V16H99.5758V11.2H97.9697ZM12.8485 12.8V14.4H16.0606V12.8H12.8485ZM51.3939 12.8V14.4H54.6061V12.8H51.3939ZM11.2424 11.2V12.8H12.8485V11.2H11.2424ZM44.9697 11.2V12.8H46.5758V11.2H44.9697ZM49.7879 11.2V12.8H51.3939V11.2H49.7879ZM12.8485 9.6V11.2H17.6667V9.6H12.8485ZM41.7576 9.6V11.2H44.9697V9.6H41.7576ZM51.3939 9.6V11.2H56.2121V9.6H51.3939ZM94.7576 9.6V11.2H97.9697V9.6H94.7576ZM6.42424 6.4V8H8.0303V6.4H6.42424ZM88.3333 6.4V8H89.9394V6.4H88.3333Z"
        fill="currentColor"
      />
    </svg>
  ),

  arrowRight: ({ className }) => (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.73881 0.362434L12 5.36243M12 5.36243L6.73881 10.3624M12 5.36243H0"
        stroke="currentColor"
      />
    </svg>
  ),

  arrowLeft: ({ className }) => (
    <svg
      width="13"
      height="11"
      viewBox="0 0 13 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.98702 0.362434L0.72583 5.36243M0.72583 5.36243L5.98702 10.3624M0.72583 5.36243H12.7258"
        stroke="currentColor"
      />
    </svg>
  ),
  chevronRight: ({ className }) => (
    <svg
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.353516 0.353577L5.35352 5.35358L0.353516 10.3536"
        stroke="currentColor"
      />
    </svg>
  ),
  chevronLeft: ({ className }) => (
    <svg
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.70703 10.3536L0.707031 5.35358L5.70703 0.353577"
        stroke="currentColor"
      />
    </svg>
  ),
} as const satisfies Record<string, (props: IconProps) => ReactElement>;

export type IconKey = keyof typeof icons;

export const Icon = ({ className, icon }: IconProps & { icon: IconKey }) => {
  const Component = icons[icon];
  return <Component className={className} />;
};
