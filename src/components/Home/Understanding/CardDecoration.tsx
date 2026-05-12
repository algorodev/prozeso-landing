type Props = {
  variant: number;
  color: string;
};

export const CardDecoration = ({ variant, color }: Props) => {
  if (variant === 0) {
    return (
      <>
        <span
          className="pointer-events-none absolute -bottom-32 -right-24 h-64 w-64 rounded-full blur-[100px] opacity-20"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute overflow-hidden"
          style={{ top: -2, left: -2, width: "55%", height: "70%" }}
          aria-hidden="true"
        >
          <span
            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: color,
              left: "calc(60% + 20px)",
              top: "calc(60% + 2px)",
            }}
          />
        </div>
      </>
    );
  }

  if (variant === 1) {
    return (
      <>
        <span
          className="pointer-events-none absolute -top-32 -left-24 h-64 w-64 rounded-full blur-[100px] opacity-20"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute"
          style={{
            top: "30%",
            left: "50%",
            width: "150%",
            height: "130%",
            transform: "translateX(-50%)",
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
          aria-hidden="true"
        >
          <span
            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: color,
              left: "calc(60% + 20px)",
              top: "calc(60% + 2px)",
            }}
          />
        </div>
      </>
    );
  }

  if (variant === 2) {
    return (
      <>
        <span
          className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full blur-[100px] opacity-15"
          style={{ background: color }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute"
          style={{
            top: "-100px",
            left: "30%",
            width: "130%",
            height: "130%",
            clipPath: "circle(50% at 50% 50%)",
          }}
          aria-hidden="true"
        >
          <span
            className="absolute h-64 w-64 rounded-full blur-[100px] opacity-10 -translate-x-1/2 -translate-y-1/2"
            style={{ background: color, left: "30%", top: "50%" }}
          />
        </div>
      </>
    );
  }

  return null;
};
