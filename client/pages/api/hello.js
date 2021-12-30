import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    // console.log(err, fields, files);
    console.log(files);

    // const response = await fetch("https://api.nft.storage/upload", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "image/*",
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDljYjU2M2Q1NWNmMzYzN0Y0ODNFOTliMDQ1NDdENDVGOTM1ODE3RTQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MDM3MzEwMzU5MiwibmFtZSI6IkVwaWNORlQifQ.VPIKDXyVkO5hLVFcyGqGplot0Ponv6BDb9ZQ6zmQQYg",
    //   },
    //   body: files.file,
    // }).then((res) => res.json());

    // console.log(response);
  });
};
