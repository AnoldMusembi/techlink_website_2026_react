import getBlogs from "@/libs/getBlogs";
import sliceText from "@/libs/sliceText";
import Image from "next/image";
import Link from "next/link";

const RecentBlogWidget = () => {
	const recentBlogs = getBlogs()
		?.filter(({ isBlogQuote }) => !isBlogQuote)
		?.slice(0, 3);

	return (
		<div className="tj-sidebar-widget tj-recent-posts">
			<h4 className="widget-title">Related post</h4>
			<ul>
				{recentBlogs?.length
					? recentBlogs?.map(
							(
								{
									id,
									smallImg,
									img,
									title,
									date,
								},
								idx
							) => (
								<li key={idx}>
									<div className="post-thumb">
										<Link href={`/blogs/${id}`}>
											{" "}
											<Image
												src={
													smallImg
														? smallImg
														: img
														? img
														: "/images/blog/post-1.webp"
												}
												alt={title ? title : "Related insight"}
												width={150}
												height={150}
												unoptimized
											/>
										</Link>
									</div>
									<div className="post-content">
										<h6 className="post-title">
											<Link href={`/blogs/${id}`}>
												{sliceText(title, 32, true)}
											</Link>
										</h6>
										<div className="blog-meta">
											<ul>
												<li>{date}</li>
											</ul>
										</div>
									</div>
								</li>
							)
					  )
					: ""}
			</ul>
		</div>
	);
};

export default RecentBlogWidget;
