import fs from "fs";
import { NFTStorage } from "nft.storage";

const endpoint = "https://api.nft.storage";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljYjU2M2Q1NWNmMzYzN0Y0ODNFOTliMDQ1NDdENDVGOTM1ODE3RTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM3MzEwMzU5MiwibmFtZSI6IkVwaWNORlQifQ.VPIKDXyVkO5hLVFcyGqGplot0Ponv6BDb9ZQ6zmQQYg";

export default async function uploadJSON(req, res) {
  try {
    const content = JSON.parse(req.body);
    const image = `https://ipfs.io/ipfs/${content.cid}`;
    // const metadata = JSON.stringify({ ...content, image }, null, 2);

    // fs.writeFileSync("./data/metadata.json", metadata);

    const storage = new NFTStorage({ endpoint, token });
    const metadata = await storage.store({ ...content, image });

    console.log("metadata ", metadata);

    res.send(200).json({ message: "success" });
  } catch (error) {
    console.error(error.message);
  }

  // const response = await fetch("https://api.nft.storage/upload", {
  //       method: "POST",
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljYjU2M2Q1NWNmMzYzN0Y0ODNFOTliMDQ1NDdENDVGOTM1ODE3RTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM3MzEwMzU5MiwibmFtZSI6IkVwaWNORlQifQ.VPIKDXyVkO5hLVFcyGqGplot0Ponv6BDb9ZQ6zmQQYg",
  //       },
  //       file: selectedFile,
  //     }).then((res) => res.json());
}
