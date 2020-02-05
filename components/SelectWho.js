import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";
import SimpleModal from '../components/Modal'

class SelectWho extends Component {

    constructor(props){
        super(props);
        if (this.props.login == false) {
            Router.push('/');
        }
        this.state = {
            userList : [],
            textAreaValue : '',
        }

        this.logined = this.logined.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.doAction = this.doAction.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    // login, logout 処理
    logined(){
        console.log('logined.');
    }

    logouted(){
        Router.push('/');
    }

    onChecked(userid, e) {
        const currentSelectedUsers = this.state.currentSelectedUsers ? this.state.currentSelectedUsers : [];
        currentSelectedUsers.push(userid)
        // はまりポイント：
        // 以下で {currentSelectedUsers : currentSelectedUsers.push(userid)}としたら
        // currentSelectedUsers に 1 という数字が入って配列じゃないためpushできないという現象
        // Array.push は 戻り値として length を返すため
        e.target.checked ? 
        this.setState({currentSelectedUsers : currentSelectedUsers})
        :
        this.setState({currentSelectedUsers : currentSelectedUsers.filter(elem => elem !== userid)})
    }

    getUserList = (self = this) => {
        console.log('now inside getUserList function');
        let db = firebase.firestore(); // firestore のオブジェクト取得
    
        db.collection('news-user')
        .get()
        .then(function(querySnapshot) {
            let userList = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            userList.push(<li key={doc.id}><input type="checkbox" onChange={(e) => self.onChecked(doc.data().userid, e)} />{doc.data().userid}</li>);
            })
            self.setState({userList: userList});
        });
    }

    onChangeText = e => {
        this.setState({textAreaValue: e.target.value});
    }

    // データの登録処理
    doAction = (article, userid, e) => {    
        console.log('doActionの中');
        console.log('userid is');
        console.log(userid);
        let db = firebase.firestore();
        // Firestore の登録処理

        db.collection('share').add({
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            url: article.url,
            sharedFrom: userid,
            sharedTo : this.state.currentSelectedUsers,
            comment : this.state.textAreaValue // コメントへの返信を実装するときにはcommentを配列にする（か都度フィールドを追加する？），コメントへのいいねを実装するならネストJSONにする?
        })
        .then((doc) => {
            console.log(`共有しました`);
        })
        .catch((error) => {
            console.log(`共有に失敗しました。リトライしてください。`);
        });

        this.setState({
            title: '',
            description: '',
            image: '',
            url: '',
            sharedFrom : '',
            sharedTo : '',
            comment : ''
        })
    }

    render(){
        const article = this.props.article;
        const userid = this.props.userid;
        (this.state.userList.length === 0 || this.state.userList === undefined) && this.getUserList();
        const userList = this.state.userList;
        console.log('renderの中でuserListがとれてるか')
        console.log(userList);
        return (
            <div>
                <ul>{userList}</ul>
                <div>
                <textarea value={this.state.textAreaValue} onChange={this.onChangeText} />
                </div>
                <button onClick={(e) => this.doAction(article, userid, e)}>確定（Not　Modal）</button>
            </div>
            // 共有先はここでモーダル（ポータル）を表示して選べるようにする
        );
    }
}

SelectWho = connect((state) => state) (SelectWho);
export default SelectWho;