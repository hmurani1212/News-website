import React from 'react'
export default function NewsItem(props) {
  const { image, author, title, description, nexturl, Date } = props
  return (
    <div>
      <div className='col-md-4'>
        <div className="card mb-3" style={{ width: "20rem", height:"500px" }}>
        <img src={!image ? "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg" : image} className="card-img-top" alt="..." />
          <div className="card-body">
          <h5 className="card-title">{!title ? "This European airline is launching an 'adult-only' section - Fox Business" : title}</h5>
          <p className="card-text">{!description ? "Sign up for The Brief, The Texas Tribunes daily newsletter that keeps readers up to speed on the most essential Texas news.\r\nThe federal government for the first time on Tuesday opened two areas in t… [+3691 chars]" : description.slice(0, 140)}</p>
         
            <p className="card-text"><small className="text-body-secondary">{Date}</small></p>
            <a href={nexturl} target='_blank' className="btn btn-dark sm">Read News</a>
          </div>
        </div>
      </div>
    
    </div>
  )
}
