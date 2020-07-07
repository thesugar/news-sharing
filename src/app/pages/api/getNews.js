const fetch = require('node-fetch');

export default async (req, res) => {
    switch (req.method) {
        case 'GET':
            const getHeadline = true
            const newsJson = await retrieve(getHeadline)
            res.json(newsJson)
            break
        default:
            res.writeHead(400)
            res.end('Bad Request')
    }
}

const retrieve = async (getHeadline = false, country = 'jp', category = false, pageSize = 100, sortBy = "popularity") => {
    let url;
    url = getHeadline ?
        "https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+pageSize+"&sortBy="+sortBy:
    category ?
        // category 指定があるとき（Chipを選択したとき）
        "https://newsapi.org/v2/top-headlines?country="+country+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+pageSize+"&sortBy="+sortBy+"&category="+category:
        // query指定あるとき（検索時）（country指定はできない）
        "https://newsapi.org/v2/everything?q="+query+"&apiKey=30d451b495234aae8b35d83d68082817&pageSize="+pageSize+"&sortBy="+sortBy;
    
    const result = await fetch(url);
    const json = await result.json();

    return json
}