import matter from "gray-matter";
import mdxPrism from "mdx-prism";
import { serialize } from "next-mdx-remote/serialize";
import remarkAutolinkHeadings from "remark-autolink-headings";
import remarkCodeTitles from "remark-code-titles";
import remarkSlug from "remark-slug";
import slugify from "slugify";

const getHeadings = (src: string) => {
  const headingLines = src.split("\n").filter((line) => line.match(/^###*\s/));

  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "");
    const level = raw.slice(0, 3) === "###" ? 3 : 2;
    const link = `#${slugify(text, { lower: true, strict: true })}`;

    return { text, level, link };
  });
};

const getMdxSource = async (content: string, data: any) =>
  await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkAutolinkHeadings, remarkSlug, remarkCodeTitles],
      rehypePlugins: [mdxPrism],
    },
    scope: data,
  });

function getContentFromGithub() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("/public/portal-content.json");
}

function recursiveEntries(entries: any) {
  const allEntries = entries?.reduce((acc: any, e: any) => {
    if (e.type === "tree") {
      acc.push(...recursiveEntries(e?.object.entries));
    } else {
      acc.push(e);
    }

    return acc;
  }, []);

  return allEntries;
}

export const getContent = async (contentType: "guides" | "learn" | "blog") => {
  const allContent = await getContentFromGithub();

  const specificContent = allContent.find((e: any) => e.name === contentType);

  const allEntries = recursiveEntries(specificContent?.object.entries);

  const slugMap = allEntries?.reduce((acc: any = {}, e: any) => {
    let slug = e.path.replace(e.name, "");
    slug = slug.slice(contentType.length + 1, slug.length - 1);
    const slugAcc = slug in acc ? acc[slug] : { mdx: undefined, assets: [] };
    // handle .mdx files
    if (e.name.endsWith(".mdx")) {
      slugAcc.mdx = e?.object.text;
    } else if (!e.name.endsWith(".mdx")) {
      slugAcc.assets = slugAcc.assets.concat({
        token: `./${e.name}`,
        replace: `https://github.com/nftlabs/portal/raw/main/${e.path}`,
      });
    }
    acc[slug] = slugAcc;
    return acc;
  }, {});
  const guides = Object?.keys(slugMap).map((slug) => {
    return { slug, ...slugMap[slug] };
  });

  return (
    await Promise.all(
      guides
        .filter((g) => !!g.mdx)
        .map(async ({ slug, mdx, assets }: any) => {
          for (const asset of assets) {
            mdx = mdx.replace(new RegExp(asset.token, "g"), asset.replace);
          }
          const thumbnailUrl = assets.find(
            (a: any) => a.token.indexOf("thumbnail") > -1,
          )?.replace;
          const { data, content } = matter(mdx);

          return {
            slug,
            mdxContent: await getMdxSource(content, data),
            headings: getHeadings(content),
            metadata: {
              ...data,
              image: thumbnailUrl || null,
            } as {
              [key: string]: any;
            },
          };
        }),
    )
  )
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

export async function getAllGuides() {
  return await getContent("guides");
}

export async function getAllLearn() {
  return await getContent("learn");
}

export async function getAllBlogs() {
  return await getContent("blog");
}

export async function getAllGuidePaths() {
  const guides = await getAllGuides();
  return guides.map((guide) => guide.slug as string);
}

export async function getAllLearnPaths() {
  const learns = await getAllLearn();
  return learns.map((learn) => learn.slug as string);
}

export async function getAllBlogPaths() {
  const blogs = await getAllBlogs();
  return blogs.map((blog) => blog.slug as string);
}
