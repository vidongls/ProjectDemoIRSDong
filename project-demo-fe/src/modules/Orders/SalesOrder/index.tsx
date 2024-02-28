import { Button, DatePicker, Form, Input, InputNumber, Space, theme } from "antd";
import { get, set, sumBy } from "lodash";
import { useState } from "react";
import { InputPrice } from "../../../components/InputPrice";
import CustomerSelect from "../components/CustomerSelect";
import TableAddingProducts from "../components/TableAddingProducts";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface ISalesOrder {}

const SalesOrder: React.FC<ISalesOrder> = () => {
	const { token } = theme.useToken();
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState(
		new Array(4).fill(null).map((_, index) => ({
			stt: index + 1,
			product_code: "",
			product_name: "",
			quantity: 0,
			unit_price: 0,
			into_money: 0,
		}))
	);
	const navigate = useNavigate();

	const formStyle: React.CSSProperties = {
		maxWidth: "none",
		background: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		padding: 24,
	};

	const columns = [
		{
			key: "stt",
			title: "#",
			dataIndex: "stt",
		},
		{
			key: "product_code",
			title: "Mã mặt hàng",
			dataIndex: "product_code",
			render: (_data: any, _record: any, index: number) => {
				return (
					<Form.Item
						label=""
						name={["products", index, "product_code"]}
						rules={[
							{
								required: true,
								message: "Không được bỏ trống",
							},
						]}
					>
						<Input placeholder="Nhập mã mặt hàng" onBlur={(value) => onChangeData(index, "product_code", value)} />
					</Form.Item>
				);
			},
		},
		{
			key: "product_name",
			title: "Tên mặt hàng",
			dataIndex: "product_name",
			render: (_data: any, _record: any, index: number) => {
				return (
					<Form.Item
						label=""
						name={["products", index, "product_name"]}
						rules={[
							{
								required: true,
								message: "Không được bỏ trống",
							},
						]}
					>
						<Input placeholder="Nhập tên mặt hàng" onBlur={(value) => onChangeData(index, "product_name", value)} />
					</Form.Item>
				);
			},
		},
		{
			key: "quantity",
			title: "Số lượng",
			dataIndex: "quantity",
			render: (_data: any, _record: any, index: number) => {
				return (
					<Form.Item
						label=""
						name={["products", index, "quantity"]}
						rules={[
							{
								required: true,
								message: "Không được bỏ trống",
							},
						]}
					>
						<InputNumber
							placeholder="Nhập số lượng mặt hàng"
							min={1}
							style={{ width: "100%" }}
							onBlur={(value) => onChangeData(index, "quantity", value)}
						/>
					</Form.Item>
				);
			},
		},
		{
			key: "unit_price",
			title: "Đơn giá",
			dataIndex: "unit_price",
			render: (_data: any, _record: any, index: number) => {
				return (
					<Form.Item
						name={["products", index, "unit_price"]}
						rules={[
							{
								required: true,
								message: "Không được bỏ trống",
							},
						]}
					>
						<InputPrice
							placeholder="Nhập đơn giá"
							min={0}
							style={{ width: "100%" }}
							onBlur={(value) => onChangeData(index, "unit_price", value)}
						/>
					</Form.Item>
				);
			},
		},
		{
			key: "into_money",
			title: "Đơn giá",
			dataIndex: "into_money",
			render: (_data: any) => {
				return `${currencyFormatter(_data)}`;
			},
		},
	];

	const currencyFormatter = (str: string | number = "") => {
		if (str != 0 && !str) return "";
		return String(str).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
	};

	const handleSave = () => {
		form.validateFields()
			.then((values: any) => {
				const body = {
					...values,
					day_vouchers: dayjs(values.day_vouchers).format("DD/MM/YYYY"),
				};
				console.log("🧙 ~ body:", body);
			})
			.catch(() => {});
	};

	const handleCancel = () => {
		navigate("/");
	};

	const onChangeData = (index: number, key: string, value: any) => {
		const newDataSource = [...dataSource];
		set(dataSource, [index, key], value);

		if (key === "quantity" || key === "unit_price") {
			const formValue = get(form.getFieldsValue(), ["products", index]);
			const quantity = get(formValue, "quantity", 0);
			const unitPrice = get(formValue, "unit_price", 0);
			set(dataSource, [index, "into_money"], +quantity * +unitPrice);

			form.setFieldsValue({
				total_amount: sumBy(dataSource, "into_money"),
			});
		}

		setDataSource(newDataSource);
	};

	return (
		<>
			<h2>Đơn bán hàng</h2>
			<Form
				form={form}
				style={formStyle}
				layout={"inline"}
				initialValues={{
					customer_code: "",
					customer_name: "",
					day_vouchers: "",
					total_amount: 0,
				}}
			>
				<Form.Item
					label="Mã khách hàng"
					name="customer_code"
					rules={[
						{
							required: true,
							message: "Không được bỏ trống",
						},
					]}
				>
					<CustomerSelect field="code" placeholder="Nhập mã khách hàng" />
				</Form.Item>
				<Form.Item
					label="Tên khách hàng"
					name="customer_name"
					rules={[
						{
							required: true,
							message: "Không được bỏ trống",
						},
					]}
				>
					<CustomerSelect field="name" placeholder="Nhập tên khách hàng" />
				</Form.Item>
				<Form.Item
					label="Ngày chứng từ"
					name="day_vouchers"
					rules={[
						{
							required: true,
							message: "Không được bỏ trống",
						},
					]}
				>
					<DatePicker placeholder="Chọn ngày" style={{ width: "100%" }} format={"DD/MM/YYYY"} />
				</Form.Item>
				<Form.Item
					label="Tổng tiền"
					name="total_amount"
					rules={[
						{
							required: true,
							message: "Không được bỏ trống",
						},
					]}
				>
					<InputPrice style={{ width: "100%", marginBottom: 16 }} min={0} disabled />
				</Form.Item>

				<TableAddingProducts columns={columns} data={dataSource} />
			</Form>
			<div style={{ textAlign: "left" }}>
				<Space size="small">
					<Button type="primary" htmlType="submit" onClick={handleSave}>
						Lưu
					</Button>
					<Button onClick={handleCancel}>Huỷ</Button>
				</Space>
			</div>
		</>
	);
};

export default SalesOrder;
