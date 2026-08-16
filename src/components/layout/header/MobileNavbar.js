import getNavItems from "@/libs/getNavItems";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";

const MobileNavbar = () => {
	const navItems = getNavItems();

	return (
		<div className="hamburger_menu">
			<div className="mobile_menu mean-container">
				<div className="mean-bar">
					<Link
						href="#nav"
						className="meanmenu-reveal"
						style={{ right: 0, left: "auto" }}
					>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</Link>
					<nav className="mean-nav">
						<ul>
							{navItems?.map((item, idx) => {
								const hasSubmenu = item?.submenu?.length > 0;
								const isIconMenu = item?.submenu?.some(sub => sub?.icon);
								if (hasSubmenu) {
									return (
										<MobileMenuItem
											key={idx}
											text={item?.name}
											url={item?.path ? item.path : "#"}
											submenuClass={isIconMenu ? "mega-menu-service" : ""}
										>
											{item.submenu.map((subItem, subIdx) =>
												isIconMenu ? (
													<li key={subIdx}>
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
													<li key={subIdx}>
														<Link href={subItem?.path ? subItem.path : "/"}>
															{subItem?.name}
														</Link>
													</li>
												)
											)}
										</MobileMenuItem>
									);
								}
								return (
									<li
										key={idx}
										className={
											idx === navItems.length - 1 ? "mean-last" : ""
										}
									>
										<Link href={item?.path ? item.path : "#"}>
											{item?.name}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default MobileNavbar;
