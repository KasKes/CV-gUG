import React, { useState } from "react";
import Star from "@/layouts/icons/Star";

// Example Usage
{
  /* 

import Testmonial from "@/layouts/react-partials/Testmonial";

<Testmonial
  client:load
  name="we"
  image="/images/michael-campos-viola.jpg"
  content="Wir sind mehr als glücklich mit unserer Wahl, Michael unsere Hochzeit begleiten zu lassen. Michael steckt so viel Liebe, Arbeit, Zeit und Ideen in die Bilder und in die Hochzeit rein. Solch eine Leistung und Liebe zum Detail findet man sonst glaube ich bei keinem anderen. Und sie lohnt sich aus. Es sind großartige Bilder, an denen man sich nicht satt sehen kann und immer wieder die Momente von neuem zu fühlen beginnt. Das Fotobuch hat sowieso alles nochmal getoppt und da hat er sich zum gefühlten 10x wieder mal selbst übertroffen. Sowas kriegt man nirgends anders geboten. Riesiges großes Danke vom ganzen Herzen an dich nochmal Michael."
/>
*/
}

const Testmonial = ({
  image,
  name,
  link,
  content,
  colorChangeable = false,
  colorName,
  summeryLength = 300,
  summerySplit = true,
}) => {
  const [showContent, setShowContent] = useState(false);
  const contentLength = content.length;

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <div
      className={`testimonial-card rounded-lg min-h-full flex-col sm:flex-row flex ${!colorChangeable ? "bg-[color-mix(in_srgb,var(--pageColorDark),transparent_90%)]" : ""} ${colorName}`}> 
     <div
        className={`testimonial-card-wrapper sm:flex-[200px] max-sm:w-full min-w-[200px] sm:max-w-[200px] flex-col items-center sm:border-e max-sm:border-b py-4 flex justify-start ${!colorChangeable ? "border-[var(--pageColorDark)]" : ""}`}>
        {image && image.startsWith("/images") ? (
          <a href={link} target="_blank"> 
          <img
            src={image}
            className={`rounded-full w-24 h-24 border-2 testimonial-card-image object-cover mt-0 ${!colorChangeable ? "border-[var(--pageColorDark)]" : ""}`}
            width={96}
            height={96}
            alt={name || "couple picture"}
          /></a>
        ) : image ? (
          <DynamicIcon icon={image} className="!text-inherit text-5xl" />
        ) : (
          ""
        )}
        {name && (
          <div>
            <a href={link} target="_blank"> 
            <h2 className="h6 font-normal excluded-from-color-scheme !text-inherit text-center mt-4 mb-0">
              {name}
            </h2>
            </a>
            <div className="mt-2 flex justify-center gap-x-2">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
          </div>
        )}
      </div>
      {content && (
        <div className="px-6 py-4">
          <div
            className={`text-base me-2 ${summerySplit && !showContent && contentLength >= summeryLength ? "line-clamp-5" : ""}`}>
            {content}
          </div>
          {summerySplit && contentLength >= summeryLength && (
            <button
              className={`inline-block mt-2 uppercase text-xs px-2.5 py-1 rounded-sm btn p-1 testimonial-card-button ${!colorChangeable ? "bg-[color-mix(in_srgb,var(--pageColorDark),transparent_90%)] text-[var(--pageColorLight)]" : ""}`}
              onClick={toggleContent}>
              {showContent ? "weniger" : "MEHR"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Testmonial;
