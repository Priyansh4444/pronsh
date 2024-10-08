import React, { ReactElement, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Explosion from "react-canvas-confetti/dist/presets/fireworks";
import emailjs from "@emailjs/browser";
import {
  Check,
  GithubIcon,
  InstagramIcon,
  Linkedin,
  Mail,
  ScrollText,
  X,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { TConductorInstance } from "react-canvas-confetti/dist/types";
import { MouseEvent } from "react";
import Lottie from "lottie-react";
import * as animationData from "@/components/BirdAnimation.json";

export const TextParallaxContentCollaborate = () => {
  return (
    <div className="bg-zinc-950 py-10 mt-32">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3?q=80&w=2416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        subheading="pls contact me"
        heading="Collaborate with me"
      >
        <ContactMe />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({
  imgUrl,
  subheading,
  heading,
  children,
}: {
  imgUrl: string;
  subheading: string;
  heading: string;
  children: ReactElement;
}) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({
  subheading,
  heading,
}: {
  subheading: string;
  heading: string;
}) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ContactMe = () => (
  <div>
    <Footer />
  </div>
);

export function Footer() {
  const { toast } = useToast();
  const [particleCount, setParticleCount] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateParticleCount = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newParticleCount = Math.floor((width * height) / 25000); // Adjust this formula as needed
    setParticleCount(newParticleCount);
  }, []);

  const [conductor, setConductor] = useState<undefined | TConductorInstance>(
    undefined,
  );

  useEffect(() => {
    window.addEventListener("resize", updateParticleCount);
    updateParticleCount();
    return () => {
      window.removeEventListener("resize", updateParticleCount);
    };
  }, [updateParticleCount]);

  const splurgeConfetti = useCallback(() => {
    if (conductor) {
      conductor.run({ speed: 3, duration: 1500 });
    } else {
      console.log("Error capturing conductor.");
    }
  }, [conductor]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors({ ...errors, [id]: "" });
  };

  const validateInput = (name: keyof typeof formData) => {
    const input = formData[name];
    if (input === "") {
      setErrors({ ...errors, [name]: `Please enter your ${name}` });
      return false;
    }
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!input.match(emailRegex)) {
        setErrors({ ...errors, [name]: "Please enter a valid email" });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = Object.keys(formData).every((key) =>
      validateInput(key as keyof typeof formData),
    );
    if (!isFormValid) return;

    setStatus("Sending...");

    const templateParams = {
      from_name: formData.name,
      subject: formData.subject,
      email: formData.email,
      message: formData.message,
    };

    try {
      const publicID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID!;
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

      emailjs.init(publicID);
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
      );
      // const response = {
      //   status: 200,
      // };
      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        splurgeConfetti();

        toast({
          title: "Success",
          description: "Your message has been sent successfully!",
          action: <Check className="text-green-500" size={44} />,
        });
      } else {
        setStatus("Failed to send message. Please try again later.");
        setSuccess(false);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          action: <X className="text-red-500" size={44} />,
        });
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Please try again later.");
      setSuccess(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        action: <X className="text-red-500" size={44} />,
      });
    }
  };

  return (
    <footer className="py-12 md:py-16 lg:py-20">
      <Explosion
        onInit={(instance) => {
          setConductor(instance.conductor);
        }}
        decorateOptions={(options) => {
          return { ...options, particleCount: particleCount };
        }}
        globalOptions={{ disableForReducedMotion: true }}
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Get in Touch
            </h2>
            <p className="text-neutral-600 text-base md:text-lg lg:text-xl">
              Have a question or want to work together? Fill out the form and I
              will get back to you as soon as possible.
            </p>
            <div className="flex space-x-4 mt-4">
              <Icons />
            </div>
            <Lottie animationData={animationData} loop className="w-[25%]" />
          </div>
          <form
            className="space-y-6 md:space-y-6 lg:space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="space-y-2 relative">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => validateInput("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs absolute -bottom-5">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => validateInput("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs absolute -bottom-5">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Enter the subject of the mail"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={() => validateInput("subject")}
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs absolute -bottom-5">
                    {errors.subject}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className="min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => validateInput("message")}
              />
              {errors.message && (
                <p className="text-red-500 text-xs absolute -bottom-5">
                  {errors.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full mt-12 md:w-auto">
              Send Message
            </Button>
            {status && <p>{status}</p>}
          </form>
        </div>
      </div>
    </footer>
  );
}

const Icons = () => {
  const iconSize = 32; // Adjust this value as needed to make the icons bigger
  return (
    <>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="https://github.com/Priyansh4444"
        >
          <GithubIcon size={iconSize} />
        </Link>
      </Framer>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="https://www.linkedin.com/in/priyansh-shah-569b3b224/"
        >
          <Linkedin size={iconSize} />
        </Link>
      </Framer>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="mailto:Priyanshpokemon@gmail.com"
        >
          <Mail size={iconSize} />
        </Link>
      </Framer>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="https://devpost.com/Priyansh4444"
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 36 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              id="Vector"
              d="M9.42388 0L0.75882 15.0058L9.42388 30H26.7425L35.4075 15.0058L26.7425 0H9.42388ZM11.7237 5.89605H17.422C22.6265 5.89605 26.4826 8.34312 26.4826 15.0058C26.4826 21.41 21.8483 24.1039 17.1621 24.1039H11.7237V5.89605ZM15.3575 9.43166V20.5683H17.1491C20.9691 20.5683 22.7247 18.3306 22.7247 14.9942C22.7376 11.2854 21.1424 9.43166 17.2863 9.43166H15.3575Z"
              fill="currentColor" // Use currentColor to ensure it inherits the text color
            />
          </svg>
        </Link>
      </Framer>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="https://www.instagram.com/ppronshh/"
        >
          <InstagramIcon size={iconSize} />
        </Link>
      </Framer>
      <Framer>
        <Link
          className="text-sm font-medium text-gray-600 hover:text-gray-50 duration-500"
          href="https://drive.google.com/file/d/1RyENPIsiNQX1kiuLfzfRbrJYVUVBSmGV/view"
        >
          <ScrollText size={iconSize} />
        </Link>
      </Framer>
    </>
  );
};

function Framer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX, y: middleY });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
