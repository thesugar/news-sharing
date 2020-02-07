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
            console.log('getNewsSharedByFriends のなか')

            let sharedObject = {};

            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // はまりポイント: ここでObejct.assign({}, JSON...)とやらないと，reduxがstateの変更を検知してくれない．
                // 参考：https://redux.js.org/faq/immutable-data/
                sharedObject = Object.assign({}, JSON.parse(JSON.stringify(sharedObject)), {[doc.id] : JSON.parse(JSON.stringify(doc.data()))});
            
                this.props.dispatch({
                    type: 'UPDATE_USER',
                    value: {
                        login: true,
                        userid : this.props.userid,
                        articles : this.props.articles,
                        articlesSharedByFriends : sharedObject,
                    }
                });
            })
        }).catch(error => {
            console.log(error);
        })
    }

    makeTitleList = sharedNews => {
        const msg = [];
        Object.keys(sharedNews).map(key => 
            msg.push(<li key={key}>{sharedNews[key]['sharedFrom']}さんから{sharedNews[key]['title'].split(' - ')[0]}がシェアされました！</li>)
        );
        //for (let key in sharedNews) {
        //    msg.push(<li key={key}>{sharedNews[key]['sharedFrom']}さんから{sharedNews[key]['title'].split(' - ')[0]}がシェアされました！</li>)
        //}
        return msg;
    }

    logined(){
        console.log('loginしました');
        //this.getFireData();
    }

    logouted(){
        console.log('logoutしました');
    }
    
    render() {
        console.log('SharedNewsListのrender()');
        console.log('今のthis.propsは');
        console.log(this.props);
        (this.props.articlesSharedByFriends === undefined || this.props.articlesSharedByFriends.length === 0) && this.getNewsSharedByFriends();
        /*
        const itemList = [];
        this.props.articles.map((article, index) => {
            itemList.push(
                <NewsCard title={article['title']} image={article['urlToImage']} description={article['description']} index={index} />
            );
        })
        */
       let sharedNews = this.props.articlesSharedByFriends;
       let msg = [];
       // finished フラグを見ないと，共有されたニュースを取りきってない段階でレンダリングされてそれっきりになる（？
       if (sharedNews){
            msg = this.makeTitleList(sharedNews);
       }

        return (
            <div>
            <ul>
                {sharedNews ? msg : null}
            </ul>
            </div>
        );
    }
}

SharedNewsList = connect((state) => state)(SharedNewsList);
export default SharedNewsList;