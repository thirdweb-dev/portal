import fs from "fs";
import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkSlug from "remark-slug";
import slugify from "slugify";

// GUIDES_PATH is useful when you want to get the path to a specific file
export const GUIDES_PATH = path.join(process.cwd(), "portal/guides");
// guidesFilePaths is the list of all mdx files inside the GUIDES_PATH directory
export const guidesFilePaths = fs
  .readdirSync(GUIDES_PATH)
  // Only include md(x) files
  .filter((pth) => /\.mdx?$/.test(pth));

export const LEARN_PATH = path.join(process.cwd(), "portal/learn");
export const learnFilePaths = fs
  .readdirSync(LEARN_PATH)
  .filter((pth) => /\.mdx?$/.test(pth));

export const LEARN_WEB3_PATH = path.join(process.cwd(), "portal/learn-web3");
export const learnWeb3FilePaths = fs
  .readdirSync(LEARN_WEB3_PATH)
  .filter((pth) => /\.mdx?$/.test(pth));

export const LEARN_THIRDWEB_PATH = path.join(
  process.cwd(),
  "portal/learn-thirdweb",
);
export const learnThirdwebFilePaths = fs
  .readdirSync(LEARN_THIRDWEB_PATH)
  .filter((pth) => /\.mdx?$/.test(pth));

export const CONTRACTS_PATH = path.join(process.cwd(), "portal/contracts");
export const contractsFilePaths = fs
  .readdirSync(CONTRACTS_PATH)
  .filter((pth) => /\.mdx?$/.test(pth));

export const getHeadings = (src: string) => {
  const headingLines = src.split("\n").filter((line) => line.match(/^###*\s/));

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.slice(0, 3) === "###" ? 3 : 2;
    const link = `#${slugify(text, {
      lower: true,
      strict: true,
      remove: /[*+~.`()'"!:@]/g,
    })}`;

    return { text, level, link };
  });
};

export const getMdxSource = async (content: string, data: any) =>
  await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkAutolinkHeadings, remarkSlug, remarkCodeTitles],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

export const getAllGuides = () => {
  return guidesFilePaths
    .map((filePath: string) => {
      const source = fs.readFileSync(path.join(GUIDES_PATH, filePath));
      const { data } = matter(source);

      return {
        slug: filePath.replace(/\.mdx?$/, ""),
        metadata: data,
      };
    })
    .filter((guide: any) => !guide.metadata.draft)
    .sort((a, b) => {
      if (a.metadata.date > b.metadata.date) {
        return -1;
      }
      if (a.metadata.date < b.metadata.date) {
        return 1;
      }
      return 0;
    });
};
