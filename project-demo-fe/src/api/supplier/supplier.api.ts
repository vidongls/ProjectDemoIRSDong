import api from "../../utils/api";

class SupplierApi {
	list = (params?: any) => {
		return api.get("/suppliers", { params });
	};
}

export default new SupplierApi();
