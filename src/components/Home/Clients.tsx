"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const clients = [
  { id: "albet", name: "Albet", src: "/assets/clients/albet.png" },
  { id: "altipesa", name: "Altipesa", src: "/assets/clients/altipesa.png" },
  { id: "can-cuinat", name: "Can Cuinat", src: "/assets/clients/can-cuinat.png" },
  { id: "hohomes", name: "Ho Homes", src: "/assets/clients/hohomes.png" },
  { id: "izuuk", name: "Izuuk", src: "/assets/clients/izuuk.png" },
  { id: "ktl-ladders", name: "KTL Ladders", src: "/assets/clients/ktl-ladders.png" },
  { id: "mayoral", name: "Mayoral", src: "/assets/clients/mayoral.png" },
  { id: "novify", name: "Novify", src: "/assets/clients/novify.png" },
];

const ClientLogo = ({ client }: { client: (typeof clients)[number] }) => (
  <div
    className="flex items-center justify-center shrink-0 px-4 sm:px-8 md:px-12"
    aria-label={client.name}
  >
    <div className="relative h-[52px] w-[80px] sm:h-[70px] sm:w-[110px] md:h-[80px] md:w-[120px] opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300">
      <Image
        src={client.src}
        alt={client.name}
        fill
        sizes="(min-width: 640px) 200px, 140px"
        className="object-contain"
      />
    </div>
  </div>
);

const Clients = () => {
  const t = useTranslations("home.clients");

  return (
    <section className="pt-16 pb-8">
      <div className="container mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-3"
        >
          <p className="text-base text-foreground-subtle max-w-2xl mx-auto font-normal mb-8 text-balance">
            {t.rich("subtitle", {
              primary: (chunks) => (
                <span className="font-medium text-foreground">{chunks}</span>
              ),
              accent: (chunks) => (
                <span className="text-secondary">{chunks}</span>
              ),
            })}
          </p>
        </motion.div>
      </div>
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex items-center w-max"
          animate={{ x: ["0%", "-25%"] }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {Array.from({ length: 4 }, () => clients)
            .flat()
            .map((client, idx) => (
              <ClientLogo key={`${client.id}-${idx}`} client={client} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
