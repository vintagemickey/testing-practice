import { useState } from "react";
import { LoginPayload } from "../types";
import { authorizeUser } from '../api';

type Props = {
  handleSuccess?: (payload: LoginPayload) => void;
  handleError?: VoidFunction;
};

export const useAuthorization = (props: Props) => {
  const { handleSuccess, handleError } = props;

  const [isAuthorized, setIsAuthorized] = useState(false);

  const authorize = (data: LoginPayload) => {
    return authorizeUser(data)
      .then(() => {
        handleSuccess?.(data);
        setIsAuthorized(true);
      })
      .catch(handleError);
  };

  const logout = () => {
    setIsAuthorized(false);
  };

  return {
    isAuthorized,
    authorize,
    logout,
  };
};
