import { useBundleDropBatchMint, useDropBatchMint } from "@3rdweb-sdk/react";
import { BundleDropModule, DropModule } from "@3rdweb/sdk";
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  Center,
  Code,
  Container,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  ImageProps,
  Link,
  ListItem,
  Portal,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { Logo } from "components/logo";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import Papa from "papaparse";
import { useCallback, useMemo, useRef, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateBefore,
  MdNavigateNext,
} from "react-icons/md";
import { Column, usePagination, useTable } from "react-table";

interface BulkUploadProps {
  module?: DropModule | BundleDropModule;
  isOpen: boolean;
  onClose: () => void;
}

function removeEmptyKeysFromObject(obj: any) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}

interface CSVData extends Record<string, string | undefined> {
  name: string;
  description?: string;
  external_url?: string;
  background_color?: string;
  youtube_url?: string;
}

const FileImage: React.FC<ImageProps> = ({ src, ...props }) => {
  const img = useImageFileOrUrl(src);
  return <Image {...props} src={img} />;
};

const FileVideo: React.FC<
  BoxProps & Omit<React.ComponentProps<"video">, "ref">
> = ({ src, ...props }) => {
  const video = useImageFileOrUrl(src);
  return <Box as="video" {...props} src={video} />;
};

export const BulkUpload: React.FC<BulkUploadProps> = ({
  module,
  isOpen,
  onClose,
}) => {
  const [csvData, setCSVData] = useState<Papa.ParseResult<CSVData>>();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [noCsv, setNoCsv] = useState(false);

  const mintBatch =
    module instanceof DropModule
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        useDropBatchMint(module)
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useBundleDropBatchMint(module);

  const reset = useCallback(() => {
    setCSVData(undefined);
    setImageFiles([]);
    setVideoFiles([]);
    setNoCsv(false);
  }, []);

  const _onClose = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onDrop = useCallback<Required<DropzoneOptions>["onDrop"]>(
    (acceptedFiles) => {
      setNoCsv(false);

      const csvMimeTypes = [
        "text/csv",
        "text/plain",
        "text/x-csv",
        "application/vnd.ms-excel",
        "application/csv",
        "application/x-csv",
        "text/comma-separated-values",
        "text/x-comma-separated-values",
        "text/tab-separated-values",
      ];

      const csv = acceptedFiles.find(
        (f) => csvMimeTypes.includes(f.type) || f.name.endsWith(".csv"),
      );
      const images = acceptedFiles
        .filter((f) => f.type.includes("image/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      const videos = acceptedFiles
        .filter((f) => f.type.includes("video/"))
        // sort in ascending order
        .sort((a, b) => parseInt(a.name) - parseInt(b.name));
      if (!csv) {
        console.error("No CSV file found");
        setNoCsv(true);
        return;
      }

      Papa.parse<CSVData>(csv, {
        header: true,
        complete: (results) => {
          const validResults: Papa.ParseResult<CSVData> = {
            ...results,
            data: [],
          };
          for (let i = 0; i < results.data.length; i++) {
            if (!results.errors.find((e) => e.row === i)) {
              validResults.data.push(results.data[i]);
            }
          }
          setCSVData(validResults);
        },
      });

      setImageFiles(images);
      setVideoFiles(videos);
    },
    [],
  );

  const mergedData = useMemo(() => {
    if (!csvData?.data) {
      return [];
    }

    return csvData.data.map((row, index) => {
      const {
        name,
        description,
        image,
        animation_url,
        external_url,
        background_color,
        youtube_url,
        ...properties
      } = row;

      return removeEmptyKeysFromObject({
        name,
        description,
        external_url,
        background_color,
        youtube_url,
        properties: removeEmptyKeysFromObject(properties),
        image: imageFiles[index] || image || undefined,
        animation_url: videoFiles[index] || animation_url || undefined,
      });
    });
  }, [csvData, imageFiles, videoFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const paginationPortalRef = useRef<HTMLDivElement>(null);
  return (
    <Drawer
      allowPinchZoom
      preserveScrollBarGap
      size="full"
      onClose={_onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Flex direction="column" gap={6} h="100%">
          <Flex shadow="sm">
            <Container maxW="container.page">
              <Flex align="center" justify="space-between" p={4}>
                <Flex gap={2}>
                  <Logo hideWordmark />
                  <Heading size="title.md">Bulk Create</Heading>
                </Flex>
                <DrawerCloseButton position="relative" right={0} top={0} />
              </Flex>
            </Container>
          </Flex>

          {csvData ? (
            <BulkTable
              portalRef={paginationPortalRef}
              data={mergedData}
              fields={csvData?.meta.fields || []}
            />
          ) : (
            <Flex flexGrow={1} align="center" overflow="auto">
              <Container maxW="container.page">
                <Flex gap={8} flexDir="column">
                  <AspectRatio ratio={21 / 9} w="100%">
                    <Center
                      borderRadius="md"
                      {...getRootProps()}
                      cursor="pointer"
                      bg={
                        noCsv
                          ? "red.200"
                          : isDragActive
                          ? "gray.400"
                          : "gray.100"
                      }
                    >
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <Heading as={Text} size="label.md">
                          Drop the files here
                        </Heading>
                      ) : (
                        <Heading as={Text} size="label.md">
                          {noCsv
                            ? "No CSV file found, please try again"
                            : "Drag & Drop files or folders here, or click to select files"}
                        </Heading>
                      )}
                    </Center>
                  </AspectRatio>
                  <Flex gap={2} flexDir="column">
                    <Heading size="subtitle.sm">Requirements</Heading>
                    <UnorderedList>
                      <ListItem>
                        Files <em>must</em> contain one .csv file with metadata.{" "}
                        -{" "}
                        <Link download color="blue.500" href="/example.csv">
                          Download example.csv
                        </Link>
                      </ListItem>
                      <ListItem>
                        Assets <em>must</em> be named 0,1,2,3...n.[extension]
                        (Example: <Code>0.png</Code>, <Code>1.png</Code>)
                      </ListItem>
                      <ListItem>
                        Images and videos can be used in combination.
                        <br />
                        <small>
                          They both have to follow the asset naming convention
                          above. (Example: <Code>0.png</Code> and{" "}
                          <Code>0.mp4</Code>)
                        </small>
                      </ListItem>
                    </UnorderedList>
                  </Flex>
                </Flex>
              </Container>
            </Flex>
          )}

          <Flex boxShadow="rgba(0,0,0,.1) 0px -2px 4px 0px">
            <Container maxW="container.page">
              <Flex align="center" justify="space-between" p={4}>
                <Box ref={paginationPortalRef} />
                <Flex gap={2} align="center">
                  <Button
                    size="md"
                    isDisabled={mintBatch.isLoading}
                    colorScheme="gray"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    isLoading={mintBatch.isLoading}
                    size="lg"
                    isDisabled={!mergedData.length}
                    colorScheme="blue"
                    onClick={() => {
                      mintBatch.mutate(mergedData, { onSuccess: _onClose });
                    }}
                  >
                    Bulk Create {mergedData.length} drops
                  </Button>
                </Flex>
              </Flex>
            </Container>
          </Flex>
        </Flex>
      </DrawerContent>
    </Drawer>
  );
};

interface DropData {
  name: string;
  description: string | undefined;
  external_url: string | undefined;
  background_color: string | undefined;
  youtube_url: string | undefined;
  properties: {
    [x: string]: string | undefined;
  };
  image: File;
  animation_url: File;
}
interface BulkTableProps {
  fields: string[];
  data: DropData[];
  portalRef: React.RefObject<HTMLDivElement>;
}

const BulkTable: React.FC<BulkTableProps> = ({ data, portalRef }) => {
  const columns = useMemo(() => {
    return [
      {
        Header: "Token ID",
        accessor: (_row, index) => index,
      },
      {
        Header: "Image",
        accessor: (row) => row.image,
        Cell: ({ cell: { value } }: { cell: { value?: string } }) =>
          typeof value === "string" && value.startsWith("ipfs://") ? (
            <FileImage
              flexShrink={0}
              boxSize={24}
              objectFit="contain"
              src={value.replace("ipfs://", "https://ipfs.thirdweb.com/ipfs/")}
              alt=""
            />
          ) : value ? (
            <FileImage
              flexShrink={0}
              boxSize={24}
              objectFit="contain"
              src={value}
              alt=""
            />
          ) : null,
      },
      {
        Header: "Animation Url",
        accessor: (row) => row.animation_url,
        Cell: ({ cell: { value } }: { cell: { value?: string } }) =>
          typeof value === "string" && value.startsWith("ipfs://") ? (
            <FileVideo
              flexShrink={0}
              boxSize={24}
              objectFit="contain"
              src={value.replace("ipfs://", "https://ipfs.thirdweb.com/ipfs/")}
              autoPlay
              playsInline
              muted
              loop
            />
          ) : value ? (
            <FileVideo
              flexShrink={0}
              boxSize={24}
              objectFit="contain"
              src={value}
              autoPlay
              playsInline
              muted
              loop
            />
          ) : null,
      },
      { Header: "Name", accessor: (row) => row.name },
      {
        Header: "Description",
        accessor: (row) => row.description,
      },
      {
        Header: "Properties",
        accessor: (row) => row.properties,
        Cell: ({ cell }: { cell: any }) => (
          <Code whiteSpace="pre">{JSON.stringify(cell.value, null, 2)}</Code>
        ),
      },
      { Header: "External URL", accessor: (row) => row.external_url },
      { Header: "Background Color", accessor: (row) => row.background_color },
    ] as Column<DropData>[];
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Instead of using 'rows', we'll use page,
    page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 50,
        pageIndex: 0,
      },
    },
    usePagination,
  );

  // Render the UI for your table
  return (
    <Flex flexGrow={1} overflow="auto">
      <Box w="100%">
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              // eslint-disable-next-line react/jsx-key
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // eslint-disable-next-line react/jsx-key
                  <Th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                // eslint-disable-next-line react/jsx-key
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      // eslint-disable-next-line react/jsx-key
                      <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Portal containerRef={portalRef}>
        <Center w="100%">
          <HStack>
            <IconButton
              isDisabled={!canPreviousPage}
              aria-label="first page"
              icon={<Icon as={MdFirstPage} />}
              onClick={() => gotoPage(0)}
            />
            <IconButton
              isDisabled={!canPreviousPage}
              aria-label="previous page"
              icon={<Icon as={MdNavigateBefore} />}
              onClick={() => previousPage()}
            />
            <Text whiteSpace="nowrap">
              Page <strong>{pageIndex + 1}</strong> of{" "}
              <strong>{pageOptions.length}</strong>
            </Text>
            <IconButton
              isDisabled={!canNextPage}
              aria-label="next page"
              icon={<Icon as={MdNavigateNext} />}
              onClick={() => nextPage()}
            />
            <IconButton
              isDisabled={!canNextPage}
              aria-label="last page"
              icon={<Icon as={MdLastPage} />}
              onClick={() => gotoPage(pageCount - 1)}
            />

            <Select
              onChange={(e) => {
                setPageSize(parseInt(e.target.value as string, 10));
              }}
              value={pageSize}
            >
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
            </Select>
          </HStack>
        </Center>
      </Portal>
    </Flex>
  );
};
