import useActiveLink from "@/hooks/useActiveLink";
import getNavItems from "@/libs/getNavItems";
import Link from "next/link";

const Navbar = () => {
	const makeActiveLink = useActiveLink();
	const navItems = getNavItems()?.map(item => makeActiveLink(item));

	return (
		<div className="menu-area d-none d-lg-inline-flex align-items-center">
			<nav id="mobile-menu" className="mainmenu">
				<ul>
					{navItems?.map((item, idx) => {
						const hasSubmenu = item?.submenu?.length > 0;
						const isIconMenu = item?.submenu?.some(sub => sub?.icon);
						return (
							<li
								key={idx}
								className={`${hasSubmenu ? "has-dropdown" : ""} ${
									item?.isActive ? "current-menu-ancestor" : ""
								}`}
							>
								<Link href={item?.path ? item.path : "#"}>{item?.name}</Link>
								{hasSubmenu ? (
									<ul
										className={`sub-menu${
											isIconMenu ? " mega-menu-service" : ""
										}`}
									>
										{item.submenu.map((subItem, subIdx) =>
											isIconMenu ? (
												<li
													key={subIdx}
													className={
														subItem?.isActive ? "current-menu-item" : ""
													}
												>
													<Link
														className="mega-menu-service-single"
														href={subItem?.path ? subItem.path : "/"}
													>
														<span className="mega-menu-service-icon">
															<i
																className={
																	subItem?.icon
																		? subItem.icon
																		: "tji-service-1"
																}
															></i>
														</span>
														<span className="mega-menu-service-title">
															{subItem?.name}
														</span>
														<span className="mega-menu-service-nav">
															<i className="tji-arrow-right-long"></i>
															<i className="tji-arrow-right-long"></i>
														</span>
													</Link>
												</li>
											) : (
												<li
													key={subIdx}
													className={
														subItem?.isActive ? "current-menu-item" : ""
													}
												>
													<Link href={subItem?.path ? subItem.path : "/"}>
														{subItem?.name}
													</Link>
												</li>
											)
										)}
									</ul>
								) : (
									""
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
