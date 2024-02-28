import { Route, Routes } from "react-router-dom";
import Home from "../modules/Home";
import PurchaseOrder from "../modules/Orders/PurchaseOrder";
import SalesOrder from "../modules/Orders/SalesOrder";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="sales-order" element={<SalesOrder />} />
			<Route path="purchase-order" element={<PurchaseOrder />} />
		</Routes>
	);
};

export default Router;
