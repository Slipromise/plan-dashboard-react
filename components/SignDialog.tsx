import React, { ReactElement, useState } from "react";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputGroup,
  Modal,
  ToggleButton,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import styles from "../styles/SignDialog.module.css";

interface Props extends React.ComponentProps<typeof Modal> {
  onLogin: (email: string, password: string) => void;
  onRegister: (email: string, password: string) => void;
}

enum SignType {
  LOGIN,
  REGISTER,
}

export default function SignDialog({
  onLogin,
  onRegister,
  ...modalProps
}: Props): ReactElement {
  const { t } = useTranslation();
  const [signType, setSignType] = useState<SignType>(SignType.LOGIN);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  return (
    <Modal {...modalProps} className={styles.container}>
      <ButtonGroup className="mb-2">
        <ToggleButton
          type="radio"
          checked={signType === SignType.LOGIN}
          value={SignType.LOGIN}
          onClick={(e) => setSignType(SignType.LOGIN)}
        >
          {t("label.login")}
        </ToggleButton>
        <ToggleButton
          type="radio"
          variant="secondary"
          checked={signType === SignType.REGISTER}
          value={SignType.REGISTER}
          onClick={(e) => setSignType(SignType.REGISTER)}
        >
          {t("label.register")}
        </ToggleButton>
      </ButtonGroup>
      <Modal.Body>
        <InputGroup>
          <FormControl
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("label.email")}
          />
        </InputGroup>
        <InputGroup>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("label.password")}
          />
        </InputGroup>
      </Modal.Body>
      <Button
        variant={signType === SignType.LOGIN ? "primary" : "secondary"}
        disabled={!email || !password}
        onClick={() =>
          signType === SignType.LOGIN
            ? onLogin(email, password)
            : onRegister(email, password)
        }
      >
        {signType === SignType.LOGIN ? t("label.login") : t("label.register")}
      </Button>
    </Modal>
  );
}
