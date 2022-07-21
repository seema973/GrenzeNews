import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'//import whith impt
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props) => {
  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(true);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

useEffect(()=>{
  document.title= `${capitalizeFirstLetter(props.category)} - GrenzeNews`;
  updateNews();
}, [])



  const updateNews = async() =>{
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apikey=9f804b2bdfa54e858ba6074396333262&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }

  // const handlePreviousClick = async () =>{
  //   setPage(page-1);
  //   updateNews();
  // }
 
  // const handleNextClick = async () =>{
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData =async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&category=${props.category}&apikey=9f804b2bdfa54e858ba6074396333262&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    
  };
  
    return (
      <>
        <h1 className="text-center" style={{margin: '40px 0px', marginTop:'90px'}}>GrenzeNews - Top {capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
         {articles.map((element) => {
          return <div className="col-md-4" key={element.url}> 
          {/* col-md-4 means in medium device it will take 4 columns, there are total 12 columns grid in bootstrap */}
            {/* <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description?.slice(0,89):""} imageUrl={element.urlToImage} newsUrl ={element.url}/> */}
            {/* we used above code when we want title and description of news to be of limited characters */}
            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl ={element.url} author={element.author} date={element.publishedAt } source={element.source.name}/>
          </div>
        })} 
        </div>  
        </div>
        </InfiniteScroll>

        {/* we used previous and next when infinie scroll bar is not added */}
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      
      </>
    );
  }

// in functional based component props and default props are written at the end 
News.defaultProps = {
  country: 'in' ,
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category : PropTypes.string
}
export default News;
