"use server";

import axios from "axios";

function generateRandom4DigitNumber() {
  // Generate a random number between 0 and 9999
  const randomNumber = Math.floor(Math.random() * 10000);

  // Pad the number with leading zeros to ensure it's 4 digits long
  const fourDigitNumber = randomNumber.toString().padStart(4, "0");

  return fourDigitNumber;
}

export async function sendMobileVerificationOtp(phone, name) {
  const random4DigitNumber = generateRandom4DigitNumber();
  try {
    const response = await axios.get(
      `http://sms.getitsms.com/sms/api?action=send-sms&api_key=cm9vd2RzZEtGTEJlb0g9ekZ0Rmg=&to=${phone}&from=SOLTNT&sms=Dear ${name}, Your OTP is ${random4DigitNumber} . Valid for 10 minutes. Please do not share this OTP. Regards Solution Torrent&p_entity_id=1101592630000079847&temp_id=1107171817559608033`
    );
    if (response.data.code === "ok") {
      return {
        message: "OTP sent your mobile number",
        otp: random4DigitNumber,
        success: true,
      };
    } else {
      return {
        error: "Unable to send otp",
        otp: random4DigitNumber,
        success: true,
      };
    }
  } catch (error) {
    return { error: error, success: false, otp: random4DigitNumber };
  }
}
