import groups from "../../public/fakedata/home-work";

const getHomeWorkGroups = () => {
	return groups ? groups : [];
};

export default getHomeWorkGroups;
