import React from "react";
import Carousel from "react-multi-carousel";
import "./testimonial.css";
import { testimonial_data } from "../../utils/testimonial_data";
const Testimonial = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <section id="testimonial">
      <h2 className="testimonial_title">What Our Clients Say</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        showDots={false}
        dotListClass="custom-dots"
        containerClass="carousel-container"
      >
        {testimonial_data.map((testimonial, index) => (
          <div key={index} className="testimonial_card">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}`}
              className="testimonial_card_image"
            />
            <h3 className="testimonial_card_client_name">{testimonial.name}</h3>
            <p className="role">{testimonial.role}</p>
            <p className="testimonial_details">{testimonial.testimonial}</p>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Testimonial;
