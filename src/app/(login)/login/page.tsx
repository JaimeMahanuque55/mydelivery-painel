"use client";

import { Box, Button, TextField, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const Page = () => {

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Digite teus dados para entrar no painel administrativo do estabelecimento e gerenciar produtos/pedidos
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <TextField
          label="Digite seu e-mail"
          name="email"
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
        />
        <TextField
          label="Digite sua senha"
          name="password"
          type="password"
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
        >Entrar</Button>

        <Box sx={{ mt: 3 }}>
          <MuiLink href="/login/forgot" variant="body2" component={Link}>Esqueceu sua senha?</MuiLink>
        </Box>
      </Box>
    </>
  );
}

export default Page;