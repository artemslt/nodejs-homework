const contact = require("../db/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const result = await contact
      .find(
        favorite ? { owner: _id, favorite } : { owner: _id },
        "name email phone favorite",
        { skip, limit }
      )
      .populate("owner", "email subscription");
    console.log(result);
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { _id } = req.user;

    const result = await contact
      .findOne({
        _id: id,
        owner: _id,
      })
      .populate("owner", "_id email subscription");

    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const { _id } = req.user;

    const result = await contact.findOneAndDelete({
      _id: id,
      owner: _id,
    });
    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const newContact = await contact.create({ ...req.body, owner: _id });
    console.log(newContact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { _id } = req.user;

    const result = await contact.findOneAndUpdate(
      { _id: id, owner: _id },
      req.body,
      {
        new: true,
      }
    );
    console.log(result);
    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    const updatedContact = await contact.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContactFavorite = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    console.log(req.user);
    const { _id } = req.user;
    const result = await contact.findOneAndUpdate(
      { _id: id, owner: _id },
      req.body,
      {
        new: true,
      }
    );
    console.log(result);
    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    const updatedContact = await contact.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );

    res.json({
      status: "success",
      code: 200,
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateContact,
  updateContactFavorite,
};
