import { slugify } from "@/lib/utils/textConverter";
import React, { useEffect, useState } from "react";

type AccordionpProps = {
  children: React.ReactNode;
  title: string;
  index?: string;
  active?: boolean;
};

export default function Accordion({
  children,
  title,
  index,
  active = false,
}: AccordionpProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, []);

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        aria-expanded={accordionOpen}
        aria-controls={`accordion-title-${index ? index : slugify(title)}`}
        onClick={(e) => {
          e.preventDefault();
          setAccordionOpen(!accordionOpen);
        }}>
        <svg
          className={`${accordionOpen ? "active " : ""}accordion-icon`}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            y="7"
            width="16"
            height="1.2"
            rx="0"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="1.2"
            rx="0"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
        <span>{title}</span>
      </button>

      <div
        id={`accordion-content-${index ? index : slugify(title)}`}
        aria-labelledby={`accordion-title-${index ? index : slugify(title)}`}
        className={`accordion-content ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 active"
            : "grid-rows-[0fr] opacity-0"
        }`}>
        <div className="overflow-hidden">
          <div className="pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
