import { Flex, Link } from "@radix-ui/themes";
import { AboutHeading } from "./about-heading";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import BoxReveal from "@/components/magicui/box-reveal";
import { SectionHeading } from "../section-heading";
import { Selfie } from "./selfie";

export const About = () => {
  return (
    <Flex direction={"column"} gap={"6"} mb={'2'}>
      <Selfie />
      <AboutHeading />
      <Flex direction={"column"} gap={"3"}>
        <SectionHeading title={"About Me"} />
        <BoxReveal boxColor={"black"}>
          <AnimatedShinyText
            className={"text-gray-400 text-sm sm:text-lg"}
            shimmerWidth={200}
          >
            I am Yash Kumar Singh, a B.Tech student at Galgotias University with
            a strong foundation in{" "}
            <Link href={"/"}>Data Structures & Algorithms (DSA)</Link> and a
            keen interest in <Link href={"/"}>AI/ML</Link>. Proficient in{" "}
            <Link href={"/"}>Python, C/C++, and Java</Link>, I focus on writing
            efficient code and solving complex problems. With experience in
            full-stack development using{" "}
            <Link href={"/"}>JavaScript, React, Express, and Django</Link>, I
            build scalable, user-centric applications. Constantly exploring
            emerging technologies, I strive to bridge the gap between theory and
            real-world implementation. Open to collaborations and new
            opportunities—<Link href={"/"}>let’s connect!</Link>
          </AnimatedShinyText>
        </BoxReveal>
      </Flex>
      {/* <Technology /> */}
    </Flex>
  );
};
