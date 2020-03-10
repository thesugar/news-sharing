import React from 'react'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <p>
        {`申し訳ありません。エラーが発生しました。エラーコード：${this.props.statusCode}`}
        <br />
        <a href='https://github.com/thesugar/news-sharing/issues' target="_blank">バグ報告はこちらから</a>
      </p>
    )
  }
}