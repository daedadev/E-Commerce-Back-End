const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: Product,
    });

    const categoryArray = allCategories.map((categoryInfo) =>
      categoryInfo.get({ plain: true })
    );

    res.send(categoryArray);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const specificCategory = await Category.findAll({
      where: {
        id: req.params.id,
      },
      include: Product,
    });

    const categoryArray = specificCategory.map((categoryInfo) =>
      categoryInfo.get({ plain: true })
    );

    res.send(categoryArray);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body);
    res.send([
      { "Category Created": "Contains name of " + req.body.category_name },
    ]);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    const categoryUpdated = await Category.findAll({
      where: {
        id: req.params.id,
      },
    });

    res.send(categoryUpdated);
  } catch (err) {
    console.log(err);
    res.send(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
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
