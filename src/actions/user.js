"use server";

import db from "../../database/database";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to signup user
export async function userSignup(formdata) {
  try {
    console.log("user :", formdata);

    const { firstName, lastName, email, mobile, password } = formdata;
    if (!firstName || !lastName || !email || !mobile || !password) {
      return {
        message: "All fields are required",
        success: false,
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare SQL query
    const queryText =
      "INSERT INTO users ( firstname, lastname, email, phone, password, role, favourite_venues, favourite_vendors, favourite_services) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstName,
      lastName,
      email,
      mobile,
      hashedPassword,
      "user",
      "null",
      "null",
      "null",
    ];

    // Execute the query
    const [result] = await db.query(queryText, values);

    console.log(result);

    // Return success response if the query executes without issues
    if (result) return true;
    // return {
    //   result: result,
    //   message: "Signup successfull",
    //   success: true,
    // };
  } catch (error) {
    // Handle bcrypt hashing or other server-related errors
    return false;
    // return {
    //   message: "Signup Unsuccessfull!.Please try again.",
    //   success: false,
    //   // error: error.message, // You can optionally log this for debugging
    // };
  }
}

// Function to login user
export async function userLogin(formdata) {
  try {
    const queryText = "SELECT * FROM users WHERE email = ? AND role = 'user'";
    const values = [formdata.email];

    const [rows] = await db.query(queryText, values);

    const user = rows[0];

    if (!user) {
      return { message: "User with this email not found", success: false };
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

    // cookies().delete("wedeazzy_secret_venue");
    // cookies().delete("wedeazzy_secret_service");
    // cookies().delete("wedeazzy_secret_vendor");
    // cookies().set("wedeazzy_secret", token);
    return {
      user: user,
      message: "Logged in successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Somethig Went Wrong",
      success: false,
    };
  }
}

// Function to user edit
export async function userEdit(formdata) {
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

    const queryText1 =
      "UPDATE users SET firstname = ?, lastname = ?, phone = ?, WHERE id = ?";
    const values1 = [
      formdata.firstname,
      formdata.lastname,
      formdata.phone,
      user.id,
    ];

    const [result1] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result1,
      message: "Account edited successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Error while edit user profile",
      success: false,
    });
  }
}

// Function to change password of user
export async function userPassChange(newPass) {
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

    const hashedPassword = await bcrypt.hash(newPass, 10);

    const queryText1 = "UPDATE users SET password = ? WHERE id = ?";
    const values1 = [hashedPassword, userId];

    const [result1] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result1,
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      error: "Error while edit user profile",
      success: false,
    });
  }
}

// Function to delete users by admin
export async function userDeleteAdmin(formdata) {
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

    const queryText1 = "DELETE FROM users WHERE id = ?";
    const values1 = [formdata.id];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result,
      message: "User Account deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to delete user", success: false });
  }
}

// Function to validate user
export async function validateUser() {
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

// Function to logout user
export async function userLogout() {
  // cookies().set("wedeazzy_secret", token);
  cookies().delete("wedeazzy_secret");
  cookies().delete("wedeazzy_secret_service");
  cookies().delete("wedeazzy_secret_vendor");
  cookies().delete("wedeazzy_secret_venue");
}

// Function to add venue to favourite
export async function addToFavouriteVenue(venueId) {
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

    const favouriteVenues = user.favourite_venues;
    console.log(favouriteVenues);

    var newFavouriteVenues = [];

    if (favouriteVenues) {
      newFavouriteVenues = JSON.parse(favouriteVenues);
      if (newFavouriteVenues.includes(venueId)) {
        newFavouriteVenues = newFavouriteVenues.filter(
          (venue_id) => venue_id !== venueId
        );

        const queryText2 = "UPDATE users SET favourite_venues = ? WHERE id = ?";
        const values2 = [JSON.stringify(newFavouriteVenues), userId];

        const [result] = await db.query(queryText2, values2);

        return JSON.stringify({
          message: "Removed From Favourite",
          newFavVenues: newFavouriteVenues,
          success: true,
        });
      } else {
        newFavouriteVenues.push(venueId);
      }
    } else {
      newFavouriteVenues = [venueId];
    }

    const queryText2 = "UPDATE users SET favourite_venues = ? WHERE id = ?";
    const values2 = [JSON.stringify(newFavouriteVenues), userId];

    const [result] = await db.query(queryText2, values2);

    return JSON.stringify({
      success: true,
      newFavVenues: newFavouriteVenues,
      message: "Venue added to favourites successfully",
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to get all favourite venues
export async function getAllFavouriteVenue() {
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

    const favouriteVenues = user.favourite_venues;
    console.log(favouriteVenues);

    if (favouriteVenues) {
      var favouriteVenuesArr = JSON.parse(favouriteVenues);
      let allFavVenues = [];
      for (let favVenue of favouriteVenuesArr) {
        const tempQueryText = "SELECT * FROM venues WHERE id = ?";
        const tempValues = [favVenue];
        const [tempResult] = await db.query(tempQueryText, tempValues);
        console.log(tempResult);
        allFavVenues = allFavVenues.concat(tempResult);
      }

      return JSON.stringify({
        success: true,
        result: allFavVenues,
        message: "All Favourite Venues fetched successfully",
      });
    } else {
      let allFavVenues = [];
      return JSON.stringify({
        success: true,
        result: allFavVenues,
        message: "All Favourite Venues fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to add vendor to favourite
export async function addToFavouriteVendor(vendorId) {
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

    const favouriteVendors = user.favourite_vendors;
    console.log(favouriteVendors);

    var newFavouriteVendors = [];

    if (favouriteVendors) {
      newFavouriteVendors = JSON.parse(favouriteVendors);
      if (newFavouriteVendors.includes(vendorId)) {
        newFavouriteVendors = newFavouriteVendors.filter(
          (vendor_id) => vendor_id !== vendorId
        );

        const queryText2 =
          "UPDATE users SET favourite_vendors = ? WHERE id = ?";
        const values2 = [JSON.stringify(newFavouriteVendors), userId];

        const [result] = await db.query(queryText2, values2);

        return JSON.stringify({
          message: "Removed From Favourite",
          newFavVendors: newFavouriteVendors,
          success: true,
        });
      } else {
        newFavouriteVendors.push(vendorId);
      }
    } else {
      newFavouriteVendors = [vendorId];
    }

    const queryText2 = "UPDATE users SET favourite_vendors = ? WHERE id = ?";
    const values2 = [JSON.stringify(newFavouriteVendors), userId];

    const [result] = await db.query(queryText2, values2);

    return JSON.stringify({
      success: true,
      newFavVendors: newFavouriteVendors,
      message: "Vendor added to favourites successfully",
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to get all favourite vendors
export async function getAllFavouriteVendor() {
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

    const favouriteVendors = user.favourite_vendors;
    console.log(favouriteVendors);

    if (favouriteVendors) {
      var favouriteVendorsArr = JSON.parse(favouriteVendors);
      let allFavVendors = [];
      for (let favVendor of favouriteVendorsArr) {
        const tempQueryText = "SELECT * FROM vendors WHERE id = ?";
        const tempValues = [favVendor];
        const [tempResult] = await db.query(tempQueryText, tempValues);
        console.log(tempResult);
        allFavVendors = allFavVendors.concat(tempResult);
      }

      return JSON.stringify({
        success: true,
        result: allFavVendors,
        message: "All Favourite Vendors fetched successfully",
      });
    } else {
      let allFavVendors = [];
      return JSON.stringify({
        success: true,
        result: allFavVendors,
        message: "All Favourite Vendors fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to add service to favourite
export async function addToFavouriteService(serviceId) {
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

    const favouriteServices = user.favourite_services;
    console.log(favouriteServices);

    var newFavouriteServices = [];

    if (favouriteServices) {
      newFavouriteServices = JSON.parse(favouriteServices);
      if (newFavouriteServices.includes(serviceId)) {
        newFavouriteServices = newFavouriteServices.filter(
          (service_id) => service_id !== serviceId
        );

        const queryText2 =
          "UPDATE users SET favourite_services = ? WHERE id = ?";
        const values2 = [JSON.stringify(newFavouriteServices), userId];

        const [result] = await db.query(queryText2, values2);

        return JSON.stringify({
          message: "Removed From Favourite",
          newFavServices: newFavouriteServices,
          success: true,
        });
      } else {
        newFavouriteServices.push(serviceId);
      }
    } else {
      newFavouriteServices = [serviceId];
    }

    const queryText2 = "UPDATE users SET favourite_services = ? WHERE id = ?";
    const values2 = [JSON.stringify(newFavouriteServices), userId];

    const [result] = await db.query(queryText2, values2);

    return JSON.stringify({
      success: true,
      newFavServices: newFavouriteServices,
      message: "Service added to favourites successfully",
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to get all favourite servicess
export async function getAllFavouriteService() {
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

    const favouriteServices = user.favourite_services;
    console.log(favouriteServices);

    if (favouriteServices) {
      var favouriteServicesArr = JSON.parse(favouriteServices);
      let allFavServices = [];
      for (let favService of favouriteServicesArr) {
        const tempQueryText = "SELECT * FROM services WHERE id = ?";
        const tempValues = [favService];
        const [tempResult] = await db.query(tempQueryText, tempValues);
        console.log(tempResult);
        allFavServices = allFavServices.concat(tempResult);
      }

      return JSON.stringify({
        success: true,
        result: allFavServices,
        message: "All Favourite Services fetched successfully",
      });
    } else {
      let allFavServices = [];
      return JSON.stringify({
        success: true,
        result: allFavServices,
        message: "All Favourite Services fetched successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "User not loggedin", success: false });
  }
}

// Function to get userc count
export async function getUsersCount() {
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

    const queryText1 = "SELECT * FROM users WHERE role = ?";
    const values1 = ["user"];

    const [result] = await db.query(queryText1, values1);

    return JSON.stringify({
      result: result.length,
      message: "User Accounts counted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({ error: "Unable to count users", success: false });
  }
}
