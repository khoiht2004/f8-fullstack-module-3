/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { useGetUserInfoQuery } from "@/services/Auth/userApi";

const UserContext = createContext({
  user: null,
  isLoading: false,
  isError: false,
  isFetching: false,
  refetch: () => {},
});

function UserProvider({ children }) {
  const { data, error, isLoading, isFetching, refetch } = useGetUserInfoQuery();

  const user = data?.data ?? data?.user ?? data ?? null;

  return (
    <UserContext.Provider
      value={{ user, isLoading, isFetching, isError: !!error, refetch }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  return useContext(UserContext);
}

export { useUser, UserProvider };
export default UserContext;
