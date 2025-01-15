import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://Medium_Url_owner:1cmKPlguQa4U@ep-green-hat-a5opt7uv.us-east-2.aws.neon.tech/ai-form-builder?sslmode=require',
  }
});