"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailField, setEmailField] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailField) {
      setError('Digite o seu e-mail');
      return;
    }

    setError('');
    setInfo('');
    setLoading(true);
    const result = await api.forgotPassword(emailField);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo
      setInfo('Enviamos um e-mail para a recuperacao da sua senha.')
    }
  }

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: 'center', mt: 2, color: '#555' }}
      >
        Deseja recuperar sua senha?
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Digite seu e-mail"
          name="email"
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setEmailField(e.target.value)}
          value={emailField}
          disabled={loading}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
        >{loading ? 'Carregando...' : 'Recuperar a senha'}</Button>

        {error &&
          <Alert variant="standard" severity="error" sx={{ mt: 3 }}>{error}</Alert>
        }
        {info &&
          <Alert variant="standard" severity="success" sx={{ mt: 3 }}>{info}</Alert>
        }

      </Box>
    </>
  );
}

export default Page;