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

            let sharedObject;

            querySnapshot.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                sharedObject = sharedObject ? Object.assign(sharedObject, {[doc.id] : JSON.parse(JSON.stringify(doc.data()))}) : {[doc.id] : JSON.parse(JSON.stringify(doc.data()))};
            
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
       const sharedNews = this.props.articlesSharedByFriends;
       let msg = [];
       // ここで処理すると，最初のが取得できてレンダリングしたあとに取得したsharedNewsは変更したとみなされない？render()の外に記述したらいける？
       if (sharedNews){
            for (let key in sharedNews){
                msg.push(<li key={key}>{sharedNews[key]['SharedFrom']}さんから{sharedNews[key]['title']}がシェアされました！</li>);
            }
       }

        return (
            <div>
                <Account onLogined={this.logined} onLogouted={this.logouted}/>
            <ul>
                {sharedNews ? msg : null}
            </ul>
            </div>
        );
    }
}

SharedNewsList = connect((state) => state)(SharedNewsList);
export default SharedNewsList;