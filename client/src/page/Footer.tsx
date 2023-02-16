import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { SxProps, Theme } from '@mui/material/styles';

interface OwnProps {
  sx?: SxProps<Theme>;
}

function Copyright(props: OwnProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://into-cps.org/"
        target="_blank"
        rel="noreferrer"
      >
        The INTO-CPS Association
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Acknowledgements(props: OwnProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Thanks to Material-UI for the '}
      <Link
        color="inherit"
        href="https://github.com/mui/material-ui/tree/v5.11.9/docs/data/material/getting-started/templates/dashboard"
        target="_blank"
        rel="noreferrer"
      >
        {'Dashboard template'}
      </Link>
      {', which was the basis for our React app.'}
    </Typography>
  );
}

function RenderFooter() {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Copyright sx={{ pt: 4 }} />
        <Acknowledgements sx={{ pt: 4 }} />
      </Container>
    </>
  );
}

function Footer() {
  return <RenderFooter />;
}

export default Footer;
