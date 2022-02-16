import { MDXProvider } from "@mdx-js/react";
import { PortalShell } from "components/layout/portal-shell";
import { MdxComponents } from "components/portal";
import React from "react";

export const PortalLayout: React.FC = ({ children }) => {
  return (
    <MDXProvider components={MdxComponents}>
      <PortalShell>{children}</PortalShell>
    </MDXProvider>
  );
};
