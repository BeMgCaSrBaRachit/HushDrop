import {z} from "zod"

export const userNameValidation = z
.string()
.min(3, "Username must be atleast 3 characters long")
.max(20, "Username must be atmost 20 characters long")
.regex(/^[a-zA-Z0-9_]{3,20}$/
, "Username must not contain special characters")
