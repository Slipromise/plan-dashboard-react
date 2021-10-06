import React, { ReactElement, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useLoginMutation } from "../store/graphql-generated";

interface Props {}

export default function Login({}: Props): ReactElement {
  const [login, data] = useLoginMutation();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  console.log(data);

  return (
    <div>
      <InputGroup>
        <InputGroup.Text>Email</InputGroup.Text>
        <FormControl
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入Email..."
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Password</InputGroup.Text>
        <FormControl
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入Password..."
        />
      </InputGroup>
      <Button onClick={() => login({ loginInput: { email, password } })}>
        Login
      </Button>
    </div>
  );
}
