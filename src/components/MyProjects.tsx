import { MouseEvent, useEffect, useState } from "react";
import {
  motion,
  MotionStyle,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import Link from "next/link";
import Image from "next/legacy/image";
import { Badge } from "./ui/badge";
import { HorizontalScroll } from "./HorizontalScroll";
import { SquareArrowOutUpRight } from "lucide-react";
import { Exo } from "next/font/google";
import Atropos from 'atropos/react';
type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>;
  "--y": MotionValue<string>;
};

const lineVariants = {
  initial: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const MyProjects = () => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <section className="mb-52">
      <div className="group relative text-center flex flex-col justify-center align-middle items-center">
        {isClient && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 object-cover left-0 w-[100vw] h-[200vh] z-0"
          >
            <source src="/bg.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
        <div className="glitch animate-pulse text-6xl font-bold">
          My Projects
        </div>
        <motion.svg
          initial="initial"
          whileInView="visible"
          width="340"
          height="50"
          className=""
        >
          <motion.path
            d="M 10 20 Q 90 40, 170 20 T 330 20"
            fill="transparent"
            strokeWidth="4"
            stroke="#4c00b0"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={lineVariants}
            style={{ pathLength, opacity }}
          />
        </motion.svg>
      </div>

      <HorizontalScroll>

        {projects.map((project) => ProjectCard(project))}
      </HorizontalScroll>
    </section>
  );
};

interface Project {
  title: string;
  description: string;
  image: string;
  github: string;
  tags: string[];
}
const ExoFont = Exo({
  subsets: ["latin"],
  style: ["normal"],
});

const ProjectCard = (project: Project) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<Element>) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  return (

    <motion.div
      className={"animated-cards m-2 relative h-full " + ExoFont.className}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
      onMouseMove={handleMouseMove}
      key={project.title}
    >
      <Link
        href={project.github}
      >
        <Atropos className="my-atropos h-full" activeOffset={10} rotateXMax={5} rotateYMax={5}>

          <Card className="group h-full w-[80vw] lg:max-w-[40vw]">

            <div className="p-4">
              <div className="overflow-hidden rounded-lg">

                <Image
                  alt="Image"
                  className="group-hover:scale-105 transition-all"
                  layout="responsive"
                  width={1280}
                  height={832}
                  quality={100}
                  src={project.image}
                  unoptimized
                />

              </div>
            </div>
            <CardHeader className="pt-0 pb-3">
              <CardTitle>
                <div className="flex gap-2 items-center">

                  {project.title}
                  <SquareArrowOutUpRight className="ml-3 mb-1" size={24} />
                </div>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardFooter className="*:mr-2 *:mb-2 flex flex-wrap">
              {project.tags.map((tag) => (
                <Badge
                  variant="secondary"
                  className="border-spacing-1 bg-transparent hover:bg-black text-white-100 border border-white"
                  key={tag}
                >
                  {tag}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        </Atropos>
      </Link>

    </motion.div >
  );
};

export default MyProjects;

const projects = [
  {
    title: "Nourish Ninja",
    description:
      "Nourish Ninja provides personalized nutrition recommendations, a chat bot for tracking progress, recipe suggestions, and a shopping list generator. It also connects to Google Health Connect to provide a comprehensive view of the user's health data.",
    image: "/NourishNinja.jpg",
    github: "https://github.com/Priyansh4444/nourish_ninja",
    tags: ["Flutter", "Gemini API", "Firebase", "Android Studio", "Dart"],
  },
  {
    title: "TubeTasTic",
    description:
      "TubeTasTic is meant to redefine how people use YouTube. In the present day, video recommendations are based on a black-box algorithm and marketing made to entice you to watch something that might not actually be there. We intend to change this by allowing users to gain insight about the video before they watch it.",
    image: "/TubeTasTic.png",
    github: "https://github.com/benjamin-cates/tubetastic",
    tags: [
      "Chrome Extention",
      "Typescript",
      "Gemini Api",
      "NextJs",
      "Clerk",
      "TailwindCSS",
      "Vercel",
    ],
  },
  {
    title: "AI Quest",
    description:
      "Made Originally for IrvineHacks, was a customizable AI chatbot that you can have conversation with—through both text and speech—on a locally-hosted website, with auto-generated personalities and backstory.",
    image: "/ChatQuest.png",
    github: "https://github.com/Priyansh4444/ChatQuest",
    tags: [
      "NextJs",
      "TailwindCSS",
      "Gemini Api",
      "SQL",
      "Vectorization",
      "Python",
      "FastAPI",
      "OpenAI Whisper",
      "ElevenLabs",
      "Google Teachable Machine",
      "Image Recognition",
    ],
  },
  {
    title: "SpiderBall",
    description:
      "Ongoing Game made in Rust which takes inspiration from Spiderman and FlappyBird. The game is a 2D platformer where the player has to swing from one platform to another till the finish line.",
    image: "/BevyMan.gif",
    github: "https://github.com/Priyansh4444/bevy-man",
    tags: ["Rust", "Terrain Generation", "2D Platformer", "Bevy Engine"],
  },
];
