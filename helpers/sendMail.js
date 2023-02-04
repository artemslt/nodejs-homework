require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const { SEND_GRID_KEY, SEND_GRID_MAIL } = process.env;

sgMail.setApiKey(SEND_GRID_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: SEND_GRID_MAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.error(error.massege);
  }
};

module.exports = sendEmail;
