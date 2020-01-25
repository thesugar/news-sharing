import { useRouter } from 'next/router'
import Layout from '../../components/Layout.js'
import NewsDetail from '../../components/NewsDetail';
import Link from 'next/link';

export default () => {
  const router = useRouter()

  // 以下の title の部分は書き換えが必要（追加したやつがErrorになる）
  return (
    <Layout title='ニュース詳細'>
      <NewsDetail newsIndex={router.query.id} />
      <Link href="/">
                <button>back</button>
      </Link>
    </Layout>
  )
}