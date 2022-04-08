import {
  Box,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useClipboard,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/Image";
import installTabsGradient from "public/assets/portal/install-tabs-gradient.png";
import { FiCheckSquare, FiCopy } from "react-icons/fi";

export const InstallTabs = () => {
  const { onCopy: onCopyJavaScript, hasCopied: hasCopiedJavaScript } =
    useClipboard("npm install @thirdweb-dev/sdk ethers");
  const { onCopy: onCopyReact, hasCopied: hasCopiedReact } = useClipboard(
    "npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers",
  );
  const { onCopy: onCopyPython, hasCopied: hasCopiedPython } = useClipboard(
    "pip install thirdweb-sdk",
  );

  return (
    <Box width="100%">
      <Tabs
        variant="line"
        borderRadius="xl"
        bg="white"
        border="1px solid grey"
        position="relative"
        width="100%"
      >
        <ChakraNextImage
          alt=""
          src={installTabsGradient}
          position="absolute"
          boxSize="100%"
          width={40}
          height={20}
          zIndex={-1}
          bottom={24}
          display={{ base: "none", md: "block" }}
        />
        <TabList borderBottom="1px solid" borderBottomColor="gray.100">
          <Tab fontWeight="600" color="gray.500">
            JavaScript
          </Tab>
          <Tab fontWeight="600" color="gray.500">
            React
          </Tab>
          <Tab fontWeight="600" color="gray.500">
            Python
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel display="flex" justifyContent="space-between">
            <code>npm install @thirdweb-dev/sdk ethers</code>
            <Icon
              boxSize={5}
              cursor="pointer"
              as={hasCopiedJavaScript ? FiCheckSquare : FiCopy}
              onClick={onCopyJavaScript}
            />
          </TabPanel>
          <TabPanel display="flex" justifyContent="space-between">
            <code>
              npm install @thirdweb-dev/react @thirdweb-dev/sdk ethers
            </code>
            <Icon
              boxSize={5}
              cursor="pointer"
              as={hasCopiedReact ? FiCheckSquare : FiCopy}
              onClick={onCopyReact}
            />
          </TabPanel>
          <TabPanel display="flex" justifyContent="space-between">
            <code>pip install thirdweb-sdk</code>
            <Icon
              boxSize={5}
              cursor="pointer"
              as={hasCopiedPython ? FiCheckSquare : FiCopy}
              onClick={onCopyPython}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
