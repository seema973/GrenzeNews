import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'//import whith impt
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in' ,
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string
  }
  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

   // whenever we made object in JS we can use constructor() and constructor only work when super() class constructor is called
   constructor(props){
    //make an array article which takes the content or articles from sampleOutput.json we can acces this variable using this.articles
    super(props);
    console.log("Hello i am constructor from NewsItem.js");
    // we well set the state to sample.json 
    this.state ={
        articles: [],
        loading: true ,
        page:1,
        totalResults: 0   
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)} - GrenzeNews`;
  }



  //We can update news using componentDidMount() it will run in start
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apikey=ac9b226e9c7c4f8e8d5a4d95c6e9075b&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults : parsedData.totalResults,
    //   loading:false
    // });
    this.updateNews();
  }

  async updateNews(){
    this.props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apikey=ac9b226e9c7c4f8e8d5a4d95c6e9075b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults : parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }

  // it will run when we click previous 
  handlePreviousClick = async () =>{
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ac9b226e9c7c4f8e8d5a4d95c6e9075b&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   page : this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({
      page:this.state.page-1
    });
    this.updateNews();
  }

  // it will run when we click next 
  handleNextClick = async () =>{
    // if(!(this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)))
    // {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=ac9b226e9c7c4f8e8d5a4d95c6e9075b&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   page : this.state.page + 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({
      page:this.state.page+1
    });
    this.updateNews();
  }

  fetchMoreData =async () => {
    this.setState({page: this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&category=${this.props.category}&apikey=ac9b226e9c7c4f8e8d5a4d95c6e9075b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults : parsedData.totalResults
    });
  };
  

  render() {
    return (
      <>
        <h1 className="text-center" style={{margin: '40px 0px'}}>GrenzeNews - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {/* if this.state.loading is tru then spinner will show else not */}
        {this.state.loading && <Spinner/>}

        {/* it is added when we add InfiniteScroll */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
          {/* means when page is not loading show the content if page is loading don't shiw the content  */}
        {/* {!this.state.loading && this.state.articles.map((element) => { will comment it when we adding infinite scroll  */}
        {this.state.articles.map((element) => {
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
        <button disabled={this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      
      </>
    );
  }
}

export default News;
