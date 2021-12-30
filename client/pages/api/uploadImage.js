import nextConnect from "next-connect";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/uploads"),
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

export default (req, res) => {
  upload.single("imageFile")(req, {}, (err) => {
    console.log(req.files);
  });
  // console.log(req);
};
// apiRoute.use(upload.array("theFiles"));

// apiRoute.post((req, res) => {
//   console.log(req);
//   res.status(200).json({ data: "success" });
// });

// export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
