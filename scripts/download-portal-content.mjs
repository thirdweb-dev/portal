import fs from "fs";
import fetch from "isomorphic-fetch";
import path from "path";
import pkg from "@next/env";

const { loadEnvConfig } = pkg;

const query = `
query {
  repository(owner: "nftlabs", name: "portal") {
    object(expression: "HEAD:") {
      ... on Tree {
        entries {
          name
          type
          object {
            ... on Tree {
              entries {
                name
                type
                path
                object {
                  ... on Tree {
                    entries {
                      name
                      type
                      path
                      object {
                        ... on Tree {
                          entries {
                            name
                            type
                            path
                            object {
                              ... on Blob {
                                byteSize
                                text
                              }
                            }
                          }
                        }
                        ... on Blob {
                          byteSize
                          text
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}  
`;

loadEnvConfig(process.cwd());

const portalContentPath = path.join(
  process.cwd(),
  "public/portal-content.json",
);

async function downloadAndSave() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  const data = (await response.json()).data?.repository?.object.entries || [];

  fs.rmSync(portalContentPath, { force: true });

  fs.writeFileSync(portalContentPath, JSON.stringify(data, null, 2));
}

await downloadAndSave();
