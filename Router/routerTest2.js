const express = require("express");
const router = express.Router();

router.use((req,res,next) => {
  if(req.query.admin) {
    next();
  } else {
    res.send('is not admin')
  }
})

router.get("/", (req, res) => {
  res.send("메인페이지");
});
router.get("/:id", (req, res) => {
  res.send("id페이지");
});
router.get("/:id/edit", (req, res) => {
  res.send("추가 페이지");
});

module.exports = router;
