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

const Filter = ({ photos, uniqCategories, uniqCoupleCategories }: any) => {
  const structuredPhotos: any = [];
  const [description, setDescription] = useState("");
  const [index, setIndex] = useState(-1);
  const [columns, setColumns] = React.useState(4);
  const [clickedCoupleCategory, setClickedCoupleCategory] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [resultsByCoupleCategory, setResultsByCoupleCategory] =
    useState(photos);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "all",
    coupleCategory: "all",
  });
  const [selectedCategoryDetails, setSelectedCategoryDetails] = useState({
    image: "",
    label: "",
  });

  // Initially show unfiltered photos
  useEffect(() => {
    setFilteredResults(photos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterPhotos = () => {
    let filteredData = photos;

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

    let filteredByOnlyCoupleCategory = photos.filter(
      (project: any) =>
        project.data.couple_category === selectedCategory.coupleCategory
    );
    setResultsByCoupleCategory(filteredByOnlyCoupleCategory);

    setFilteredResults(filteredData);
  };

  // filter photos by category
  useEffect(() => {
    filterPhotos();
  }, [selectedCategory]);

  useEffect(() => {
    if (
      selectedCategory.coupleCategory !== "all" ||
      resultsByCoupleCategory.length !== photos.length
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
    !(
      project.data.image.includes("600x0") ||
      project.data.image.includes("800x0")
    ) &&
      structuredPhotos.push({
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
              className={`transition block px-6 py-1.5 border border-wedding rounded-full text-base text-wedding hover:bg-wedding hover:text-bgweiss dark:hover:text-bgdark [&.active]:bg-wedding bg-bgweiss dark:hover:bg-wedding dark:bg-bgdark [&.active]:text-bgweiss dark:[&.active]:text-bgdark ${selectedCategory.coupleCategory === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory({
                  ...selectedCategory,
                  coupleCategory: "all",
                });
                selectedCategory.coupleCategory === "all"
                  ? setClickedCoupleCategory(false)
                  : setClickedCoupleCategory(true);
                setSelectedCategoryDetails({
                  ...selectedCategoryDetails,
                  image: "",
                });
                setDescription("");
              }}
              aria-label="sort by all categories"
            >
              <DynamicIcon icon="TfiReload" className="!text-inherit" />
            </button>
          </li>
          {uniqCoupleCategories.map((category: any) => (
            <li key={category.label}>
              <button
                className={`filter-btn uppercase transition block px-6 py-1.5 border border-wedding rounded-full text-sm md:text-base text-wedding hover:bg-wedding dark:hover:text-bgdark hover:text-bgweiss [&.active]:bg-wedding bg-bgweiss dark:hover:bg-wedding dark:bg-bgdark [&.active]:text-bgweiss dark:[&.active]:text-bgdark ${selectedCategory.coupleCategory === category.label ? "active" : ""}`}
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
                }}
              >
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
              className={`transition block px-6 py-1.5 border border-wedding rounded-full text-base bg-bgweiss dark:bg-bgdark text-wedding hover:bg-wedding hover:text-bgweiss dark:hover:text-bgdark [&.active]:bg-wedding [&.active]:text-bgweiss dark:[&.active]:text-bgdark ${selectedCategory.label === "all" ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory({
                  ...selectedCategory,
                  label: "all",
                });
                selectedCategory.label !== "all" &&
                  setClickedCoupleCategory(false);
                setDescription("");
              }}
              aria-label="sort by all categories"
            >
              <DynamicIcon icon="TfiReload" className="!text-inherit" />
            </button>
          </li>
          {renderCategories.map((category: any) => (
            <li key={category.label}>
              <button
                className={`filter-btn uppercase transition block px-6 py-1.5 border border-wedding rounded-full text-sm md:text-base text-wedding hover:bg-wedding hover:text-bgweiss dark:hover:text-bgdark [&.active]:bg-wedding bg-bgweiss dark:hover:bg-wedding dark:bg-bgdark [&.active]:text-bgweiss dark:[&.active]:text-bgdark ${selectedCategory.label === category.label ? "active" : ""}`}
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
                }}
              >
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

      <div className="col-12 relative">
        <svg
          className="absolute -left-32 -top-20 -z-10"
          viewBox="0 0 240 540"
          width="480px"
          height="120px"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="0.35"
            d=" M781.146362,270.165619 C827.131348,201.295181 872.913208,132.722214 918.693909,64.148491 C922.392761,58.608013 926.215515,53.144051 929.726379,47.486713 C931.595886,44.474239 933.919312,42.988605 937.463013,43.125965 C942.952393,43.338737 948.447815,43.479458 953.940796,43.484627 C956.573303,43.487106 957.465027,44.678940 957.412720,47.141964 C957.331482,50.972198 957.388428,54.805389 957.388428,58.637325 C957.388184,134.443878 957.388184,210.250443 957.387939,286.057007 C957.387878,292.893555 957.387085,292.895294 964.302734,292.898132 C978.297791,292.903870 992.294067,293.011993 1006.287170,292.850403 C1010.649841,292.800018 1012.796936,293.990570 1012.402466,298.800507 C1012.036011,303.269226 1012.127380,307.801117 1012.368347,312.286346 C1012.580139,316.229156 1011.028564,317.508209 1007.150879,317.463043 C993.157715,317.299988 979.161499,317.409851 965.166443,317.401001 C957.400330,317.396118 957.394104,317.382111 957.392822,324.922821 C957.387085,358.744080 957.303894,392.565735 957.481506,426.386047 C957.504517,430.775665 956.304504,432.371277 951.890442,432.122772 C946.575989,431.823608 941.217346,431.814087 935.904419,432.128998 C931.100525,432.413696 929.594727,430.626495 929.619690,425.822876 C929.794678,392.168976 929.718079,358.513763 929.722900,324.858978 C929.723999,317.431671 929.725647,317.426666 922.462708,317.425598 C871.480713,317.418243 820.498718,317.416351 769.516724,317.403229 C762.679504,317.401459 763.122681,317.339111 762.546509,310.555450 C761.801697,301.784454 763.988892,294.341797 769.492676,287.439819 C773.734741,282.120026 777.156433,276.145996 781.146362,270.165619 M811.673462,269.122772 C806.573120,276.617310 801.472839,284.111816 796.421997,291.533569 C798.538208,293.374786 800.275879,292.886597 801.874573,292.887665 C842.203125,292.914154 882.531677,292.911133 922.860229,292.901825 C929.692688,292.900269 929.633179,292.875275 929.715820,285.974945 C930.507690,219.845016 927.886230,153.683014 931.541382,87.577820 C931.602417,86.475159 932.231079,84.943077 930.364075,83.982735 C929.428772,85.624619 928.490967,87.168701 927.649475,88.763588 C917.700195,107.620598 908.343262,126.849609 896.426514,144.558578 C868.522888,186.025040 840.233704,227.232025 811.673462,269.122772 M111.617149,338.682343 C114.929436,314.195435 117.227394,290.033752 119.794075,265.900909 C122.237770,242.924393 124.890221,219.969803 127.521606,197.013672 C128.207962,191.025879 127.727539,190.316849 121.740128,190.315384 C106.075165,190.311539 90.408958,190.224792 74.746040,190.408356 C70.448326,190.458710 68.382088,189.511658 68.585541,184.617661 C69.236229,168.965271 65.845062,172.494324 81.932014,170.900558 C96.351204,169.472031 110.868797,169.326141 125.362320,169.726410 C129.136566,169.830658 130.413086,168.641525 130.844681,164.701340 C133.521622,140.262726 135.191422,115.631454 142.802231,92.005867 C147.537231,77.307388 153.729752,63.365055 164.396423,51.844101 C180.698135,34.236790 201.391342,29.187746 224.403656,31.064743 C235.773254,31.992102 246.670914,34.847923 257.069153,39.679394 C260.721741,41.376541 261.836578,43.243160 259.697723,46.934387 C258.119934,49.657368 256.836639,52.603317 255.816910,55.584934 C254.329376,59.934448 252.546097,61.119648 247.860001,58.765259 C235.468689,52.539631 221.987961,51.037949 208.417755,52.737358 C190.887939,54.932629 179.369461,65.748360 171.402649,80.867973 C162.624100,97.528107 159.313934,115.646965 157.344299,134.106064 C156.111664,145.658203 154.967926,157.219833 153.805893,168.566330 C155.709152,170.248947 157.628647,169.634995 159.377396,169.638870 C182.874756,169.690948 206.373520,169.814545 229.868668,169.585449 C234.873413,169.536667 236.499298,170.934601 236.419113,176.047775 C236.195511,190.307800 236.413010,190.307053 222.281921,190.304886 C200.784256,190.301590 179.284256,190.473282 157.790680,190.176956 C152.918610,190.109772 150.948929,191.550613 150.489487,196.316208 C148.877930,213.032028 147.073624,229.729736 145.265350,246.425980 C143.421204,263.453400 141.401245,280.462067 139.614639,297.495392 C137.828384,314.525513 136.560593,331.624664 133.292252,348.459442 C130.174484,364.518646 125.714874,380.143799 118.000206,394.734436 C99.495232,429.732513 62.531769,438.694702 30.436714,429.799927 C25.639469,428.470398 21.049446,426.401489 16.343767,424.730347 C13.300860,423.649689 12.075261,421.979279 13.529104,418.673737 C15.135653,415.020996 16.477848,411.240265 17.733896,407.448639 C18.764868,404.336517 20.406853,403.903717 23.401680,405.027557 C31.037186,407.892700 38.786041,410.254486 47.019039,411.087616 C68.453651,413.256561 86.497787,403.829315 96.932510,385.023376 C104.150093,372.015442 108.031708,357.992188 110.693336,343.519623 C110.964088,342.047424 111.281250,340.583771 111.617149,338.682343 M519.282593,431.212830 C516.945129,430.618042 516.856812,429.084045 516.817993,427.557648 C516.775635,425.892670 516.787842,424.226166 516.787659,422.560333 C516.774109,308.776520 516.761719,194.992676 516.749207,81.208847 C516.748962,79.237236 516.749146,77.265617 516.749146,73.510498 C494.878479,86.473236 474.135040,98.767868 452.810333,111.406998 C449.505310,104.248650 447.749756,97.221992 445.953278,90.249641 C445.328583,87.825073 447.925629,87.044235 449.570801,86.047264 C468.373779,74.652855 487.197083,63.291958 506.015320,51.922726 C506.157837,51.836628 506.328613,51.783539 506.446899,51.673008 C516.282288,42.483162 528.517456,43.072586 540.664734,43.226982 C543.839478,43.267334 545.132874,44.759277 545.053528,47.870537 C544.947388,52.032799 545.012024,56.199543 545.012085,60.364365 C545.013794,181.478256 545.016174,302.592133 545.020386,423.706024 C545.020630,431.353973 545.028015,431.368164 537.242493,431.362610 C531.412354,431.358429 525.582153,431.311676 519.282593,431.212830 M242.661743,465.316650 C235.913239,465.321564 229.624023,465.321564 222.749847,465.321564 C223.519211,458.833344 226.253693,453.821411 228.189850,448.637085 C252.009781,384.856323 275.954407,321.122131 299.877106,257.379761 C329.998444,177.121155 360.158875,96.877174 390.175659,16.579504 C391.812592,12.200499 393.894897,10.162942 398.801636,10.561270 C404.519012,11.025407 410.302948,10.669605 415.759064,10.669605 C416.730316,13.498502 415.539795,15.101440 414.918518,16.756477 C363.437714,153.897354 311.924286,291.025970 260.421082,428.158447 C256.324249,439.066620 252.271469,449.991425 248.223907,460.917999 C247.322128,463.352386 246.414047,465.693939 242.661743,465.316650 M703.535522,385.279419 C725.807007,383.503113 733.866943,406.104248 728.371033,422.115601 C723.499939,436.306976 707.867615,442.488983 694.714539,435.276306 C685.316345,430.122711 680.634949,418.477753 682.857971,405.783142 C684.846130,394.430054 692.069519,387.152374 703.535522,385.279419 z"
          ></path>
        </svg>
      </div>
      <div className="relative">
        <PhotoAlbum
          photos={structuredPhotos}
          columns={columns}
          layout="masonry"
          renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }: any) => {
            const name = photo.src.split(photo.src.match(/.\w+$/))[0];
            const ext = photo.src.split(name)[1];
            const mobile = name + "-600x0" + ext;

            return (
              <figure>
                <button style={wrapperStyle} data-no-swup>
                  <span className="sr-only">show image in lightbox</span>
                  <picture>
                    <source srcSet={mobile} media="(max-width: 1920px)" />
                    {renderDefaultPhoto({ wrapped: true })}
                  </picture>
                </button>
                <figcaption className="text-center text-base mt-2 text-text dark:text-inherit mb-4">
                  {photo.title ? photo.title + " • " : ""}
                  {photo.date ? photo.date + " • " : ""}
                  {photo.category ? photo.category : ""}
                </figcaption>
              </figure>
            );
          }}
          onClick={({ index }) => setIndex(index)}
        />
        <svg
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute -z-10 opacity-80"
          viewBox="0 0 440 540"
          width="380px"
          height="130px"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            fillOpacity="0.35"
            d="M876.380798,47.171082 C896.360962,41.447315 916.184509,40.478226 935.916992,45.677204 C971.923340,55.163895 993.531311,78.951279 1000.100159,115.160065 C1007.413330,155.471298 992.256714,187.493103 960.272400,212.130142 C953.827515,217.094452 946.697998,221.037323 939.714905,225.167953 C940.740417,227.993866 943.149536,228.284653 944.955933,229.225266 C964.854370,239.586960 982.761047,252.440170 995.831848,271.006439 C1031.361938,321.474670 1014.215027,392.590363 959.580078,421.947205 C918.569824,443.983093 866.075317,439.583252 830.301453,410.516357 C810.145874,394.139557 798.046143,372.598633 795.865845,346.717224 C792.279053,304.137939 809.021729,270.247925 842.631836,244.346542 C849.912903,238.735504 857.734131,233.992950 865.745728,229.527115 C867.269836,228.677521 869.281616,228.385239 870.195801,225.916046 C866.132080,223.508392 861.956299,221.187134 857.933350,218.625809 C833.221741,202.892334 815.691162,181.688751 810.929321,152.200607 C803.276794,104.811462 830.190308,62.080822 876.380798,47.171082 M831.374023,367.130341 C835.944824,377.522888 842.478882,386.447876 851.238770,393.709869 C863.979797,404.272247 878.790466,409.481689 895.125793,411.083923 C913.828796,412.918365 931.800415,410.413330 948.331726,401.367065 C973.056641,387.837097 984.373291,365.958252 985.930237,338.390991 C987.599915,308.827423 978.298706,284.001190 954.539185,265.408020 C938.735779,253.040970 920.650635,245.002258 902.080261,237.882980 C899.967529,237.073044 898.206787,237.651764 896.314087,238.364532 C883.752625,243.095123 872.161804,249.523911 861.517395,257.732330 C827.571289,283.909698 815.375305,327.404968 831.374023,367.130341 M839.570679,119.059067 C839.462036,119.883896 839.358093,120.709358 839.244141,121.533455 C835.106506,151.464706 843.456055,176.456879 868.335388,194.859756 C878.447815,202.339752 889.838013,207.354507 901.302795,212.384232 C909.052124,215.783936 915.420227,215.235245 922.785034,211.115570 C954.921204,193.139587 975.815979,168.352127 973.591675,129.320312 C972.527588,110.647804 966.723694,93.733124 952.125366,80.935677 C937.501160,68.115547 919.924316,65.133995 901.273743,66.044746 C869.416504,67.600426 846.536560,87.062599 839.570679,119.059067 M490.004669,404.677795 C539.331604,404.678894 588.159546,404.678040 636.987549,404.683502 C643.848083,404.684296 643.869507,404.698486 643.913635,411.619781 C643.942383,416.118683 643.899719,420.618103 643.884705,425.117279 C643.875122,427.991394 642.521729,429.427246 639.557678,429.233521 C638.396606,429.157684 637.225586,429.240967 636.059082,429.240875 C571.399536,429.237396 506.739990,429.233398 442.080444,429.227325 C434.758026,429.226654 435.232330,429.181519 434.608948,421.683746 C434.004822,414.417114 436.731567,409.254120 441.330933,403.859894 C470.204865,369.995636 502.033691,338.798340 530.621765,304.693146 C553.028931,277.961700 574.210571,250.392960 589.196167,218.567322 C599.934143,195.762405 606.040710,171.944626 605.574585,146.690536 C605.337402,133.841537 603.478027,121.133835 598.791443,109.034851 C589.479004,84.993477 571.479187,72.020126 546.374695,68.312111 C514.869690,63.658722 487.603394,73.569122 463.070435,92.753120 C461.531586,93.956451 460.247650,95.605621 457.289490,95.981506 C454.180145,90.479828 450.763214,84.824623 447.768036,78.954247 C446.453094,76.377098 449.210693,75.140236 450.749878,73.831894 C469.328003,58.039658 490.620575,47.697903 514.704468,44.047840 C535.488098,40.897942 556.260986,41.437538 576.141113,49.517612 C606.123779,61.703732 622.867920,85.024704 630.208008,115.605751 C639.262878,153.330765 631.367615,188.909531 615.123352,223.163849 C600.660645,253.661453 580.581970,280.440857 559.360291,306.423096 C533.213379,338.435364 503.951416,367.707764 477.440247,399.401855 C476.286072,400.781738 474.730194,401.893188 474.239807,404.201447 C479.345398,405.251465 484.457367,404.400513 490.004669,404.677795 M65.412415,427.673096 C45.800762,432.683380 27.394623,429.900940 9.481988,422.044647 C6.754190,420.848267 5.400402,419.596649 6.829981,416.429962 C8.471614,412.793579 9.856754,409.023468 11.088890,405.225677 C12.108032,402.084320 13.724787,401.615967 16.720572,402.744507 C25.457787,406.035950 34.310291,408.683960 43.838596,408.886475 C64.887489,409.333954 79.721741,399.788086 89.599564,381.609650 C97.521149,367.031342 101.478157,351.186310 103.514618,334.983093 C107.598076,302.492798 110.977310,269.913483 114.577110,237.363129 C116.039223,224.142258 117.245308,210.892975 118.723915,197.674088 C119.186836,193.535507 117.800537,192.083435 113.567947,192.134369 C98.071167,192.320877 82.568489,192.056915 67.073036,192.291992 C62.251595,192.365143 60.699207,190.719788 60.762035,185.947678 C60.920921,173.878769 60.729183,173.783554 72.910049,172.929535 C87.035065,171.939224 101.181564,171.214355 115.344513,171.737808 C119.463348,171.890060 121.678345,171.097900 122.123672,166.305008 C123.352921,153.075089 124.650520,139.819092 126.775574,126.711945 C130.578568,103.255524 136.028992,80.239342 150.973648,60.863411 C163.675583,44.395191 180.581863,36.251366 201.394821,35.594662 C216.666214,35.112804 231.184418,37.722546 245.171860,43.839657 C249.219696,45.609901 250.524368,47.652718 248.176208,51.742004 C245.798538,55.882694 244.675156,60.684135 241.966736,64.527176 C239.662872,64.746147 238.251251,63.373318 236.623108,62.646450 C222.958618,56.546131 208.621643,55.002903 194.119141,57.816120 C179.768280,60.599922 170.088394,70.072868 163.049408,82.496857 C153.993759,98.480316 150.442093,116.040848 148.363861,133.996353 C147.120895,144.735550 146.542801,155.566940 144.890869,166.236908 C144.103836,171.320328 145.909714,171.754364 150.003540,171.733429 C172.834869,171.616623 195.667130,171.677475 218.499069,171.689911 C225.305878,171.693619 225.305862,171.711792 225.329575,178.677246 C225.375671,192.216904 225.375687,192.207825 211.999832,192.195831 C190.667816,192.176712 169.334045,192.314880 148.005142,192.051422 C143.108673,191.990921 141.760864,193.996964 141.304611,198.355835 C138.465897,225.476044 135.401443,252.572510 132.508560,279.687195 C130.268570,300.682190 128.824112,321.784027 125.250198,342.604645 C121.395027,365.063843 115.600594,386.937256 100.979515,405.254333 C91.853661,416.687134 80.205551,424.331116 65.412415,427.673096 M299.774231,225.887177 C315.564606,183.748810 331.237610,141.981308 346.919098,100.216972 C356.983276,73.413094 367.096497,46.627506 377.078491,19.793068 C378.164246,16.874224 379.635254,15.520712 382.867493,15.625845 C389.130951,15.829572 395.405762,15.685405 401.485687,15.685405 C402.281097,18.609955 401.131805,20.366316 400.446991,22.192852 C357.262756,137.377747 314.067322,252.558441 270.867218,367.737396 C259.759949,397.351318 248.534454,426.921631 237.624832,456.608124 C235.996613,461.038696 233.698486,462.622589 229.195450,462.238068 C223.654984,461.764954 218.013474,462.699249 211.538757,461.500305 C241.086716,382.621979 270.373566,304.440674 299.774231,225.887177 M749.865845,409.919739 C749.200317,418.580933 747.078064,426.257660 739.794739,431.116333 C731.239319,436.823639 722.179260,437.148163 713.581787,431.339111 C705.048340,425.573303 702.111938,416.762817 703.097534,406.944458 C704.373657,394.231354 711.252014,385.857147 721.047852,383.777954 C735.149719,380.784821 747.416687,389.580780 749.291809,404.043121 C749.526855,405.855591 749.687988,407.677673 749.865845,409.919739 z"
          ></path>
        </svg>
      </div>
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
