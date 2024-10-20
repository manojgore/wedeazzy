"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "wedeazzy.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "info@wedeazzy.com",
    pass: "?d)M622-qK9C",
  },
});

// Function to generate a random 4-digit number
function generateRandom4DigitNumber() {
  // Generate a random number between 0 and 9999
  const randomNumber = Math.floor(Math.random() * 10000);

  // Pad the number with leading zeros to ensure it's 4 digits long
  const fourDigitNumber = randomNumber.toString().padStart(4, "0");

  return fourDigitNumber;
}

export async function sendEmailVerificationOtp(email) {
  try {
    console.log("first");
    const random4DigitNumber = generateRandom4DigitNumber();

    const info = await transporter.sendMail(
      {
        from: "info@wedeazzy.com", // sender address
        to: email, // list of receivers
        subject: "Verify Your Email", // Subject line
        text: `Your OTP is ${random4DigitNumber}. Do not share it to anyone.`,
      },
      (err) => {
        if (err) {
          console.log("IT has error ", err);
        } else {
          console.log("email has been send");
        }
        console.log(info);
      }
    );

    return {
      message: "Email sent for verification",
      otp: random4DigitNumber,
      success: true,
    };
  } catch (error) {
    return { error: error, success: false };
  }
}

export async function sendContactusEmail(formData) {
  try {
    const info = await transporter.sendMail(
      {
        from: "info@wedeazzy.com", // sender address
        to: "wedeazzy@gmail.com", // list of receivers
        subject: formData.subject, // Subject line
        text: `Here is a query from ${formData.name}(${formData.email}): 
                ${formData.message}
              `,
      },
      (err) => {
        if (err) {
          console.log("IT has error ", err);
        } else {
          console.log("email has been send");
        }
        console.log(info);
      }
    );

    return { message: "Email sent to wedeazzy", success: true };
  } catch (error) {
    return {
      error: error,
      success: false,
      message: "Unable to send email to wedeazzy",
    };
  }
}
