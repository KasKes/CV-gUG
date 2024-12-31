import Star from "@/layouts/icons/Star";
import React, { useEffect, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

const useLayoutEffect =
  typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;

// import optional lightbox plugins
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Captions from "yet-another-react-lightbox/plugins/captions";
import DynamicIcon from "./DynamicIcon";

const Filter = ({ projects, uniqCategories, uniqCoupleCategories }: any) => {
  const [clickedCoupleCategory, setClickedCoupleCategory] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState();
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsByCoupleCategory, setResultsByCoupleCategory] =
    useState(projects);

  const [selectedCategory, setSelectedCategory] = useState({
    label: "all",
    coupleCategory: "all",
  });

  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({
    image: "",
    label: "",
  });

  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(-1);
  const [columns, setColumns] = React.useState(4);
  const photos = [];

  // set project data
  useEffect(() => {
    setFilteredResults(projects);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterProjects = () => {
    let filteredData = projects;

    if (selectedCategory.label !== "all") {
      filteredData = filteredData.filter(
        (project: any) => project?.data.category === selectedCategory.label
      );
    }

    if (selectedCategory.coupleCategory !== "all") {
      filteredData = filteredData.filter(
        (project: any) =>
          project.data.couple_category === selectedCategory.coupleCategory
      );
    }

    let filteredByOnlyCoupleCategory = projects.filter(
      (project: any) =>
        project.data.couple_category === selectedCategory.coupleCategory
    );
    setResultsByCoupleCategory(filteredByOnlyCoupleCategory);

    setFilteredResults(filteredData);
  };

  // filter projects by category
  useEffect(() => {
    filterProjects();
  }, [selectedCategory]);

  useEffect(() => {
    if (
      selectedCategory.coupleCategory !== "all" ||
      resultsByCoupleCategory.length !== projects.length
    ) {
      // Update filteredCategories only when coupleCategory changes
      const filteredCategories: any = [];
      uniqCategories.map((category: any) => {
        if (
          resultsByCoupleCategory.some((photo: any) =>
            Object.values(photo.data).includes(category.label)
          )
        ) {
          filteredCategories.push(category);
        }
      });

      filteredCategories
        ? setFilteredCategories(filteredCategories)
        : setFilteredCategories(uniqCategories);
    }
  }, [selectedCategory.coupleCategory, resultsByCoupleCategory]);

  useLayoutEffect(() => {
    // Function to handle window resize events
    const handleResize = () => {
      const viewportSize = window.innerWidth;
      setColumns(viewportSize < 540 ? 1 : viewportSize < 1024 ? 2 : columns);
    };

    // Call handleResize on initial render and add event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  filteredResults.filter((project: any) => {
    photos.push({
      title: project.data.title,
      description: `${project.data.couple_category ? project.data.couple_category + ` · ` : project.data.title ? project.data.title + ` · ` : ""} ${project.data.category}`,
      src: project.data.image,
      width: project.data.width ? project.data.width : 2000,
      height: project.data.height ? project.data.height : 1333,
      category: project.data.category ? project.data.category : "",
      couple_category: project.data.couple_category
        ? project.data.couple_category
        : "",
    });
  });

  const renderCategories =
    filteredCategories && filteredCategories[0]
      ? filteredCategories
      : filteredCategories === undefined
        ? uniqCategories
        : uniqCategories;

  return (
    <div className="col-12" data-no-swup>
      {uniqCoupleCategories && (
        <ul className="flex flex-wrap border-b pb-8 mb-8 border-b-wedding justify-start md:justify-center gap-2 md:gap-x-4 gap-y-4">
          <li>
            <button
              className={`transition block px-6 py-1.5 border border-wedding rounded-full text-base hover:bg-wedding hover:text-white [&.active]:bg-wedding [&.active]:text-white ${selectedCategory.coupleCategory === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory({
                  ...selectedCategory,
                  coupleCategory: "all",
                });
                setClickedCoupleCategory(true);
                setSelectedCategoryDetails({
                  ...selectedCategoryDetails,
                  image: "",
                });
              }}>
              <DynamicIcon icon="TfiReload" className="!text-inherit" />
            </button>
          </li>
          {uniqCoupleCategories.map((category: any) => (
            <li key={category.label}>
              <button
                className={`filter-btn uppercase transition block px-6 py-1.5 border border-wedding rounded-full text-sm md:text-base hover:bg-wedding hover:text-white [&.active]:bg-wedding [&.active]:text-white ${selectedCategory.coupleCategory === category.label ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory({
                    ...selectedCategory,
                    coupleCategory: category.label,
                  });
                  setClickedCoupleCategory(true);
                  setSelectedCategoryDetails({
                    ...selectedCategoryDetails,
                    image: category.image,
                    label: category.label,
                  });
                  setDescription(category.description);
                }}>
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {uniqCategories && (
        <ul className="flex flex-wrap mb-8 justify-start md:justify-center gap-2 md:gap-x-4 gap-y-4">
          <li>
            <button
              className={`transition block px-6 py-1.5 border border-wedding rounded-full text-base hover:bg-wedding hover:text-white [&.active]:bg-wedding [&.active]:text-white ${selectedCategory.label === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory({
                  ...selectedCategory,
                  label: "all",
                });
                selectedCategory.label !== "all" && setClickedCoupleCategory(false);
                setDescription("");
              }}>
              <DynamicIcon icon="TfiReload" className="!text-inherit" />
            </button>
          </li>
          {renderCategories.map((category: any) => (
            <li key={category.label}>
              <button
                className={`filter-btn uppercase transition block px-6 py-1.5 border border-wedding rounded-full text-sm md:text-base hover:bg-wedding hover:text-white [&.active]:bg-wedding [&.active]:text-white ${selectedCategory.label === category.label ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory({
                    ...selectedCategory,
                    label: category.label,
                  });
                  setClickedCoupleCategory(false);
                  setSelectedCategoryDetails({
                    ...selectedCategoryDetails,
                    image: category.icon,
                    label: category.label,
                  });
                  setDescription(category.description);
                }}>
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {description && (
        <div className="bg-[color-mix(in_srgb,var(--pageColorDark),transparent_90%)] rounded-lg flex-col sm:flex-row flex mb-10">
          {(selectedCategory.coupleCategory !== "all" ||
            selectedCategory.label !== "all") && (
            <div className="sm:flex-[200px] max-sm:w-full min-w-[200px] sm:max-w-[200px] flex-col items-center sm:border-e max-sm:border-b py-4 border-[var(--pageColorDark)] flex justify-start">
              {selectedCategoryDetails.image &&
              selectedCategoryDetails.image.startsWith("/images") ? (
                <img
                  src={selectedCategoryDetails.image}
                  className="rounded-full border-2 border-[var(--pageColorDark)] object-cover mt-0"
                  width={100}
                  height={100}
                  alt={"Category Image"}
                />
              ) : selectedCategoryDetails.image ? (
                <DynamicIcon
                  icon={selectedCategoryDetails.image}
                  className="!text-inherit text-5xl"
                />
              ) : (
                ""
              )}
              {selectedCategoryDetails.label && (
                <div>
                  <h2 className="h6 font-normal text-center mt-4 mb-0">
                    {selectedCategoryDetails.label}
                  </h2>

                  {clickedCoupleCategory && (
                    <div className="mt-2 flex justify-center gap-x-2">
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                      <Star />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {description &&
            (selectedCategory.coupleCategory !== "all" ||
              selectedCategory.label !== "all") && (
              <div className="text-base px-6 py-4">
                {clickedCoupleCategory && (
                  <div className="w-[60px] me-2 float-left h-[50px] relative">
                    <DynamicIcon
                      icon="TfiQuoteRight"
                      className="w-full text-[50px] absolute -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2"
                    />
                  </div>
                )}
                {description}
              </div>
            )}
        </div>
      )}

      <PhotoAlbum
        photos={photos}
        columns={columns}
        layout="masonry"
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <figure>
            <a href={photo.href} style={wrapperStyle} data-no-swup>
              {renderDefaultPhoto({ wrapped: true })}
            </a>
            <figcaption className="text-center text-base mt-2 text-text dark:text-inherit mb-4">
              {photo.title ? photo.title + " • " : ""}
              {photo.date ? photo.date + " • " : ""}
              {photo.category ? photo.category : ""}
            </figcaption>
          </figure>
        )}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={photos}
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
