const contact = require("./schema/contacts");

const getAllcontacts = () => {
  return contact.find({});
};

const getContactById = (id) => {
  return contact.findOne({ _id: id });
};

const createContact = ({ name, email, phone, favorite }) => {
  return contact.create({ name, email, phone, favorite });
};

const updateContact = (id, fields) => {
  return contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};
const updateContactFavorite = (id, fields) => {
  return contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
};

const removeContact = (id) => {
  return contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getAllcontacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
  updateContactFavorite,
};
