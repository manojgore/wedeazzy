"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to get all vendors by category and city
export async function getAllVendors(category, city) {
  console.log(category, city);
  try {
    const queryText2 = "SELECT * FROM vendors WHERE city = ? AND category = ?";
    const values2 = [city, category];

    const [result] = await db.query(queryText2, values2);

    return {
      result: result,
      message: "All vendors fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get all vendors by category
export async function getAllVendorsByCategory(category) {
  console.log(category);
  try {
    const queryText2 = "SELECT * FROM vendors WHERE category = ?";
    const values2 = [category];

    const [result] = await db.query(queryText2, values2);

    return {
      result: result,
      message: "All vendors fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to search vendors
export async function searchvendors(keywords, category, minPrice, maxPrice) {
  try {
    const queryText2 = "SELECT * FROM vendors WHERE category = ?";
    const values2 = [category];

    const [result] = await db.query(queryText2, values2);

    const searchResult = result.filter(
      (r) =>
        r.business_name.toLowerCase().includes(keywords) &&
        (minPrice !== "" ? getMinPackagePrice(r) >= minPrice : 1) &&
        (maxPrice !== "" ? getMaxPackagePrice(r) <= maxPrice : 1)
    );

    return {
      result: searchResult,
      message: "All vendors fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get a vendor by id
export async function getVendorById(id) {
  try {
    const queryText = "SELECT * FROM vendors WHERE id = ?";
    const values = [id];

    const [result] = await db.query(queryText, values);

    return {
      result: result[0],
      message: "All vendors fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "Vendor not found", success: false };
  }
}

// Function to get the number of total vendors
export async function getVendorsCount() {
  try {
    const queryText = "SELECT * FROM vendors";

    const [result] = await db.query(queryText);

    return JSON.stringify({
      result: result.length,
      message: "All venues fetched successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to get all vendors
export async function getEveryVendors() {
  try {
    const queryText = "SELECT * FROM vendors";

    const [result] = await db.query(queryText);

    return {
      result: result,
      message: "All vendors fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to Vendor Signup
export async function vendorSignup(formdata) {
  try {
    const hashedPassword = await bcrypt.hash(formdata.password, 10);

    const queryText =
      "INSERT INTO vendors (category, name, business_name, email, phone, password, description, images, ratings, location, address, city, pincode, state, events_completed, packages, ready_to_travel, year_of_experience, website, maplink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      formdata.category.toLowerCase(),
      formdata.name,
      formdata.business_name,
      formdata.email,
      formdata.phone,
      hashedPassword,
      formdata.description,
      JSON.stringify(formdata.images),
      formdata.ratings,
      formdata.location,
      formdata.address,
      formdata.city.toLowerCase(),
      formdata.pincode,
      formdata.state,
      formdata.events_completed,
      JSON.stringify(formdata.packages),
      formdata.ready_to_travel,
      formdata.year_of_experience,
      formdata.website,
      formdata.maplink,
    ];

    const [result] = await db.query(queryText, values);

    return JSON.stringify({
      result: result,
      message: "Vendor Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Error While Creating New Vendor Account",
      success: false,
    });
  }
}

// Function to login vendor
export async function vendorLogin(formdata) {
  try {
    const queryText = "SELECT * FROM vendors WHERE phone = ?";
    const values = [formdata.phone];

    const [rows] = await db.query(queryText, values);

    const vendor = rows[0];

    const passwordMatched = await bcrypt.compare(
      formdata.password,
      vendor.password
    );
    if (!passwordMatched) {
      return { error: "Incorrect password", success: false };
    }

    if (!vendor) {
      return { error: "Vendor not found", success: false };
    }

    const jwtPayload = {
      id: vendor.id,
    };
    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

    cookies().delete("wedeazzy_secret");
    cookies().delete("wedeazzy_secret_venue");
    cookies().delete("wedeazzy_secret_service");
    cookies().set("wedeazzy_secret_vendor", token);
    return {
      user: vendor,
      message: "Logged in successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Error While Login To Your Vendor Account",
      success: false,
    };
  }
}

// Function to edit vendors
export async function vendorEdit(formdata) {
  const token = cookies().get("wedeazzy_secret_vendor")?.value;

  try {
    const vendorId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM vendors WHERE id = ?";
    const values = [vendorId];

    const [rows] = await db.query(queryText, values);

    const vendor = rows[0];

    if (!vendor) {
      return { error: "Vendor not found", success: false };
    }

    const queryText1 =
      "UPDATE vendors SET category = ?, name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, events_completed = ?, packages = ?, ready_to_travel = ?, year_of_experience = ?, website = ?, maplink = ? WHERE phone = ? AND id = ?";
    const values1 = [
      formdata.category.toLowerCase(),
      formdata.name,
      formdata.business_name,
      formdata.email,
      formdata.description,
      JSON.stringify(formdata.images),
      formdata.ratings,
      formdata.location,
      formdata.address,
      formdata.city.toLowerCase(),
      formdata.pincode,
      formdata.state,
      formdata.events_completed,
      JSON.stringify(formdata.packages),
      formdata.ready_to_travel,
      formdata.year_of_experience,
      formdata.website,
      formdata.maplink,
      formdata.phone,
      vendor.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Vendor Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to edit vendor", success: false });
  }
}

// Function to edit vendor by admin
export async function vendorEditAdmin(formdata) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return JSON.stringify({ error: "admin user not found", success: false });
    }

    console.log(user);
    if (user.role !== "admin") {
      return JSON.stringify({ error: "user is not admin", success: false });
    }

    const queryText1 =
      "UPDATE vendors SET category = ?, name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, events_completed = ?, packages = ?, ready_to_travel = ?, year_of_experience = ?, website = ?, maplink = ? WHERE phone = ? AND id = ?";
    const values1 = [
      formdata.category.toLowerCase(),
      formdata.name,
      formdata.business_name,
      formdata.email,
      formdata.description,
      JSON.stringify(formdata.images),
      formdata.ratings,
      formdata.location,
      formdata.address,
      formdata.city.toLowerCase(),
      formdata.pincode,
      formdata.state,
      formdata.events_completed,
      JSON.stringify(formdata.packages),
      formdata.ready_to_travel,
      formdata.year_of_experience,
      formdata.website,
      formdata.maplink,
      formdata.phone,
      vendor.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Vendor Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to edit vendor", success: false });
  }
}

// Function to change password of vendor by admin
export async function vendorPassChangeAdmin(formdata) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return JSON.stringify({ error: "admin user not found", success: false });
    }

    console.log(user);
    if (user.role !== "admin") {
      return JSON.stringify({ error: "user is not admin", success: false });
    }

    console.log(formdata);

    const hashedPassword = await bcrypt.hash(formdata.password, 10);
    const queryText1 =
      "UPDATE vendors SET password = ? WHERE phone = ? AND id = ?";
    const values1 = [hashedPassword, formdata.phone, formdata.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Vendor Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of vendor",
      success: false,
    });
  }
}

// Function to change password of vendor by vendor owner
export async function vendorPassChange(password) {
  const token = cookies().get("wedeazzy_secret_vendor")?.value;

  try {
    const vendorId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM vendors WHERE id = ?";
    const values = [vendorId];

    const [rows] = await db.query(queryText, values);

    const vendor = rows[0];

    if (!vendor) {
      return JSON.stringify({ error: "vendor not found", success: false });
    }

    console.log(vendor);

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText1 = "UPDATE vendors SET password = ? WHERE id = ?";
    const values1 = [hashedPassword, vendor.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Vendor Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of vendor",
      success: false,
    });
  }
}

// Function to delete vendors
export async function vendorDelete(formdata) {
  const token = cookies().get("wedeazzy_secret_vendor")?.value;

  try {
    const vendorId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM vendors WHERE id = ?";
    const values = [vendorId];

    const [rows] = await db.query(queryText, values);

    const vendor = rows[0];

    if (!vendor) {
      return { error: "Vendor not found", success: false };
    }

    const queryText1 = "DELETE FROM vendors WHERE phone = ? AND id = ?";
    const values1 = [formdata.phone, vendor.id];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Vendor Account deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to delete vendor by admin
export async function vendorDeleteAdmin(formdata) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return JSON.stringify({ error: "admin user not found", success: false });
    }

    console.log(user);
    if (user.role !== "admin") {
      return JSON.stringify({ error: "user is not admin", success: false });
    }

    const queryText1 = "DELETE FROM vendors WHERE phone = ? AND id = ?";
    const values1 = [formdata.phone, vendor.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Vendor Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to delete vendor", success: false });
  }
}

// Function to logout vendor
export async function vendorLogout() {
  cookies().set("wedeazzy_secret_vendor", false);
}

// Function to check if vendor exists
export async function checkDuplicateVendor(formdata) {
  try {
    // Checking if the vendor with same phone alraedy exists
    const queryText1 = "SELECT * FROM vendors WHERE phone = ?";
    const values1 = [formdata.phone];
    const [result1] = await db.query(queryText1, values1);

    if (result1.length !== 0) {
      return JSON.stringify({
        message: "vendor with this phone number alraedy exists",
        success: false,
      });
    }

    return JSON.stringify({
      message: "vendor with this phone number does not exists",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: error,
      message: "error occured while checking the duplicacy vendor",
      success: false,
    });
  }
}

// Function to validate vendor
export async function validateVendor() {
  const token = cookies().get("wedeazzy_secret_vendor")?.value;

  try {
    const vendorId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM vendors WHERE id = ?";
    const values = [vendorId];

    const [rows] = await db.query(queryText, values);

    const vendor = rows[0];

    if (!vendor) {
      return { error: "Vendor not found", success: false };
    }

    return {
      success: true,
      vendor: vendor,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}
