const db = require("../db/index");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await db.getAllcontacts();
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
    const result = await db.getContactById(id);

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
    const result = await db.removeContact(id);

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
    const contact = await db.createContact(req.body);
    console.log(contact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await db.getContactById(id);
    console.log(result);
    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    const updatedContact = await db.updateContact(id, req.body);

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
    const result = await db.getContactById(id);
    console.log(result);
    if (!result) {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    }

    const updatedContact = await db.updateContactFavorite(id, req.body);

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
