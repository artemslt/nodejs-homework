const express = require("express");
const {
  getAllContacts,
  getById,
  deleteById,
  createContact,
  updateContact,
  updateContactFavorite,
} = require("../controllers/contacts");
const { auth } = require("../middleware/authMiddleware");
const {
  validationCreatePost,
  validationUpdatePost,
} = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", auth, getAllContacts);

router.get("/:contactId", auth, getById);

router.post("/", auth, validationCreatePost, createContact);

router.delete("/:contactId", auth, deleteById);

router.put("/:contactId", auth, validationUpdatePost, updateContact);
router.patch(
  "/:contactId/favorite",
  auth,
  validationUpdatePost,
  updateContactFavorite
);

module.exports = router;
