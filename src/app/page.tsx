import { About } from "@/components/core/about/about";
import { Technology } from "@/components/core/about/technology";
import { Education } from "@/components/core/education/education";
import { Hero } from "@/components/core/hero/hero";
import { Projects } from "@/components/core/projects/projects";
import { Work } from "@/components/core/work/work";
import { Contact } from "@/components/core/contacts/contacts";
import { Flex } from "@radix-ui/themes";
import Stats from "@/components/core/stats/stats";



export default function Page() {
  return (
    <Flex direction={"column"} className={"relative"} gap={"5"}>
      <Hero />
      <About />
      <Work />
      <Education />
      <Technology />
      <Projects />
      <Stats/>
      <Contact/>
    </Flex>
  );
}
