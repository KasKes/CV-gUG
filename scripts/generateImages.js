const fs = require("fs-extra");
const path = require("path");
const fm = require("front-matter");
const sharp = require("sharp");

const markdownDir = "./src/content/hochzeitsfotos"; // Change this to your markdown directory
const imagesDirs = [
  "images/igotshot/photos/unruly-ghosts/bilder",
  "images/igotshot/photos/festumzug-kulturlieferdienst",
  "images/igotshot/photos/bildwerk-olympia-s-bahn/bilder",
  "images/igotshot/photos/stop-bombing-civilians/bilder",
  "images/igotshot/photos/boomlatters/bilder",
  "images/igotshot/photos/maibaum-gilching/bilder",
  "images/igotshot/photos/mind-the-gap/bilder/art",
  "images/igotshot/photos/mind-the-gap/bilder/matrize",
  "images/igotshot/photos/mind-the-gap/bilder/lentikular",
  "images/igotshot/photos/mind-the-gap/bilder/portrais",
  "images/igotshot/photos/mind-the-gap/bilder/covid",
  "images/igotshot/photos/mind-the-gap/bilder/team",
  "images/igotshot/photos/maibaum-emmering-2024/bilder"
];
const widths = [600];

// Function to read Markdown files and extract image paths from frontmatter
async function extractImagesFromMarkdown(dir) {
  const files = await fs.readdir(dir);
  const imagePaths = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const frontmatter = fm(content);
    if (frontmatter.attributes.image) {
      imagePaths.push(frontmatter.attributes.image);
    }
  }
  return imagePaths;
}

// Function to get all image paths from a directory
async function extractImagesFromDirectory(dir) {
  const files = await fs.readdir(dir);
  return files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => path.join(dir, file));
}

// Function to generate image variants if they don't already exist
async function generateImageVariants(imagePath, widths) {
  const ext = path.extname(imagePath);
  const name = path.basename(imagePath, ext);
  const dir = path.dirname(imagePath);

  // Regex to match filenames ending with -600x0.ext
  const regex600 = /-600x0\.\w+$/;

  // Check if the image name already includes -600x0
  if (regex600.test(imagePath)) {
    // console.log(`Skipped: ${imagePath} (already has -600x0 variant)`);
    return; // If one width variant exists, skip the whole image
  }

  for (const width of widths) {
    const outputName = `${name}-${width}x0${ext}`;
    const outputPath = path.join(dir, outputName);

    if (await fs.pathExists(outputPath)) {
      // console.log(`Skipped: ${outputPath} (already exists)`);
    } else {
      const image = sharp(imagePath);
      await image
        .resize(width, null, { withoutEnlargement: true })
        .toFile(outputPath);
      console.log(`Generated: ${outputPath}`);
    }
  }
}

// Main function to process all Markdown files and generate image variants
(async function () {
  try {
    // Extract image paths from Markdown files
    const markdownImagePaths = await extractImagesFromMarkdown(markdownDir);

    // Extract image paths from specified images directories
    let directoryImagePaths = [];
    for (const imagesDir of imagesDirs) {
      const imagePaths = await extractImagesFromDirectory(path.join("public", imagesDir));
      directoryImagePaths = directoryImagePaths.concat(imagePaths);
    }

    // Combine both sets of image paths
    const allImagePaths = [...markdownImagePaths, ...directoryImagePaths];

    // Generate image variants for all image paths
    for (const imagePath of allImagePaths) {
      const absoluteImagePath = imagePath.startsWith("public") ? imagePath : path.join("public", imagePath);

      // Check if the original image exists
      if (await fs.pathExists(absoluteImagePath)) {
        await generateImageVariants(absoluteImagePath, widths);
      } else {
        console.error(`Original image not found: ${absoluteImagePath}`);
      }
    }

    console.log("Image variants generation completed.");
  } catch (error) {
    console.error("Error:", error);
  }
})();
