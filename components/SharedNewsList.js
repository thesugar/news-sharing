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
            console.log(querySnapshot.docs[0].data()); // doc[i] を全部まわす必要があると思われる（たぶん）．
            this.props.dispatch({
                type: 'UPDATE_USER',
                value: {
                    login: true,
                    userid : this.props.userid,
                    articles : this.props.articles,
                    articlesSharedByFriends : ['dummy']
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
       const itemList = 'hoge---'

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