import api from "../../utils/api";

class CustomerApi {
	list = (params?: any) => {
		return api.get("/customers", { params });
	};
}

export default new CustomerApi();
