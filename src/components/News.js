import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Loder from "./Loder"
import LoadingBar from 'react-top-loading-bar'
import { Link } from 'react-router-dom';
import data from "./NewsDate";
console.log(data)
const News = (props) => {
    const [progress, setProgress] = useState(0)
    const [articles, setArticles] = useState([]);
    const [recomend, setRecomend] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false)
    const [model1, setmodel] = useState(true)
    const postsPerPage = 10;
    const localStorageData = localStorage.getItem("email");
    const localStorageData1 = localStorage.getItem("Main")
    console.log(localStorageData1, "gyyyyyy");
    const [searchQuery, setSearchQuery] = useState('');
    const [newsResults, setNewsResults] = useState([]);
    const apiKey = 'ebc4d2ac761d47ff8ec00d7115374236&pageSize=9&page=1';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${apiKey}`;
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`${apiUrl}&q=${searchQuery}`);
                const data = await response.json();
                if (data.articles) {
                    setNewsResults(data.articles);
                } else {
                    setNewsResults([]);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        if (searchQuery) {
            fetchNews();
        }
    }, [searchQuery, apiUrl]);

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    useEffect(() => {
        setLoading(true)
        setProgress(20)
        try {
            // const url = ``;
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.articles) {
                        setArticles(data.articles);
                        setProgress(20)
                    }
                    setLoading(false)
                    setProgress(100)
                });
        } catch (error) {
            console.log("SOme Error Occure")
        }
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);
    const lastpage = Math.ceil(articles.length / postsPerPage)
    const preHnadle = () => {
        setLoading(true)
        setProgress(40)

        try {
            setLoading(true)
            setCurrentPage(currentPage - 1)
            console.log(currentPage)
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ebc4d2ac761d47ff8ec00d7115374236&page=${currentPage}&pageSize=9}  `;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.articles) {
                        setArticles(data.articles);
                    }
                    setLoading(false)
                    setProgress(100)

                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const nextHandle = () => {
        setLoading(true)
        setProgress(40)
        setmodel(false)
        try {
            setCurrentPage(currentPage + 1)
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=ebc4d2ac761d47ff8ec00d7115374236&page=${currentPage} &pageSize=9`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.articles) {
                        setArticles(data.articles);
                    }
                    setLoading(false)
                    setProgress(100)
                    setmodel(false)

                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (

        <div>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className='container my-5 mt-5'>
                <div className='row mt-5 my-4 mt-5'>
                    <div className='col-md-3 mt-5'>
                        <div>
                            {/* <form>
                                <label>
                                    Search News:
                                    <input type="text" value={searchQuery} onChange={handleInputChange} />
                                </label>
                            </form> */}
                            {newsResults.length > 0 ? (
                                <ul>
                                    {newsResults.map((news, index) => (
                                        <li key={index}>
                                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                                {news.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p></p>
                            )}
                        </div>
                    </div>
                    <div className='col-md-6 mt-5 my-5' style={{ position: "relative", top: "40px" }}>
                        <h3>Today Top {props.Headlines} Headlines</h3>

                    </div>
                    <div className='col-md-2 mt-5' style={{ position: "relative", top: "40px" }}>
                        <span>Page {currentPage}</span>

                    </div>
                </div>

                {loading ? <Loder />
                    :
                    <div className='row my-3'>
                        {data.map((element, index) => (
                            <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title} result={element.totalResults} description={element.description} author={element.author} image={element.urlToImage}
                                    Date={element.publishedAt} nexturl={element.url} />
                            </div>

                        ))}
                    </div>
                }
            </div>
            {currentPage == 1 ? <div className='container-fluid my-5 mt-5'>
                <h3>Recomende For You</h3>
                <div className='row my-5'>
                    {
                        recomend.map((element1) => {
                            return (
                                <div className='col-md-2 my-2'>
                                    <div className="card ">
                                        <a href={element1.url} target='_blank'>
                                            <img src={element1.urlToImage} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h6 className="card-title text-black text-decoration-none">{element1.title}</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
                <br />
            </div> : ""}
            <div className='container'>
                <div className="row justify-content-between">
                    <div className="col-4">
                        <button type="button" disabled={currentPage <= 1} className="btn btn-dark" onClick={preHnadle} >Previous </button>
                    </div>
                    <div className="col-4">
                                <button type="button" className="btn btn-dark" disabled={currentPage == 9} onClick={nextHandle} >Next </button>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        Register yourself to read More our Spacifice News
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <Link className="btn btn-primary" to="/Registeration" role="button">Registeration</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
    )

}
export default News