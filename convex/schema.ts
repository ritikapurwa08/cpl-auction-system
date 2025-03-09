import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    mobileNo: v.string(),
    isAdmin: v.boolean(),
    verified: v.boolean(),
    paymentDone: v.boolean(),
  }),
});

export default Schema;
