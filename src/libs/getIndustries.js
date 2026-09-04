import industries from "../../public/fakedata/industries";

const getIndustries = () => {
	return industries ? industries : [];
};

export default getIndustries;
