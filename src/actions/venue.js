"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to get all venues by the city
export async function getAllVenues(city) {
  try {
    const queryText = "SELECT * FROM venues WHERE city = ?";
    const values = [city];

    const [result] = await db.query(queryText, values);

    return {
      result: result,
      message: "All venues fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get all venues by the state
export async function getAllVenuesByState(state) {
  try {
    const queryText = "SELECT * FROM venues WHERE state = ?";
    const values = [state];

    const [result] = await db.query(queryText, values);

    return {
      result: result,
      message: "All venues fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get all venues by location
export async function getAllVenuesByLocation(city, location) {
  try {
    const queryText2 = "SELECT * FROM venues WHERE city = ? AND location = ?";
    const values2 = [city, location];

    const [result] = await db.query(queryText2, values2);

    return {
      result: result,
      message: "All venues fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to find the minimum package price
function getMinPackagePrice(result) {
  let min = result.veg_packages.veg_packages[0].price;

  for (let pkg of result.veg_packages.veg_packages) {
    if (pkg.price < min) {
      min = pkg.price;
    }
  }

  for (let pkg of result.nonveg_packages.nonveg_packages) {
    if (pkg.price < min) {
      min = pkg.price;
    }
  }

  return min;
}

// Function to find the maximum package price
function getMaxPackagePrice(result) {
  let max = result.veg_packages.veg_packages[0].price;

  for (let pkg of result.veg_packages.veg_packages) {
    if (pkg.price > max) {
      max = pkg.price;
    }
  }

  for (let pkg of result.nonveg_packages.nonveg_packages) {
    if (pkg.price > max) {
      max = pkg.price;
    }
  }

  return max;
}

// Function to search venues
export async function searchVenues(keywords, city, minPrice, maxPrice) {
  try {
    console.log("params: ", city);
    const queryText2 = "SELECT * FROM venues WHERE city = ?";
    const values2 = [city];

    const [result] = await db.query(queryText2, values2);
    console.log(result[0].business_name);
    const searchResult = result.filter(
      (r) =>
        r.business_name.toLowerCase().includes(keywords) &&
        (minPrice !== "" ? getMinPackagePrice(r) >= minPrice : 1) &&
        (maxPrice !== "" ? getMaxPackagePrice(r) <= maxPrice : 1)
    );

    return {
      result: searchResult,
      message: "All venues fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to get venue by id
export async function getVenueById(id) {
  try {
    const queryText = "SELECT * FROM venues WHERE id = ?";
    const values = [id];

    const [result] = await db.query(queryText, values);

    return {
      result: result[0],
      message: "Venue fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to count the total venues
export async function getVenuesCount() {
  try {
    const queryText = "SELECT * FROM venues";

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

// Function to get all the venues
export async function getEveryVenues() {
  try {
    const queryText = "SELECT * FROM venues";

    const [result] = await db.query(queryText);
    return {
      result: result,
      message: "All venues fetched successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to check if venue exists
export async function checkDuplicateVenue(formdata) {
  try {
    // Checking if the venue with same phone alraedy exists
    const queryText1 = "SELECT * FROM venues WHERE phone = ?";
    const values1 = [formdata.phone];
    const [result1] = await db.query(queryText1, values1);

    if (result1.length !== 0) {
      return JSON.stringify({
        message: "venue with this phone number alraedy exists",
        success: false,
      });
    }

    return JSON.stringify({
      message: "venue with this phone number does not exists",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: error,
      message: "error occured while checking the duplicacy venue",
      success: false,
    });
  }
}

// Function to Venue Signup
export async function venueSignup(formdata) {
  try {
    const hashedPassword = await bcrypt.hash(formdata.password, 10);

    // Checking if the venue with same phone alraedy exists
    const queryText1 = "SELECT * FROM venues WHERE phone = ?";
    const values1 = [formdata.phone];
    const [result1] = await db.query(queryText1, values1);

    if (result1.length !== 0) {
      return JSON.stringify({
        message: "venue with this phone number alraedy exists",
        success: false,
      });
    }

    const queryText =
      "INSERT INTO venues (name, business_name, email, phone, password, description, images, ratings, location, address, city, pincode, state, category, veg_packages, nonveg_packages, website, maplink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
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
      formdata.category,
      JSON.stringify(formdata.veg_packages),
      JSON.stringify(formdata.nonveg_packages),
      formdata.website,
      formdata.maplink,
    ];

    const [result] = await db.query(queryText, values);

    return JSON.stringify({
      result: result,
      message: "Venue Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Error While Creating New Venue Account",
      success: false,
    });
  }
}

// Function to login Venue
export async function venueLogin(formdata) {
  console.log(formdata);
  try {
    const queryText = "SELECT * FROM venues WHERE phone = ?";
    const values = [formdata.phone];

    const [rows] = await db.query(queryText, values);

    const venue = rows[0];
    if (!venue) {
      return { error: "Venue not found", success: false };
    }

    const passwordMatched = await bcrypt.compare(
      formdata.password,
      venue.password
    );
    if (!passwordMatched) {
      return { error: "Incorrect password", success: false };
    }

    const jwtPayload = {
      id: venue.id,
    };
    const token = await jwt.sign(jwtPayload, process.env.JWT_SECRET);

    cookies().delete("wedeazzy_secret");
    cookies().delete("wedeazzy_secret_vendor");
    cookies().delete("wedeazzy_secret_service");
    cookies().set("wedeazzy_secret_venue", token);
    return {
      venue: venue,
      message: "Logged in successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "Error While Login To Your Venue Account", success: false };
  }
}

// Function to edit venues
export async function venueEdit(formdata) {
  const token = cookies().get("wedeazzy_secret_venue")?.value;

  try {
    const venueId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM venues WHERE id = ?";
    const values = [venueId];

    const [rows] = await db.query(queryText, values);

    const venue = rows[0];

    if (!venue) {
      return JSON.stringify({ error: "Venue not found", success: false });
    }

    const queryText1 =
      "UPDATE venues SET name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, category = ?, veg_packages = ?, nonveg_packages = ?, website = ?, maplink = ? WHERE phone = ? and id = ?";
    const values1 = [
      formdata.name,
      formdata.business_name,
      formdata.email,
      formdata.description,
      JSON.stringify(formdata.images),
      formdata.ratings,
      formdata.location,
      formdata.address,
      formdata.city,
      formdata.pincode,
      formdata.state,
      formdata.category,
      JSON.stringify(formdata.veg_packages),
      JSON.stringify(formdata.nonveg_packages),
      formdata.website,
      formdata.maplink,
      formdata.phone,
      venue.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Venue Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to edit venue", success: false });
  }
}

// Function to edit venues by admin
export async function venueEditAdmin(formdata) {
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
      "UPDATE venues SET name = ?, business_name = ?, email = ?, description = ?, images = ?, ratings = ?, location = ?, address = ?, city = ?, pincode = ?, state = ?, category = ?, veg_packages = ?, nonveg_packages = ?, website = ?, maplink = ? WHERE phone = ? and id = ?";
    const values1 = [
      formdata.name,
      formdata.business_name,
      formdata.email,
      formdata.description,
      JSON.stringify(formdata.images),
      formdata.ratings,
      formdata.location,
      formdata.address,
      formdata.city,
      formdata.pincode,
      formdata.state,
      formdata.category,
      JSON.stringify(formdata.veg_packages),
      JSON.stringify(formdata.nonveg_packages),
      formdata.website,
      formdata.maplink,
      formdata.phone,
      formdata.id,
    ];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Venue Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to edit venue", success: false });
  }
}

// Function to change password of venue by admin
export async function venuePassChangeAdmin(formdata) {
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
      "UPDATE venues SET password = ? WHERE phone = ? AND id = ?";
    const values1 = [hashedPassword, formdata.phone, formdata.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Venue Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of venue",
      success: false,
    });
  }
}

// Function to change password of venue by venue owner
export async function venuePassChange(password) {
  const token = cookies().get("wedeazzy_secret_venue")?.value;

  try {
    const venueId = await jwt.verify(token, process.env.JWT_SECRET).id;

    const queryText = "SELECT * FROM venues WHERE id = ?";
    const values = [venueId];

    const [rows] = await db.query(queryText, values);

    const venue = rows[0];

    if (!venue) {
      return JSON.stringify({ error: "venue not found", success: false });
    }

    console.log(venue);

    const hashedPassword = await bcrypt.hash(password, 10);
    const queryText1 = "UPDATE venues SET password = ? WHERE id = ?";
    const values1 = [hashedPassword, venue.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Venue Account password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Unable to change password of venue",
      success: false,
    });
  }
}

// Function to delete venues
export async function venueDelete(formdata) {
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

    const queryText1 = "DELETE FROM venues WHERE phone = ? AND id = ?";
    const values1 = [formdata.phone, vendor.id];

    const [result] = await db.query(queryText1, values1);

    return {
      result: result,
      message: "Venue Account deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}

// Function to delete venues by admin
export async function venueDeleteAdmin(formdata) {
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

    const queryText1 = "DELETE FROM venues WHERE id = ?";
    const values1 = [formdata.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "Venue Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to delete venue", success: false });
  }
}

// Function to logout venue
export async function venueLogout() {
  cookies().delete("wedeazzy_secret_venue");
}

// Function to validate venue
export async function validateVenue() {
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

    return {
      success: true,
      venue: venue,
    };
  } catch (error) {
    console.log(error);
    return { error: "User not loggedin", success: false };
  }
}
