const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCat = await Category.findAll({ include : [{model: Product}]});
    res.status(200).json(allCat);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, { include : [{model: Product}]}
    );
    if (!catData) {
      res.status(404).json({ message: '404 No category found with that id.'});
      return;
    }
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
}
);

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
}
);

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const UpdateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!UpdateCat[0]) {
      res.status(404).json({ message: '404 No category with this id.' });
      return;
    }
    res.status(200).json({ message: 'Category successfuly updated from database.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delCat) {
      res.status(404).json({ message: '404 No category found with that id.' });
      return;
    }

    res.status(200).json({ message: 'Category successfuly deleted from database.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
