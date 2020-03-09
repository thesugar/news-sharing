import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

class AddComment extends Component {

    constructor(props){
        super(props);
        if (this.props.login == false) {
            Router.push('/');
        }
        this.state = {
            textAreaValue : '',
            message : null
        }

        this.logined = this.logined.bind(this);
        this.doAction = this.doAction.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.sync(this.props.shareId);
    }

    // login, logout 処理
    logined(){
        console.log('logined.');
    }

    logouted(){
        Router.push('/');
    }

    onChangeText = e => {
        this.setState({textAreaValue: e.target.value});
    }

    // データの登録処理
    doAction = (shareId, userid, e) => {    

        let db = firebase.firestore();
        const date = firebase.firestore.Timestamp.fromDate(new Date());

        // Firestore の登録処理
        db.collection('share').doc(shareId).set({
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
        }, {merge: true}
        )
        .then((doc) => {
            console.log(`コメントを追加しました`);
            this.setState({message: '返信しました！', textAreaValue: ''});
            setTimeout(() => {this.setState({message: null})}, 2000);
        })
        .catch((error) => {
            console.log(`返信に失敗しました。リトライしてください。`);
            this.setState({message: '共有に失敗しました。リトライしてください。', textAreaValue: ''});
            setTimeout(() => {this.setState({message: null})}, 2000);
        });
    }

    // Firestoreと同期してコメント表示
    sync = shareId => {

        let db = firebase.firestore();
        
        db.collection("share").doc(shareId).onSnapshot(doc => {
            let commentRef = doc.data()['comment']
            const commentList = [];
            Object.keys(commentRef).map(key => 
            commentList.push(<li key={key}>{commentRef[key]['speaker']}: {commentRef[key]['text']} ({new Date(commentRef[key]['date'].seconds * 1000).toLocaleString()})</li>)
            );
            this.setState({commentList : commentList})
        });
    }

    render(){
        const shareId= this.props.shareId;
        const userid = this.props.userid;

        return (
            <div>
                {this.state.commentList}<br />
                <div>
                <Grid container spacing={1} alignItems="center">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Reply"
                    placeholder="返信する"
                    multiline
                    rowsMax="5"
                    size="medium"
                    value={this.state.textAreaValue}
                    onChange={this.onChangeText}
                    variant="outlined"
                    />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={(e) => this.doAction(shareId, userid, e)}>返信</Button>
                    </Grid>
                </Grid>
                </div>
                
                <p>{this.state.message}</p>
            </div>
        );
    }
}

AddComment = connect((state) => state) (AddComment);
export default AddComment;