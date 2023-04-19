"use client";

import { Alert, Link as MuiLink } from "@mui/material";
import Link from "next/link";

const Page = () => {

  return (
    <>
      <Alert variant="standard" severity="error" sx={{ mt: 3, mb: 3 }}>Este link expirou, refaca o procedimento</Alert>

      <MuiLink href="/login/forgot" component={Link} variant="button">Esqueci minha senha</MuiLink>
    </>
  );
}

export default Page;