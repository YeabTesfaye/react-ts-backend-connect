import { useEffect, useState } from "react";
import UserService from "../services/user-service";
import { User } from "./utils";
import { CanceledError } from "axios";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const { request } = UserService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        const message = err.response?.data?.message || err.message;

        setError(message);
        setLoading(false);
      });
  }, []);
  return { users, error, isLoading, setUsers, setError, setLoading };
};

export default useUsers;
