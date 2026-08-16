"use client";
import { searchSite } from "@/libs/getSearchIndex";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const SiteSearch = ({ variant = "popup", isOpen = true, onNavigate }) => {
	const [query, setQuery] = useState("");
	const inputRef = useRef(null);
	const results = useMemo(() => searchSite(query), [query]);

	useEffect(() => {
		if (isOpen) {
			setQuery("");
			const timer = setTimeout(() => inputRef.current?.focus(), 200);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	const handleSubmit = event => {
		event.preventDefault();
		if (results[0]) {
			onNavigate?.(results[0].path);
		}
	};

	return (
		<div className={`site-search site-search-${variant}`}>
			<form onSubmit={handleSubmit} role="search">
				<div className="search_input">
					<div className="search-box">
						<input
							ref={inputRef}
							className="search-form-input"
							type="search"
							value={query}
							onChange={event => setQuery(event.target.value)}
							placeholder="Search services, products, or pages"
							autoComplete="off"
							aria-label="Search the site"
						/>
						<button type="submit" aria-label="Search">
							<i className="tji-search"></i>
						</button>
					</div>
				</div>
			</form>
			{query.trim().length >= 2 ? (
				<ul className="site-search-results">
					{results.length ? (
						results.map(item => (
							<li key={`${item.type}-${item.path}-${item.title}`}>
								<Link href={item.path} onClick={() => onNavigate?.(item.path)}>
									<span className="site-search-type">{item.type}</span>
									<span className="site-search-title">{item.title}</span>
								</Link>
							</li>
						))
					) : (
						<li className="site-search-empty">No matching pages or services.</li>
					)}
				</ul>
			) : (
				""
			)}
		</div>
	);
};

export default SiteSearch;
