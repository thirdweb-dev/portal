import { MDXProvider } from "@mdx-js/react";
import { BlogShell } from "components/layout/blog-shell";
import { MdxComponents } from "components/portal";
import { MDXEmbedProvider } from "mdx-embed";
import React from "react";

export const BlogLayout: React.FC = ({ children }) => {
  return (
    <MDXProvider components={MdxComponents}>
      <MDXEmbedProvider>
        <BlogShell>{children}</BlogShell>
      </MDXEmbedProvider>
    </MDXProvider>
  );
};
