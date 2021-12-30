import { useState, useEffect } from "react";
import { NFTStorage } from "nft.storage";
import {
  Heading,
  Center,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Container,
  Textarea,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import { mintNFT, setupEventListener } from "../utils/mintContract";
import { useRouter } from "next/router";

const token = process.env.NEXT_PUBLIC_IPFS_TOKEN;

const storage = new NFTStorage({ token });

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setupEventListener();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleMintComplete = (signer, tokenId, nftUrl) => {
    console.log("completed");
    setIsLoading(false);
    setMessage(nftUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const metadata = await storage.store({
        name: formValues.name,
        description: formValues.description,
        image: selectedFile,
      });
      setupEventListener(handleMintComplete);
      mintNFT(metadata.url);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {message && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Your NFT is mined!</AlertTitle>
          <AlertDescription>
            You can now view your NFT at{" "}
            <Link href={message} isExternal>
              {message}
            </Link>
          </AlertDescription>
          <CloseButton
            onClick={() => router.push("/")}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      <Stack margin="50px 0">
        <Center>
          <Heading as="h1">Upload here</Heading>
        </Center>
      </Stack>
      <section>
        <Container maxW="container.md">
          <form onSubmit={handleSubmit}>
            <FormControl margin="15px 0">
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                name="name"
                type="name"
                onChange={handleChange}
                value={formValues.name}
              />
            </FormControl>

            <FormControl margin="15px 0">
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                name="description"
                value={formValues.description}
                size="sm"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl margin="15px 0">
              <Input
                name="imageFile"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </FormControl>

            <Button colorScheme="teal" type="submit" isLoading={isLoading}>
              Upload
            </Button>
          </form>
        </Container>
      </section>
    </>
  );
};

export default UploadPage;
