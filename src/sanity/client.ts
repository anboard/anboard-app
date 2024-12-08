// import { createClient } from "sanity";
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: "5xv1zxx1",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});