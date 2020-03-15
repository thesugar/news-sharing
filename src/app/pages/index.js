import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import NewsList from '../components/NewsList';
import Bar from '../components/Bar';
import SharedNewsList from '../components/SharedNewsList';
import { connect } from 'react-redux';
import Head from 'next/head';

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
  
 const Index = () => {
    return (
      <Container disableGutters={true} maxWidth='lg'>
        <Head>
        <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="https://news.thesugar.me/favicon.ico" />
        <html lang="ja" prefix="og: http://ogp.me/ns#"/>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://news.thesugar.me" /> 
        <meta property="og:title" content="NewsThrower" /> 
        <meta property="og:image" content="https://news.thesugar.me/twitter_header_photo_2.png" /> 
        <meta property="og:description" content="気になるニュースを友達とシェアしてみんなでコメントしよう！" /> 

        <meta name="twitter:card" content="summary_large_image" /> 
        <meta name="twitter:site" content="@_thesugar_" /> 
          <title>NewsThrower</title>
          </Head>
        <Bar />
        <Box my={4}>
          <Typography variant="inherit" color="textPrimary" gutterBottom>
            <SharedNewsList />
            <br />
            <NewsList />
          </Typography>
          <Copyright />
        </Box>
      </Container>
    );
  }

  export default connect((state) => state)(Index);