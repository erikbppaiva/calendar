import { useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { IUser, sigIntEndPoint } from "./backend";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  error: {
    backgroundColor: "rgb(253,236,234)",
    borderRadius: "4px",
    padding: "16px",
    margin: "16px 0",
  },
});
interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}
export function LoginScreen(props: ILoginScreenProps) {
  const classes = useStyles();
  const [email, setEmail] = useState("danilo@email.com");
  const [passoword, setPassoword] = useState("1234");
  const [error, setError] = useState("");

  function signIn(evt: React.FormEvent) {
    evt.preventDefault();
    sigIntEndPoint(email, passoword).then(props.onSignIn, (e) => {
      setError("E-mail não encontrado ou senha incorreta");
      console.error(e);
    });
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
          type="password"
          margin="normal"
          label="Senha"
          fullWidth
          value={passoword}
          onChange={(evt) => setPassoword(evt.target.value)}
          variant="outlined"
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button type="submit" variant="contained" color="primary">
            Entrar
          </Button>
        </Box>
      </form>
    </Container>
  );
}
