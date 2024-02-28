import { AutoComplete } from "antd";
import { debounce, get, isFunction, map } from "lodash";
import React, { useCallback, useState } from "react";
import supplierApi from "../../../../api/supplier/supplier.api";

interface ISupplierSelectProps {
	field?: any;
	onSearch?: (searchText: string) => void;
	onSelect?: (data: string) => void;
	placeholder?: string;
}

const SupplierSelect: React.FC<ISupplierSelectProps> = ({ field, onSearch, onSelect, ...props }) => {
	const [options, setOptions] = useState<{ value: string }[]>([]);

	const debounceFn = useCallback(debounce(handleDebounceFn, 100), []);

	const onSearchInput = (searchText: string) => {
		if (isFunction(onSearch)) onSearch(searchText);
		debounceFn(searchText);
	};

	const onSelectValue = (data: string) => {
		if (isFunction(onSelect)) onSelect(data);
	};

	function handleDebounceFn(str: string) {
		supplierApi
			.list({ q: str })
			.then((res: any) => {
				const { data } = res;
				setOptions(
					map(data, (item) => ({
						value: get(item, field),
						label: `${item.name} (${item.code})`,
						key: get(item, "id"),
					}))
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return <AutoComplete options={options} style={{ width: 200 }} onSelect={onSelectValue} onSearch={onSearchInput} {...props} />;
};

export default SupplierSelect;
