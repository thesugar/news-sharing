import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import Link from 'next/link';
import NewsCard from '../components/NewsCard';
import Account from '../components/Account';
import firebase from "firebase";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { withStyles } from '@material-ui/core/styles';
import { palette } from '@material-ui/system';
import { Typography } from '@material-ui/core';

/*
 MEMO: db.collection('share').where(<ShareTo に userid（要マッチング処理） が含まれる>) で，共有されたニュースを read する．
    あるいは，Shareするとき，別途 user から辿れるコレクションを作る仕組みにしてもいい．
    ShareFrom で，自分が share したやつも read して，共有相手の反応などを確認できるようにする．（これはコンポーネントを分けてもいい）
*/

const style = theme => ({
    root: {
        width: '90%',
        maxWidth: 'lg',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
      },
    
    listSection: {
        backgroundColor: theme.palette.background.paper,
    },
    
    ul: {
        backgroundColor: theme.palette.background.paper, //リストの背景色いじる場合はここ
        padding: 0,
    },

})

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
                        login: this.props.login,
                        userid : this.props.userid,
                        articles : this.props.articles,
                        itemList : this.props.itemList,
                        articlesSharedByFriends : sharedObject,
                        articlesSharedToFriends : this.props.articlesSharedToFriends
                    }
                });
            })
        }).catch(error => {
            console.log(error);
        })
    }

    // 自分から友達にシェアしたアイテムを取得する
    getNewsSharedToFriends = () => {
        
        let db = firebase.firestore();
        db.collection('share').where('sharedFrom', '==', this.props.userid)
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
                        login: this.props.login,
                        userid : this.props.userid,
                        articles : this.props.articles,
                        itemList : this.props.itemList,
                        articlesSharedByFriends : this.props.articlesSharedByFriends,
                        articlesSharedToFriends : sharedObject
                    }
                });
            })
        }).catch(error => {
            console.log(error);
        })
    }

    makeTitleList = (sharedNews, direction) => {
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
            if (direction === 'from') {
                sharedNewsForDisp.push(
                    {
                        key : key,
                        date : Number(String(Object.keys(sharedNews[key].comment)[Object.keys(sharedNews[key].comment).length - 1]).slice(0, 10)),
                        sharedFrom : sharedNews[key]['sharedFrom'],
                        title : sharedNews[key]['title'],
                    }
                );
            } else if (direction === 'to') {
                sharedNewsForDisp.push(
                    {
                        key : key,
                        date : Number(String(Object.keys(sharedNews[key].comment)[Object.keys(sharedNews[key].comment).length - 1]).slice(0, 10)),
                        sharedTo : sharedNews[key]['sharedTo'],
                        title : sharedNews[key]['title'],
                    }
                );    
            }
        })

        sharedNewsForDisp.sort((a, b) => {
            if (a.date < b.date) return 1;
            if (a.date > b.date) return -1;
            return 0;
        });

        const msg = [];
        if (direction === 'from'){
            
            sharedNewsForDisp.map(news => 
            msg.push(<ListItem key={news.key}>
                    <ListItemText
                    primary=
                        {<Typography variant="body2" color='inherit'>
                            <Link href="/share/[shareid]" as={`/share/${news.key}`}>{news['title'].split(' - ')[0]}</Link>
                        </Typography>}
                    secondary=
                        {<Typography variant="body2" color='inherit'>{news['sharedFrom']}さんから</Typography>}>
                    </ListItemText>
                </ListItem>
                )
            );
        }

        if (direction === 'to'){
            sharedNewsForDisp.map(news => 
            msg.push(<ListItem key={news.key}>
                    <ListItemText
                    primary=
                        {<Typography variant="body2" color='inherit'>
                            <Link href="/share/[shareid]" as={`/share/${news.key}`}>{news['title'].split(' - ')[0]}</Link>
                        </Typography>}
                    secondary=
                        {<Typography variant="body2" color='inherit'>{news['sharedTo'].map(value => value + 'さん ')}に</Typography>}>
                    </ListItemText>
                </ListItem>
                )
            );
        }

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
        (this.props.articlesSharedToFriends === undefined || this.props.articlesSharedToFriends.length === 0) && this.getNewsSharedToFriends();

       let sharedNews = this.props.articlesSharedByFriends;
       let sharedNewsToFriends = this.props.articlesSharedToFriends;
       let msg = [];
       let msg_to = [];
       if (sharedNews){
            msg = this.makeTitleList(sharedNews, 'from');
       }

       if (sharedNewsToFriends){
           msg_to = this.makeTitleList(sharedNewsToFriends, 'to');
       }

        return (
            this.props.userid == 'annonymous' ? null :
            <div>
            <List className={this.props.classes.root} subheader={<li />}>
                <li className={this.props.classes.listSection} key={`sharedToYou`}>
                    <ul className={this.props.classes.ul}>
                    <ListSubheader>{`${this.props.userid}さんにシェアされたアイテム`}</ListSubheader>
                    {sharedNews ? msg : null}
                    <ListSubheader>{`${this.props.userid}さんがシェアしたアイテム`}</ListSubheader>
                    {sharedNewsToFriends ? msg_to : null}
                    </ul>
                </li>
            </List>
            </div>
        );
    }
}

SharedNewsList = withStyles(style)(connect((state) => state)(SharedNewsList));
export default SharedNewsList;