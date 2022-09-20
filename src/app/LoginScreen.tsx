import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";

export function LoginScreen() {
  const [email, setEmail] = useState("danilo@email.com");
  const [passoword, setPassoword] = useState("1234");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
  }
  return (
    <Container maxWidth="sm">
      <h1>Agenda React</h1>
      <p>
        Digite e-mail e senha para entrar no sistema. Para testar, use o e-mail{" "}
        <kbd>danilo@email.com</kbd> e a senha <kbd>1234</kbd>
      </p>
      <form onSubmit={signIn}>
        <TextField
          type="password "
          margin="normal"
          label="Senha"
          fullWidth
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          variant="outlined"
        />
        <TextField
          type="password "
          margin="normal"
          label="Senha"
          fullWidth
          value={passoword}
          onChange={(evt) => setPassoword(evt.target.value)}
          variant="outlined"
        />
        <Box textAlign='right' marginTop='16px'>
          <Button
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
