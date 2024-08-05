import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import { LucideCloudLightning, Zap } from "lucide-react";
const AboutMe = () => {
  const getImageName = (path: string) => {
    const parts = path.split("/");
    const filename = parts[parts.length - 1];
    const nameWithoutExtension = filename.split(".")[0];
    return nameWithoutExtension;
  };
  const images = [
    "/svgs/next.svg",
    "/svgs/rust.svg",
    "/svgs/python.svg",
    "/svgs/typescript.svg",
    "/svgs/github.svg",
    "/svgs/vercel.svg",
    "/svgs/react.svg",
    "/svgs/trpc.svg",
    "/svgs/firebase.svg",
    "/svgs/flutter.svg",
    "/svgs/dart.svg",
    "/svgs/WebGL.svg",
    "/svgs/pytorch.svg",
    "/svgs/postgresql.svg",
    "/svgs/tensorflow.svg",
    "/svgs/drizzle.png",
  ];
  return (
    <section className="bg-background relative py-12 md:py-20">
      <Container>
        <div className="py-16 text-center overflow-hidden relative">
          <RetroGrid />
          <div className="container flex items-center justify-center">
            <svg width="0" height="0">
              <linearGradient
                id="blue-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop stopColor="#ffd319" offset="0%" />
                <stop stopColor="#ff2975" offset="50%" />
                <stop stopColor="#8c1eff" offset="100%" />
              </linearGradient>
            </svg>
            <Zap
              className="mr-2 h-10 w-10 "
              style={{ stroke: "url(#blue-gradient)" }}
            />
            <h2 className="text-2xl selection:bg-[#e76ec957] font-bold bg-gradient-to-b text-transparent from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text md:text-4xl">
              My Preferred Technologies
            </h2>
          </div>
          <p className="text-muted-foreground font-semibold mt-2 md:text-lg selection:bg-[#6ee7b757] mb-5">
            Just some things that excite me in no particular order
          </p>
          <Marquee>
            {images.concat(images).map((image, index) => (
              <div
                key={index}
                className="relative h-20 min-w-[100px] flex justify-center items-center mx-4"
              >
                <div className="relative h-full w-full flex justify-center items-center">
                  <Image
                    src={image}
                    alt={getImageName(image)}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
};

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// {images.concat(images).map((image, index) => (
//   <div
//     key={index}
//     className="relative h-20 min-w-[100px] flex justify-center items-center mx-4"
//   >
//     <div className="relative h-full w-full flex justify-center items-center">
//       <Image src={image} alt={image} layout="fill" objectFit="contain" />
//     </div>
//   </div>
// ))}

function RetroGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none   overflow-hidden absolute h-full w-full opacity-50 [perspective:200px]",
        className,
      )}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(45deg)]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",
            "[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>
    </div>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full rounded-lg border border-dashed px-4 border-zinc-800 sm:px-6 md:px-8">
    <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-700 sm:top-6 md:top-8"></div>
    <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-700 sm:bottom-6 md:bottom-8"></div>
    <div className="relative w-full border-x border-zinc-700">
      <Ellipses />
      <div className="relative z-20 mx-auto py-8">{children}</div>
    </div>
  </div>
);
const Ellipses = () => {
  const sharedClasses =
    "rounded-full outline outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-20 bg-green-400";
  return (
    <div className="absolute z-0 grid h-full w-full items-center gap-8 lg:grid-cols-2">
      <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
        <div className={`${sharedClasses} -mx-[2.5px]`}></div>
        <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
        <div className={`${sharedClasses} -mx-[2.5px]`}></div>
        <div className={`${sharedClasses} -mx-[2px] place-self-end`}></div>
      </section>
    </div>
  );
};

export default AboutMe;
