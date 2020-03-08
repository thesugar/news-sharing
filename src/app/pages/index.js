import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import NewsList from '../components/NewsList';
import Bar from '../components/Bar';
import SharedNewsList from '../components/SharedNewsList';
import { connect } from 'react-redux';
import Head from 'next/head';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <MuiLink color="inherit" href="https://material-ui.com/">
          Shohan Corporation.
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
 const Index = () => {
    return (
      <Container disableGutters={true} maxWidth='lg'>
        <Head><title>Shohan News App</title></Head>
        <Bar />
        <Box my={4}>
          <Typography variant="inherit" color="textPrimary" gutterBottom>
            <SharedNewsList />
            <br />
            <NewsList />
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    );
  }

  export default connect((state) => state)(Index);