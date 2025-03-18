import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";

interface ContactLinkProps {
  href: string;
  children: React.ReactNode;
}

const ContactLink: React.FC<ContactLinkProps> = ({ href, children }) => (
  <Link className="text-primary hover:underline" href={href} passHref>
    <AuroraText>{children}</AuroraText>
  </Link>
);

export default function ContactCard() {
  return (
    <Flex direction="column" align="center" className="text-center w-full">
      <Heading
        size={{ initial: "2", sm: "6" }}
        className="font-bold tracking-tighter"
      >
        Interested in chatting? <br /><br />
        Feel free to reach out on{" "}
        <ContactLink href="https://x.com/Celestial_Yash">Twitter</ContactLink>, or send a message on{" "}
        <ContactLink href="https://www.instagram.com/yash.kumar.singh.30/">Instagram</ContactLink>.
        <br /><br />
        You can also drop me an email at{" "}
        <ContactLink href="mailto:yashkumarsingh@ieee.org">yashkumarsingh@ieee.org</ContactLink>.
        I’ll get back to you as soon as I can though please note that I may not respond to unsolicited inquiries.
      </Heading>
    </Flex>
  );
}
