const express = require("express");
const {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contacts");
const {
  validationCreatePost,
  validationUpdatePost,
} = require("../../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", validationCreatePost, createContact);

router.delete("/:contactId", deleteById);

router.put("/:contactId", validationUpdatePost, updateContact);
router.patch(
  "/:contactId/favorite",
  validationUpdatePost,
  updateContactFavorite
);

module.exports = router;
