import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const Schema = defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    mobileNo: v.string(),
  }),
});

export default Schema;
