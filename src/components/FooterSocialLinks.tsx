import { Link as LinkIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode, RefObject } from "react";

import type { AttachFileIconHandle } from "@/components/LucideAnimated/AttachFileIcon";
import type { MessageSquareMoreIconHandle } from "@/components/LucideAnimated/MessageSquareMoreIcon";
import type { GithubIconHandle } from "@/components/LucideAnimated/GithubIcon";
import type { LinkedinIconHandle } from "@/components/LucideAnimated/LinkedinIcon";
import type { SendIconHandle } from "@/components/LucideAnimated/SendIcon";

import { AttachFileIcon } from "@/components/LucideAnimated/AttachFileIcon";
import { MessageSquareMoreIcon } from "@/components/LucideAnimated/MessageSquareMoreIcon";
import { GithubIcon } from "@/components/LucideAnimated/GithubIcon";
import { LinkedinIcon } from "@/components/LucideAnimated/LinkedinIcon";
import { SendIcon } from "@/components/LucideAnimated/SendIcon";

interface SocialLink {
  name: string;
  href: string;
}

interface Props {
  links: SocialLink[];
}

const ICON_SIZE = 16;

interface IconRefs {
  sendIconRef: RefObject<SendIconHandle>;
  linkedinIconRef: RefObject<LinkedinIconHandle>;
  attachFileIconRef: RefObject<AttachFileIconHandle>;
  githubIconRef: RefObject<GithubIconHandle>;
  messageSquareMoreIconRef: RefObject<MessageSquareMoreIconHandle>;
}

const getAnimatedIcon = (
  name: string,
  refs: IconRefs
): ReactNode => {
  switch (name) {
    case "Mail":
      return <SendIcon ref={refs.sendIconRef} size={ICON_SIZE} />;
    case "Linkedin":
      return <LinkedinIcon ref={refs.linkedinIconRef} size={ICON_SIZE} />;
    case "Curriculum Vitae":
      return <AttachFileIcon ref={refs.attachFileIconRef} size={ICON_SIZE} />;
    case "Github":
      return <GithubIcon ref={refs.githubIconRef} size={ICON_SIZE} />;
    case "@enzolefrigo":
      return <MessageSquareMoreIcon ref={refs.messageSquareMoreIconRef} size={ICON_SIZE} />;
    default:
      return <LinkIcon size={ICON_SIZE} aria-hidden="true" />;
  }
};

const getActiveIconHandle = (
  name: string,
  refs: IconRefs
) => {
  switch (name) {
    case "Mail":
      return refs.sendIconRef.current;
    case "Linkedin":
      return refs.linkedinIconRef.current;
    case "Curriculum Vitae":
      return refs.attachFileIconRef.current;
    case "Github":
      return refs.githubIconRef.current;
    case "@enzolefrigo":
      return refs.messageSquareMoreIconRef.current;
    default:
      return null;
  }
};

function FooterSocialLinkItem(props: { link: SocialLink }) {
  const { link } = props;
  const [isHovered, setIsHovered] = useState(false);

  const sendIconRef = useRef<SendIconHandle>(null!);
  const linkedinIconRef = useRef<LinkedinIconHandle>(null!);
  const attachFileIconRef = useRef<AttachFileIconHandle>(null!);
  const githubIconRef = useRef<GithubIconHandle>(null!);
  const messageSquareMoreIconRef = useRef<MessageSquareMoreIconHandle>(null!);

  const refs = {
    sendIconRef,
    linkedinIconRef,
    attachFileIconRef,
    githubIconRef,
    messageSquareMoreIconRef,
  };

  useEffect(() => {
    const iconHandle = getActiveIconHandle(link.name, refs);

    if (!iconHandle) {
      return;
    }

    if (isHovered) {
      iconHandle.startAnimation();
      return;
    }

    iconHandle.stopAnimation();
  }, [isHovered, link.name]);

  return (
    <li className="list-none">
      <a
        className="flex items-center gap-2 transition-colors hover:text-black dark:hover:text-white"
        href={link.href}
        aria-label={link.name}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="w-4 shrink-0 text-center">{getAnimatedIcon(link.name, refs)}</span>
        <span>{link.name}</span>
      </a>
    </li>
  );
}

export function FooterSocialLinks(props: Props) {
  const { links } = props;

  return (
    <ul className="list-none space-y-4 text-neutral-600 dark:text-neutral-300">
      {links.map((link) => (
        <FooterSocialLinkItem key={`${link.name}-${link.href}`} link={link} />
      ))}
    </ul>
  );
}

