import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let { title, description, imageurl, newsurl , author ,publishedAt , source} = this.props
        return (
            <div>
                <div className="card mb-3" style={{ width: "540px"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={imageurl ? imageurl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vAOJ24qnoK1Omgt_dzt-SFATzCCEtfqDrw&usqp=CAU"} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}..</h5>
                            <p className="card-text" >{description}...</p>
                            <a href={newsurl} className="btn btn-dark">Read More</a>
                            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(publishedAt).toGMTString()} </small></p>
                        </div>
                    </div>  
                </div>
            </div>
            </div>
             )
    }
}

export default Newsitem




{/* <div className="card" style={{width: "18rem"}}>
        <img src={imageurl?imageurl : "https://akm-img-a-in.tosshub.com/sites/dailyo/fb_feed_images/story_image/202203/heart-health-1820_032122082803.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
             <h5 className="card-title">{title}...</h5>
             <p className="card-text">{description}...</p>
         <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-dark">Read More</a>
        </div> */}