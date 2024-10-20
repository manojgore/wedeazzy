"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to login business
export async function businessLogin(formdata) {
  try {
    const queryText = "SELECT * FROM business WHERE email = ?";
    const values = [formdata.email];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return { message: "Business with this email not found", success: false };
    }

    const passwordMatched = await bcrypt.compare(
      formdata.password,
      user.password
    );

    if (!passwordMatched) {
      return { message: "Incorrect password", success: false };
    }

    return {
      user: user,
      message: "Logged in successfully",
      success: true,
    };
  } catch (error) {
    return {
      message: "Something Went Wrong",
      success: false,
    };
  }
}

// Function to signup business
export async function businessSignup(formdata) {
  try {
    const {
      businessName,
      city,
      businessType,
      name,
      email,
      mobile,
      password,
      registrationType,
    } = formdata;
    if (
      !businessName ||
      !name ||
      !city ||
      !businessType ||
      !email ||
      !mobile ||
      !password ||
      !registrationType
    ) {
      return {
        message: "All fields are required",
        success: false,
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare SQL query
    const queryText =
      "INSERT INTO business ( businessname, businesscity, businesstype, name, email, phone, password,purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      businessName,
      city,
      businessType,
      name,
      email,
      mobile,
      hashedPassword,
      registrationType,
    ];

    // Execute the query
    const [result] = await db.query(queryText, values);

    //     if (result) return true;
    //   } catch (error) {
    //     return false;
    //   }

    return {
      message: "SignedUp successfully",
      success: true,
    };
  } catch (error) {
    return {
      message: "Something Went Wrong",
      success: false,
    };
  }
}
