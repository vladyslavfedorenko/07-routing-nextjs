import axios from "axios";

export const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdvZGZvcmdpdmVtZTE5OTNAZ21haWwuY29tIiwiaWF0IjoxNzYwMzU3NjU0fQ.bwAJaQDcqZ7tlU7her3MnD0uDK-Z8Wj_HKaG1axpJhY`,
  },
});
