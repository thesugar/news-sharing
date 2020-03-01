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
        super(props);
        this.logined = this.logined.bind(this);
    }

    // get data from Firebase
    getNewsSharedByFriends = () => {
        
        let db = firebase.firestore();
        db.collection('share').where('sharedTo', 'array-contains', this.props.userid)
        .get().then((querySnapshot) => {
            // success
            let sharedObject = {};

            querySnapshot.forEach(doc => {
                // はまりポイント: ここでObejct.assign({}, JSON...)とやらないと，reduxがstateの変更を検知してくれない．
                // 参考：https://redux.js.org/faq/immutable-data/
                sharedObject = Object.assign({}, JSON.parse(JSON.stringify(sharedObject)), {[doc.id] : JSON.parse(JSON.stringify(doc.data()))});

                this.props.dispatch({
                    type: 'UPDATE_USER',
                    value: {
                        login: true,
                        userid : this.props.userid,
                        articles : this.props.articles,
                        itemList : this.props.itemList,
                        articlesSharedByFriends : sharedObject,
                    }
                });
            })
        }).catch(error => {
            console.log(error);
        })
    }

    makeTitleList = sharedNews => {
        let sharedNewsForDisp = []
        Object.keys(sharedNews).map(key =>{

            // コメントが新しい順に並び替えて表示するために、引数で受け取ったニュースのリスト（これはFirestoreから引っ張ってきた順番で、
            // ソートはされていない）をもとに新しいオブジェクトを作っている。
            // その新しいオブジェクトの中でdateという項目を持たせて、後続で並び替え処理を行っている。
            // まったくもってスマートじゃない気がするので、修正したほうがよいかも。
            // もともとのFirestor側のデータで、latestUpdate みたいなキーを持たせて、新規共有やコメント追加があるたびそこを書き換えて
            // そこを見てorderBy（Firestore純正の機能）すれば一発なのではないか
            // もしくは、コメント追加時にコメントをObjのObjにしてるけど、arrayUnion（Firestoreの機能）を使ってオブジェクトの配列にすればもうちょい楽かも
            // （今回の実装も、結局ObjのObjを以下sharedNewsForDisp.push()で配列に直してるわけだし。。。）
            sharedNewsForDisp.push(
                {
                    key : key,
                    date : Number(String(Object.keys(sharedNews[key].comment)[Object.keys(sharedNews[key].comment).length - 1]).slice(0, 10)),
                    sharedFrom : sharedNews[key]['sharedFrom'],
                    title : sharedNews[key]['title'],
                }
            );
        })

        sharedNewsForDisp.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        });

        const msg = [];
        sharedNewsForDisp.map(news => 
        msg.push(<li key={news.key}>{news['sharedFrom']}さんから<Link href="/share/[shareid]" as={`/share/${news.key}`}>{news['title'].split(' - ')[0]}</Link>がシェアされました！</li>)
        );
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

       let sharedNews = this.props.articlesSharedByFriends;
       let msg = [];
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