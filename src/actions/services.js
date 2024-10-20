"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to get all services by category and city
export async function getAllServices(category, city) {
  try {
    const queryText2 = "SELECT * FROM services WHERE city = ? AND category = ?";
    const values2 = [city, category];

    const [result] = await db.query(queryText2, values2);

    return {
      result: result,
      message: "All services fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to search services
export async function searchservices(keywords, category, minPrice, maxPrice) {
  try {
    const queryText2 = "SELECT * FROM services WHERE category = ?";
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
      message: "All services fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get service by id
export async function getServiceById(id) {
  try {
    const queryText = "SELECT * FROM services WHERE id = ?";
    const values = [id];

    const [result] = await db.query(queryText, values);

    return {
      result: result[0],
      message: "Service fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "Service not found", success: false };
  }
}

// Function to get the count of total number of services
export async function getServicesCount() {
  try {
    const queryText = "SELECT * FROM services";

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

// Function to get all services
export async function getEveryServices() {
  try {
    const queryText = "SELECT * FROM services";

    const [result] = await db.query(queryText);

    return {
      result: result,
      message: "All services fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get all services by category
export async function getAllServicesByCategory(category) {
  console.log(category);
  try {
    const queryText2 = "SELECT * FROM services WHERE category = ?";
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

// Function to service Signup
export async function serviceSignup(formdata) {
  try {
    const hashedPassword = await bcrypt.hash(formdata.password, 10);

    const queryText =
      "INSERT INTO services (category, name, business_name, email, phone, password, description, images, ratings, location, address, city, pincode, state, events_completed, packages, ready_to_travel, year_of_experience, website, maplink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      message: "Service Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Error While Creating New Service Account",
      success: false,
    });
  }
}

// Function to login service
export async function serviceLogin(formdata) {
  try {
    const queryText = "SELECT * FROM services WHERE phone = ?";
    const values = [formdata.phone];

    const [rows] = await db.query(queryText, values);

    const service = rows[0];

    const passwordMatched = await bcrypt.compare(
      formdata.password,
      service.password
    );
    if (!passwordMatched) {
      return { error: "Incorrect password", success: false };
    }

    if (!service) {
      return { error: "Service not found", success: false };
    }

    const jwtPayload = {
      id: service.id,
    };
    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

    cookies().delete("wedeazzy_secret");
    cookies().delete("wedeazzy_secret_venue");
    cookies().delete("wedeazzy_secret_vendor");
    cookies().set("wedeazzy_secret_service", token);
    return {
      user: service,
      message: "Logged in successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Error While Login To Your Service Account",
      success: false,
    };
  }
}

// Function to edit service
export async function serviceEdit(formdata) {
  const token = cookies().get("wedeazzy_secret_service")?.value;

  try {
    const serviceId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM services WHERE id = ?";
    const values = [serviceId];

    const [rows] = await db.query(queryText, values);

    const service = rows[0];

    if (!service) {
      return JSON.stringify({ error: "Service not found", success: false });
    }

    const queryText1 =
      "UPDATE services SET category = ?, name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, events_completed = ?, packages = ?, ready_to_travel = ?, year_of_experience = ?, website = ?, maplink = ? WHERE phone = ? AND id = ?";
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
      service.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Service Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to change password of service by admin
export async function servicePassChangeAdmin(formdata) {
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
      "UPDATE services SET password = ? WHERE phone = ? AND id = ?";
    const values1 = [hashedPassword, formdata.phone, formdata.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Service Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of service",
      success: false,
    });
  }
}

// Function to change password of service by service owner
export async function servicePassChange(password) {
  const token = cookies().get("wedeazzy_secret_service")?.value;

  try {
    const serviceId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM services WHERE id = ?";
    const values = [serviceId];

    const [rows] = await db.query(queryText, values);

    const service = rows[0];

    if (!service) {
      return JSON.stringify({ error: "service not found", success: false });
    }

    console.log(service);

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText1 = "UPDATE services SET password = ? WHERE id = ?";
    const values1 = [hashedPassword, service.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Service Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of service",
      success: false,
    });
  }
}

// Function to edit service by admin
export async function serviceEditAdmin(formdata) {
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
      "UPDATE services SET category = ?, name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, events_completed = ?, packages = ?, ready_to_travel = ?, year_of_experience = ?, website = ?, maplink = ? WHERE phone = ? AND id = ?";
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
      formdata.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Service Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to edit service", success: false });
  }
}

// Function to delete service
export async function serviceDelete(formdata) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const serviceId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM services WHERE id = ?";
    const values = [serviceId];

    const [rows] = await db.query(queryText, values);

    const service = rows[0];

    if (!service) {
      return { error: "Service not found", success: false };
    }

    const queryText1 = "DELETE FROM services WHERE phone = ? AND id = ?";
    const values1 = [formdata.phone, service.id];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Service Account deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to delete service by admin
export async function serviceDeleteAdmin(formdata) {
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

    const queryText1 = "DELETE FROM services WHERE phone = ? AND id = ?";
    const values1 = [formdata.phone, service.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Service Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to delete service",
      success: false,
    });
  }
}

// Function to logout service
export async function serviceLogout() {
  cookies().set("wedeazzy_secret", false);
}

// Function to check if service exists
export async function checkDuplicateService(formdata) {
  try {
    // Checking if the vendor with same phone alraedy exists
    const queryText1 = "SELECT * FROM services WHERE phone = ?";
    const values1 = [formdata.phone];
    const [result1] = await db.query(queryText1, values1);

    if (result1.length !== 0) {
      return JSON.stringify({
        message: "service with this phone number alraedy exists",
        success: false,
      });
    }

    return JSON.stringify({
      message: "service with this phone number does not exists",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: error,
      message: "error occured while checking the duplicacy service",
      success: false,
    });
  }
}

// Function to validate service
export async function validateService() {
  const token = cookies().get("wedeazzy_secret_service")?.value;

  try {
    const serviceId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM services WHERE id = ?";
    const values = [serviceId];

    const [rows] = await db.query(queryText, values);

    const service = rows[0];

    if (!service) {
      return { error: "Service not found", success: false };
    }

    return {
      success: true,
      service: service,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}
