const TestimonialsCard1 = ({ testimonial }) => {
	const { authorName, authorDesig, desc } = testimonial ? testimonial : {};
	return (
		<div className="testimonial-item">
			<span className="quote-icon">
				<i className="tji-quote"></i>
			</span>
			<div className="desc">
				<p>{desc}</p>
			</div>
			<div className="testimonial-author">
				<div className="author-inner">
					<div className="author-img author-icon">
						<i className="tji-user"></i>
					</div>
					<div className="author-header">
						<h4 className="title">{authorName}</h4>
						<span className="designation">{authorDesig}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsCard1;
