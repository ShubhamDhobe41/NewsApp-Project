// import React, { useEffect, useState } from 'react'
// import NewsItem from './NewsItem';

// const NewsBoard = () => {
//     const [article,setArticle]=useState([])
//     useEffect(()=>{
//         let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`;
//         fetch(url).then(response=>response.json())
//                   .then(data=>setArticle(data.article))
//     },[])
//   return (
//     <div>
//     <h2 className='text-center'>Latest <span className='badge bg-danger'>News</span></h2>
//     {article.map((news,index)=>{
//         return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
//     })}

//     </div>
//   )
// }

// export default NewsBoard

import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // const apiKey = import.meta.env.VITE_API_KEY;
        const apiKey="cacb0ef274f74294bb6a1aff2c5a756e"

        if (!apiKey) {
            console.error('API key not found');
            return;
        }

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.articles) {
                    setArticles(data.articles);
                } else {
                    console.error('No articles found in the response:', data);
                }
            })
            .catch(error => console.error('Error fetching the news:', error));
    }, [category]);

    return (
        <div>
            <h2 className='text-center'>Latest <span className='badge bg-danger'>News</span></h2>
            {articles.map((news, index) => (
                <NewsItem 
                    key={index} 
                    title={news.title} 
                    description={news.description} 
                    src={news.urlToImage} 
                    url={news.url} 
                />
            ))}
        </div>
    );
}

export default NewsBoard;

