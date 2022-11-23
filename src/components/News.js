import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'

export class News extends Component {
    articles = []
    static propTypes = {
        country : PropTypes.string,
        PageSize : PropTypes.number,
        category : PropTypes.string
    }
    static defaultProps = {
        country : 'us',
        PageSize : 6,
        category : 'general'
    }
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }
    
    
    async componentDidMount() {

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0fcc621328c42189b86372655e8d44d&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults ,
        loading : false })
    }

    handlePrevButton = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0fcc621328c42189b86372655e8d44d&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
            , loading  : false
        })

    }

    handleNextButton = async () => {
        console.log(this.state.page);
        console.log("total page =",Math.ceil(this.state.totalArticles/this.props.pageSize));
        if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)))
        {   
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c0fcc621328c42189b86372655e8d44d&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading :false
            })
        }
    }
    render() {
        return (
            <div>
                <div className='container my-3'>
                    <h1 className='text-center' style={{padding:"20px"}}>Fizz News :Top Headlines</h1>
                    
                    {this.state.loading && <Spinner/>}
                    <div className="row">
                        {
                                !this.state.loading && this.state.articles.map((element) => {
                                return <div className="col-md-6" >
                                    <Newsitem key={element.url} title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                        imageurl={element.urlToImage} newsurl={element.url} author={element.author} publishedAt = {element.publishedAt} source={element.source.name}/>
                                </div>
                            })
                        }
                    </div>
                    <div className="d-flex justify-content-between my-5">
                        <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevButton} className="btn btn-danger">Previous</button>
                        <p><b>Page No. : 0{this.state.page}</b></p>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" onClick={this.handleNextButton} className="btn btn-success">Next</button>
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default News