import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

export const useCheckEmail = ({ email }: { email: string }) => {
  const checkEmail = useQuery(api.users.checkEmail, { email });
  return checkEmail;
};

export const useGetCurrentUser = () => {
  const currentUser = useQuery(api.users.getCurrentUser);
  return currentUser;
};

export const useGetAllUsers = () => {
  const allUsers = useQuery(api.users.getAllUsers);
  return allUsers;
};
