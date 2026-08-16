import homeOfferings from "../../public/fakedata/home-offerings";

const getHomeOfferings = () => {
	return homeOfferings ? homeOfferings : [];
};

export default getHomeOfferings;
