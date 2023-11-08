const express = require("express");
const upload = require("../../middleware/multer");
const router = express.Router();
const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
  fetchPost,
} = require("./posts.controllers");

router.param("postId", async (req, res, next, postId) => {
  const post = await fetchPost(postId, next);
  if (post) {
    req.post = post;
    next();
  } else {
    next({ status: 404, msg: "post not found!" });
  }
});

router.get("/", postsGet);
router.post("/", upload.single("image"), postsCreate);
router.delete("/:postId", postsDelete);
router.put("/:postId", postsUpdate);

module.exports = router;
