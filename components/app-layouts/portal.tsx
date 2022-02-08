import { MDXProvider } from "@mdx-js/react";
import { PortalShell } from "components/layout/portal-shell";
import { MdxComponents } from "components/portal";
import { MDXEmbedProvider } from "mdx-embed";
import React from "react";

export const PortalLayout: React.FC = ({ children }) => {
  return (
    <MDXProvider components={MdxComponents}>
      <MDXEmbedProvider>
        <PortalShell>{children}</PortalShell>
      </MDXEmbedProvider>
    </MDXProvider>
  );
};
