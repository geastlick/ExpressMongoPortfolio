import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

const items = [
    {
        src: "images/ms_about1_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about2_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about3_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about4_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about5_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about6_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about7_carousel.jpg",
        altText: "About Us",
    },
    {
        src: "images/ms_about8_carousel.jpg",
        altText: "About Us",
    },
];

const AboutUs = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} className="d-block w-100" />
            </CarouselItem>
        );
    });

    return (
        <div id="content" className="container">
            <div className="row row-content">
                <div className="col">
                    <div className="media">
                        <Carousel
                            activeIndex={activeIndex}
                            next={next}
                            previous={previous}
                            className="w-25 d-none d-md-block my-auto"
                        >
                            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                        </Carousel>
                        <div className="media-body my-auto">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        Who better to create software than those in the business? We own a sign franchise
                                        and use our own
                                        software
                                        daily.
                                </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="offset-md-2 col">
                                        <a href="https://www.facebook.com/magnetsigns/" target="_blank" rel="noopener noreferrer"
                                            className="btn btn-social btn-facebook"><i className="fa fa-facebook"></i>
                                            Magnetsigns Corporate</a>&nbsp;&nbsp;
                                        <a href="https://www.facebook.com/magnetsignsfortworthwesttx" target="_blank" rel="noopener noreferrer"
                                            className="btn btn-social btn-facebook"><i className="fa fa-facebook"></i>
                                            MagnetsignsFTW Franchise</a>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="offset-md-2 col">
                                        Franchises (Corporate Website):
                                    <ul>
                                            <li><a href="https://www.magnetsigns.com/locations/fort-worth-west/"
                                                target="_blank" rel="noopener noreferrer">
                                                Fort Worth West (Texas)</a></li>
                                            <li><a href="https://www.magnetsigns.com/locations/abilene/" target="_blank" rel="noopener noreferrer">
                                                Abilene (Texas)</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                <div className="card">
                    <div className="row no-gutters">
                        <div className="col-md-3 d-none d-md-block">
                            <img src="images/ge_portrait.jpg" className="card-img" alt="Portrait of owner/founder" />
                        </div>
                        <div className="col col-md-9">
                            <div className="card-header">Owner and Founder</div>
                            <div className="card-body">
                                <p className="card-text">
                                    Many years of experience in Information Technology, both Database Administration and Software Engineering.
                                    The combination of Software Engineering experience along with Portable Sign Rental experience, position us to create a highly usable, targeted application.
                            </p>
                                <p className="card-text">
                                    We provide a cloud-based solution, so you always have the latest version with the latest features.
                                    We are large enough to provide the support you need, but small enough and focused enough to remain agile.
                                    Need a feature - We can make that happen at an affordable cost.
                                    We have one goal - keep our customers happy.  That requires an easy to use application which meets their needs with good customer service.
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;