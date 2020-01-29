import React, {Component} from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import firebase from "firebase";

class ShareNews extends Component {

    constructor(props){
        super(props);
        if (this.props.login == false) {
            Router.push('/address');
        }
        this.state = {
            title: '',
            description: '',
            url: '',
            image: '',
        }
        this.logined = this.logined.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDetail = this.onChangeDetail.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeConcerns = this.onChangeConcerns.bind(this);
        this.doAction = this.doAction.bind(this);
    }

    // login, logout 処理
    logined(){
        console.log('logined.');
    }

    logouted(){
        Router.push('/');
    }

    // フィールド入力処理
    onChangeTitle(e) {
        this.setState({title: e.target.value});
    }

    onChangeDetail(e){
        this.setState({detail: e.target.value});
    }

    onChangeDeadline(e){
        this.setState({deadline: e.target.value});
    }

    onChangeConcerns(e){
        this.setState({concerns: e.target.value});
    }

    // データの登録処理
    doAction = (article, e) => {    

        let db = firebase.firestore();
        // Firestore の登録処理

        db.collection('share').add({
            title: article.title,
            description: article.description,
            image: article.urlToImage,
            url: article.url,
            //sharedFrom: firebase.auth().currentUser.uid,
            //sharedTo :
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
        })
    }

    render(){
        const article = this.props.article;
        return (
            <div>
                <button onClick={(e) => this.doAction(article, e)}>共有する</button>
            </div>
            // 共有先はここでモーダル（ポータル）を表示して選べるようにする
        );
    }
}

ShareNews = connect((state) => state) (ShareNews);
export default ShareNews;