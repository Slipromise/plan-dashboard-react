import React from "react";
import { useSelector } from "react-redux";
import SignDialog from "../components/SignDialog";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../store/graphql-generated";
import { tokenPayloadSelector } from "../store/selectors";

const useSignDialogProps = (): React.ComponentProps<typeof SignDialog> => {
  const [login] = useLoginMutation();

  const [register] = useRegisterMutation();

  const { isLogin } = useSelector(tokenPayloadSelector);

  return {
    show: !isLogin,
    onLogin: (email, password) => {
      login({ loginInput: { email, password } });
    },
    onRegister: (email, password) => {
      register({ userRegisterInput: { email, password } });
    },
    centered: true,
  };
};

export default useSignDialogProps;
