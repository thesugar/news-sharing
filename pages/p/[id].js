import { useRouter } from 'next/router'
import Layout from '../../components/Layout.js'
import NewsDetail from '../../components/NewsDetail';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import ProTip from '../../src/ProTip';
//import Link from '../../src/Link';
import Bar from '../../components/Bar';
import Button from '@material-ui/core/Button';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

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

export default () => {
  const router = useRouter()

  // 以下の title の部分は書き換えが必要（追加したやつがErrorになる）
  return (
    <Container disableGutters={true} maxWidth='false'>
    <Bar />
    <Box my={4}>
      <Typography variant="body" gutterBottom>
        <NewsDetail newsIndex={router.query.id} />
        <Link href="/">
                <Button variant="contained" color="secondary">back</Button>
        </Link>
      </Typography>
      <ProTip />
      <Copyright />
    </Box>
  </Container>    
  )
}