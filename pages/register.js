import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Link from '../src/Link';
import NewsList from '../components/NewsList';
import Bar from '../components/Bar';
import Register from '../components/Register';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://twitter.com/_thesugar_">
          thesugar
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  export default function RegisterPage() {
    return (
      <Container disableGutters={true} maxWidth='lg'>
        <Bar />
        <Box my={4}>
            <Register />
          <Copyright />
        </Box>
      </Container>
    );
  }