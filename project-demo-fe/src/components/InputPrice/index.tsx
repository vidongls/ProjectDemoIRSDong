import { InputNumberProps, InputNumber } from "antd";

export const InputPrice = (props: InputNumberProps) => (
	<InputNumber
		min="1000"
		max="9999999999"
		style={{ maxWidth: 220 }}
		formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
		placeholder={"vui lòng nhập giá tiền"}
		addonAfter="VND"
		{...props}
	/>
);
