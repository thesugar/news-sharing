import Link from 'next/link';
import Layout from '../components/Layout';
import NewsList from '../components/NewsList';

export default () => (
    <Layout header="aaaa" title="Top page">
        <div>
            Hello shohan!
            <NewsList />
        </div>
    </Layout>
);