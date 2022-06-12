const item = require("../model/item");
const ItemModel = require("../model/item");

//create and save a new user
exports.create = async (req, res) => {
  title = req.body.title;
  description = req.body.description;
  color = req.body.color;
  const item = new ItemModel({
    title: title,
    description: description,
    color: color,
  });
  await item
    .save()
    .then((data) => {
      res.send({
        message: item,
        item: data,
      });
    })
    .catch((err) => {
      res.send({
        message: err.message || "some error has occured",
      });
    });
};

exports.findAll = async (req, res) => {
  try {
    const item = await ItemModel.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
exports.delete = async (req, res) => {
  let id=req.params.id;
  try {
    ItemModel.findByIdAndDelete(id).exec();
    res.status(200).json({ message: `Item has been deleted Successfully` });
  } catch (error) {
    res.status(404).json({ message: "message" });
  }
};
exports.update = async (req, res) => {
  const newColor = req.body.newColor;
  const newDescription = req.body.newDescription;
  const id = req.body.id;
  try {
    ItemModel.findById(id, (error, itemToUpdate) => {
    itemToUpdate.color = newColor;
    itemToUpdate.description = newDescription;
    itemToUpdate.save();
    });
    res
      .status(200)
      .json({
        message: `Data has been updated for id ${id}`,
        newColor: newColor,
        newDescription: newDescription,
      });
  } catch (error) {
    res.status(404).json({ message: "message ka bhosda" });
  }
};
