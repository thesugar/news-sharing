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


export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <Container disableGutters={true} maxWidth='lg'>
      <Head><title>Shohan News App</title></Head>
      <Bar />
      <Box my={4}>
        <Typography variant="inherit" color="textPrimary" gutterBottom>
        <div>
          <p>申し訳ございません。何らかのエラーが発生しました。</p>
          {`エラーコード：${this.props.statusCode}`}
          <MuiLink href='https://github.com/thesugar/news-sharing/issues'>
              <a>バグ報告はこちらから</a>
          </MuiLink>
          </div>
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
    )
  }
}