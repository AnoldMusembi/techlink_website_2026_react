import groups from "../../public/fakedata/data-center";

const getDataCenterGroups = () => {
	return groups ? groups : [];
};

export default getDataCenterGroups;
