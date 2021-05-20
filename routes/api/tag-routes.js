const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");
const { update } = require("../../models/Product");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: Product,
    });

    const tagArray = allTags.map((tagInfo) => tagInfo.get({ plain: true }));

    res.send(tagArray);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const specificTag = await Tag.findAll({
      where: {
        id: req.params.id,
      },
      include: Product,
    });

    const tagArray = specificTag.map((tagInfo) => tagInfo.get({ plain: true }));

    res.send(tagArray);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.send([{ "Category Created": "Contains name of " + req.body.tag_name }]);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );

    const tagUpdated = await Tag.findAll({
      where: {
        id: req.params.id,
      },
    });

    res.send(tagUpdated);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send([{ "Category Deleted": "Contains ID of " + req.params.id }]);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

module.exports = router;
