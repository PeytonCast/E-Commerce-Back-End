const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const allTag = await Tag.findAll({ include : [{model: Product}]});
    res.status(200).json(allTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, { include : [{model: Product}]}
    );
    if (!tagData) {
      res.status(404).json({ message: '404 No tag found with that id.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag[0]) {
      res.status(404).json({ message: '404 No tag with this id.' });
      return;
    }
    res.status(200).json({ message: 'tag successfuly updated from database.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  // delete on tag by its `id` value
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!delTag) {
      res.status(404).json({ message: '404 No tag found with that id.' });
      return;
    }

    res.status(200).json({ message: 'tag successfuly deleted from database.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
