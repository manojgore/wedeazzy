"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Function to post a new enquery
export async function postEnquery(enquery) {
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

    const queryText1 =
      "SELECT * FROM enqueris WHERE enquery_to_id = ? AND customer_email = ? AND enquery_type = ?";
    const values1 = [
      enquery.enqueryToId,
      enquery.customerEmail,
      enquery.enqueryType,
    ];

    const [existResult] = await db.query(queryText1, values1);
    if (existResult.length > 0) {
      return { error: "Enquery already exists", success: false };
    }

    const queryText2 =
      "INSERT INTO enqueris (enquery_type, enquery_to_id, customer_name, customer_email, customer_phone, number_of_guests, number_of_rooms, function_date, function_type, function_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values2 = [
      enquery.enqueryType,
      enquery.enqueryToId,
      enquery.customerName,
      enquery.customerEmail,
      enquery.customerPhone,
      enquery.numberOfGuests,
      enquery.numberOfRooms,
      enquery.functionDate,
      enquery.functionType,
      enquery.functionTime,
    ];

    const [result] = await db.query(queryText2, values2);

    return JSON.stringify({
      result: result,
      message: "Enquery created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to fetch all enqueries
export async function fetchEnqueries() {
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

    if (user.role !== "admin") {
      return { error: "User is not admin", success: false };
    }

    const queryText1 = "SELECT * FROM enqueris";

    const [result] = await db.query(queryText1);

    return {
      result: result,
      message: "Enquery fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to fetch all enqueries for specific venue
export async function fetchEnqueriesbyVenue() {
  const token = cookies().get("wedeazzy_secret_venue")?.value;

  try {
    const venueId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM venues WHERE id = ?";
    const values = [venueId];

    const [rows] = await db.query(queryText, values);

    const venue = rows[0];

    if (!venue) {
      return { error: "Venue not found", success: false };
    }

    const queryText1 =
      "SELECT * FROM enqueris WHERE enquery_type = ? AND enquery_to_id = ?";
    const values1 = ["venue", venueId];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Enquery fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to fetch all enqueries for specific venue
export async function fetchEnqueriesbyVendor() {
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
      "SELECT * FROM enqueris WHERE enquery_type = ? AND enquery_to_id = ?";
    const values1 = ["vendor", vendorId];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Enquery fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to fetch all enqueries for specific venue
export async function fetchEnqueriesbyService() {
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

    const queryText1 =
      "SELECT * FROM enqueris WHERE enquery_type = ? AND enquery_to_id = ?";
    const values1 = ["service", serviceId];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Enquery fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to resolve enquery
export async function resolveEnquery(id, vendorType) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    if (vendorType === "vendor") {
      const queryText = "SELECT * FROM vendors WHERE id = ?";
      const values = [userId];

      const [rows] = await db.query(queryText, values);

      const vendor = rows[0];

      if (!vendor) {
        return JSON.stringify({ error: "Vendor not found", success: false });
      }
    } else if (vendorType === "venue") {
      const queryText = "SELECT * FROM venues WHERE id = ?";
      const values = [userId];

      const [rows] = await db.query(queryText, values);

      const venue = rows[0];

      if (!venue) {
        return JSON.stringify({ error: "Venue not found", success: false });
      }
    } else if (vendorType === "service") {
      const queryText = "SELECT * FROM services WHERE id = ?";
      const values = [userId];

      const [rows] = await db.query(queryText, values);

      const service = rows[0];

      if (!service) {
        return JSON.stringify({ error: "Service not found", success: false });
      }
    }

    const queryText1 = "DELETE FROM enqueris WHERE id = ?";
    const values1 = [id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Enquery resolved successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to delete enquery
export async function deleteEnquery(id) {
  const token = cookies().get("wedeazzy_secret")?.value;

  try {
    const userId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM users WHERE id = ?";
    const values = [userId];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return JSON.stringify({ error: "User not found", success: false });
    }

    if (user.role !== "admin") {
      return JSON.stringify({ error: "User is not admin", success: false });
    }

    const queryText1 = "DELETE FROM enqueris WHERE id = ?";
    const values1 = [id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Enquery deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}
