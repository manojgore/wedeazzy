"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function adminLogin(formdata) {
  const queryText = "SELECT * FROM users WHERE email = ? AND role = 'admin'";
  const values = [formdata.email];

  const [rows] = await db.query(queryText, values);

  const user = rows[0];

  if (!user) {
    return { message: "No Admin found with this email!", success: false };
  }

  const passwordMatched = await bcrypt.compare(
    formdata.password,
    user.password
  );

  if (!passwordMatched) {
    return { message: "Incorrect password", success: false };
  }

  // const jwtPayload = {
  //   id: user.id,
  // };
  // const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

  // cookies().set("wedeazzy_secret", token);
  return {
    user: user,
    message: "Admin SignIn successfull!",
    success: true,
  };
}

export async function validateAdmin() {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return { error: "User not found", success: false };
    }

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

export async function adminLogout() {
  cookies().set("wedeazzy_secret", false);
}

export async function getEveryUser() {
  try {
    const queryText = "SELECT * FROM users";

    const [result] = await db.query(queryText);

    return {
      result: result,
      message: "All users fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}
