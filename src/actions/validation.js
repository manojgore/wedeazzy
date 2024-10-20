"use server"

import db from "../../database/database";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Function to validate user
export async function validateAccount() {
    let token = '';
    let type = '';

    if(cookies().get("wedeazzy_secret")){
        token = cookies().get("wedeazzy_secret").value;
        type = 'user';
    }else if(cookies().get("wedeazzy_secret_venue")){
        token = cookies().get("wedeazzy_secret_venue").value;
        type = 'venue';
    }else if(cookies().get("wedeazzy_secret_vendor")){
        token = cookies().get("wedeazzy_secret_vendor").value;
        type = 'vendor';
    }else if(cookies().get("wedeazzy_secret_service")){
        token = cookies().get("wedeazzy_secret_service").value;
        type = 'service';
    }
  
    try {
      const id = await jwt.verify(token, process.env.JWT_SECRET).id;
    
      let queryText = ''
      if(type === 'user'){
        queryText = "SELECT * FROM users WHERE id = ?";
      }else if(type === 'venue'){
        queryText = "SELECT * FROM venues WHERE id = ?";
      }else if(type === 'vendor'){
        queryText = "SELECT * FROM vendors WHERE id = ?";
      }else if(type === 'service'){
        queryText = "SELECT * FROM services WHERE id = ?";
      }

      const values = [id];
      const [rows] = await db.query(queryText, values);
  
      const user = rows[0];
  
      if (!user) {
        return { error: "User not found", success: false };
      }

      if(type === 'user' && user.role === 'admin'){
        type = 'admin';
      }
  
      return {
        success: true,
        user: user,
        type: type
      };
    } catch (error) {
      console.log(error);
      return { error: "User not loggedin", success: false };
    }
}