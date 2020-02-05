import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import Account from '../components/Account';
import firebase from "firebase";

/*
 MEMO: db.collection('share').where(<ShareTo に userid（要マッチング処理） が含まれる>) で，共有されたニュースを read する．
    あるいは，Shareするとき，別途 user から辿れるコレクションを作る仕組みにしてもいい．
    ShareFrom で，自分が share したやつも read して，共有相手の反応などを確認できるようにする．（これはコンポーネントを分けてもいい）
*/

class SharedNewsList extends Component {

    constructor(props){
        console.log('SharedNewsListのconstructor');
        super(props);
        this.logined = this.logined.bind(this);
    }

    // get data from Firebase
    getNewsSharedByFriends = () => {
        
        let db = firebase.firestore();
        db.collection('share').where('sharedTo', 'array-contains', this.props.userid).get().then((querySnapshot) => {
            // success
            console.log(querySnapshot.docs[0].data()); // doc[i] を全部まわす必要があると思われる（たぶん）．
            this.props.dispatch({
                type: 'UPDATE_USER',
                value: {
                    login: true,
                    userid : this.props.userid,
                    articles : this.props.articles
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }

    logined(){
        console.log('loginしました');
        //this.getFireData();
    }

    logouted(){
        console.log('logoutしました');
    }
    
    /*
            <li key={index.toString}>
                <Link href="/p/[id]" as={`/p/${index}`}>
                {article['title']}
                </Link>
            <ul>
                <li key="0"><img src={article['urlToImage']} width="100" height="100" /></li>
                <li key="1">{article['description']}</li>
                <li key="2">{article['content']}</li>
            </ul>
            </li>);
    */

    render() {
        console.log('NewsListのrender()');
        console.log('今のthis.propsは');
        console.log(this.props);
        this.props.articles.length === 0 && this.getNews();
        const itemList = [];
        this.props.articles.map((article, index) => {
            itemList.push(
                <NewsCard title={article['title']} image={article['urlToImage']} description={article['description']} index={index} />
            );
        })

        return (
            <div>
                <Account onLogined={this.logined} onLogouted={this.logouted}/>
            <ul>
                {itemList}
            </ul>
            </div>
        );
    }
}

SharedNewsList = connect((state) => state)(SharedNewsList);
export default SharedNewsList;