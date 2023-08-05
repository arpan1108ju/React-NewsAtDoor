import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
      country : 'in',
      pageSize : '5',
      category : 'general'
  }

  static propTypes = {
      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
  }
  
 capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
  
    super(props);
    // console.log("Hello i am a constructor");
    this.state = {
        articles : [],
        loading : false,
        page:1,
        totalArticles : 0
    }

    document.title = this.capitalizeFirstLetter(this.props.category) + " NewsAtDoor";
}

async updateNews(pageNo){
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIkey}&page=${pageNo}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData = await data.json();
  this.props.setProgress(70);
  this.setState({
    page : pageNo,
    articles : parsedData.articles,
    totalArticles:parsedData.totalResults, 
    loading : false
  });
  this.props.setProgress(100);
}

  async componentDidMount(){
    this.updateNews(1);
  }

  handlePreviousClick = async()=>{
    this.updateNews(this.state.page - 1)
  }

  handleNextClick= async()=>{
    this.updateNews(this.state.page + 1)
  }

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.APIkey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page : this.state.page + 1,
      articles : this.state.articles.concat(parsedData.articles),
      totalArticles:parsedData.totalResults, 
      loading : false
    });
  };

  render() {
    return (
      <>
        <h1 className='my-5 text-center'>NewsAtDoor - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
        <div className="row my-4">
          
          {this.state.articles.map((element)=>{
              // console.log(element); 
              return <div className="col md-4 mx-auto" key={element.url}>
              <NewsItem 
                title={element.title?element.title:""}
                description={element.description?element.description.slice(0,100):""} 
                imageUrl={element.urlToImage}
                newsUrl = {element.url}
                author = {element.author}
                date = {element.publishedAt}
                source = {element.source.name}
              />
            </div>
          })}
         </div>
            
        </div>
      </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-success" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={ this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
