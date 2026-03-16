import Image from "next/image";
import prozesoLogoWhite from "@/assets/logo-prozeso-white-02.svg";

type LogoProps = {
  priority?: boolean;
};

export default function Logo({ priority = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <Image
        width={125}
        height={0}
        src={prozesoLogoWhite}
        alt="Prozeso logo"
        priority={priority}
      />
    </div>
  );
}
