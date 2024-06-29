import TestModel from "../Models/testModels.js";

export const createNewDocument = async (req, res) => {
  try {
    const payload = req.body;
    const newDocument = new TestModel({
      name: payload.name,
      age: payload.age,
    });
    await newDocument.save();
    res.status(200).json("Sucess");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getDocumentByName = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await TestModel.findOne({ name: name });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateDocumentAge = async (req, res) => {
  try {
    const { name, age } = req.body;
    await TestModel.updateOne(
      {
        name: name,
      },
      {
        age: age,
      }
    );
    res.status(200).json("Sucess");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteDocumentByName = async (req, res) => {
  try {
    const { name } = req.body;
    await TestModel.deleteOne({ name: name });
    res.status(200).json("Success");
  } catch (err) {
    res.status(500).json(err);
  }
};
