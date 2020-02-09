import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

class SelectWho extends Component {

    constructor(props){
        super(props);
        if (this.props.login == false) {
            Router.push('/');
        }
        this.state = {
            userList : [],
            textAreaValue : '',
            message : null
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
        const date = firebase.firestore.Timestamp.fromDate(new Date());
        // Firestore の登録処理

        if (this.state.currentSelectedUsers.length === 0 || this.state.currentSelectedUsers === null || this.state.currentSelectedUsers === undefined){
            this.setState({message : '共有する相手を1人以上選択してください'});
            return null;
        }

        db.collection('share').add({
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            url: article.url,
            sharedFrom: userid,
            sharedTo : this.state.currentSelectedUsers,
            comment : 
            {
                // 同時に複数ユーザーからコメントがあっても上書きされないように
                // key はタイムスタンプ（1970-01-01 0時からの経過秒数）+ userid にしている
                // 別案：date.nanoseconds を使えば + userid としなくてもかぶることは基本的にないだろうとは思われる
                [date.seconds+userid]: 
                    {
                        speaker: userid,
                        text: this.state.textAreaValue,
                        date: date
                    }
            }
        })
        .then((doc) => {
            console.log(`共有しました`);
            this.setState({message: '共有しました！続けて別の人やグループに共有することもできます。', textAreaValue: ''});
            setTimeout(() => {this.setState({message: null})}, 2000);
        })
        .catch((error) => {
            console.log(`共有に失敗しました。リトライしてください。`);
            this.setState({message: '共有に失敗しました。リトライしてください。', textAreaValue: ''});
            setTimeout(() => {this.setState({message: null})}, 2000);
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
        return (
            <div>
                <ul>{userList}</ul>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Comment"
                    placeholder="コメントを入力（任意）"
                    multiline
                    rowsMax="5"
                    size="medium"
                    value={this.state.textAreaValue}
                    onChange={this.onChangeText}
                    variant="outlined"
                    />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={(e) => this.doAction(article, userid, e)}>確定</Button>
                    </Grid>
                </Grid>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

SelectWho = connect((state) => state) (SelectWho);
export default SelectWho;