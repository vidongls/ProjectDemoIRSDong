import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

const boxStyle: React.CSSProperties = {
	width: "50%",
	height: 120,
	borderRadius: 6,
	border: "1px solid #40a9ff",
	margin: "0 auto",
};

const Home = () => {
	return (
		<Flex gap="middle" vertical style={boxStyle} justify="center" align="center">
			<Flex gap="middle">
				<Link to="sales-order">
					<Button>Đơn bán hàng</Button>
				</Link>
				<Link to="purchase-order">
					<Button>Đơn mua hàng</Button>
				</Link>
			</Flex>
		</Flex>
	);
};

export default Home;
