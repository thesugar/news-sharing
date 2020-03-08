import Error from 'next/error'
import fetch from 'isomorphic-unfetch'
import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import NewsList from '../components/NewsList';
import Bar from '../components/Bar';
import SharedNewsList from '../components/SharedNewsList';
import { connect } from 'react-redux';
import Head from 'next/head';

const Page = ({ errorCode, stars }) => {
  if (errorCode) {
    return (
        <Container disableGutters={true} maxWidth='lg'>
        <Head><title>Shohan News App</title></Head>
        <Bar />
        <Box my={4}>
          <Typography variant="inherit" color="textPrimary" gutterBottom>
          <div>
            <Error statusCode={errorCode} />
            <p>申し訳ございません。何らかのエラーが発生しました。</p>
            <MuiLink href='https://github.com/thesugar/news-sharing/issues'>
                <a>バグ報告はこちらから</a>
            </MuiLink>
            </div>
          </Typography>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    );
  }

}

Page.getInitialProps = async () => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const errorCode = res.statusCode > 200 ? res.statusCode : false
  const json = await res.json()

  return { errorCode, stars: json.stargazers_count }
}

export default Page