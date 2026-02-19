import Image from "next/image";
import prozesoLogoWhite from "@/assets/prozeso-logo-white.svg";

type LogoProps = {
  priority?: boolean;
};

export default function Logo({ priority = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={25}
        height={25}
        src={prozesoLogoWhite}
        alt="Prozeso logo"
        priority={priority}
      />
      <p className="font-inter text-base font-bold mt-[-3px]">prozeso</p>
    </div>
  );
}
