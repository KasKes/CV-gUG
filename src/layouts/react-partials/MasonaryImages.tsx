import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

const useLayoutEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

// import optional lightbox plugins
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Captions from "yet-another-react-lightbox/plugins/captions";

const Filter = ({ images, mobile, desktop, large }: any) => {
  const structuredPhotos: any = [];
  const [index, setIndex] = useState(-1);

  const imagesRealPaths = [];
  for (const key in images) {
    if (images.hasOwnProperty(key)) {
      imagesRealPaths.push(key.replace("/public/", "/"));
    }
  }

  const [columns, setColumns] = React.useState({
    mobile: mobile,
    desktop: desktop,
    large: large,
  });

  imagesRealPaths &&
    imagesRealPaths[0] &&
    imagesRealPaths.forEach((image: any) => {
      !(image.includes("600x0") || image.includes("800x0")) &&
        structuredPhotos.push({
          src: image,
          width: 2000,
          height: "",
        });
    });

  useLayoutEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      const viewportSize = window.innerWidth;
      setColumns(
        viewportSize < 540
          ? columns.mobile
          : viewportSize < 1024
            ? columns.desktop
            : columns.large
      );
    };

    // Call handleResize on initial render and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div data-no-swup>
      <PhotoAlbum
        photos={structuredPhotos}
        columns={columns}
        layout="masonry"
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }: any) => {

          const [mainPath, src] = photo.src
            ?.split("?origWidth")[0]
            ?.split("/public/");

          let name = "";
          let ext = "";

          let mobile = "";

          if (photo.src.includes("?origWidth")) {
            name = src?.split(src.match(/.\w+$/))[0];
            ext = src?.split(name)[1];

            mobile = "/" + name + "-600x0" + ext;
          } else {
            name = photo.src?.split(photo.src.match(/.\w+$/))[0];
            ext = photo.src?.split(name)[1];
            mobile = name + "-600x0" + ext;
          }

          return (
            <figure>
              <button style={wrapperStyle} data-no-swup aria-label="">
                <span className="sr-only">show image in lightbox</span>
                <picture>
                  <source srcSet={mobile} media="(max-width: 1920px)" />
                  {renderDefaultPhoto({ wrapped: true })}
                </picture>
              </button>
            </figure>
          );
        }}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={structuredPhotos}
        open={index >= 0}
        index={index}
        data-no-swup
        captions={{ showToggle: false, descriptionTextAlign: "center" }}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Counter, Captions]}
      />
    </div>
  );
};

export default Filter;
