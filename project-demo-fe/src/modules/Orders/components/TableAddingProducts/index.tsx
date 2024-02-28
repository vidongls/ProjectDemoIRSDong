/*render -> render từng row -> có thể truyền bất kì nội dung nào để thay nội dung trong row, nếu k truyền mặc định là lấy data theo dataIndex
const columns = [
    {
        key: '',
        title: '',
        className: '',
        dataIndex: '',
        render: (data, record, index) => {
            return data
        }
    }
]
*/

import React from "react";

interface IColumnTable {
	key?: string;
	title?: string;
	className?: string;
	dataIndex: string;
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	render?: (data: any, _record: any, _index: number) => any;
}

interface ITableAddingProducts {
	columns: IColumnTable[];
	data: any[];
}

const TableAddingProducts: React.FC<ITableAddingProducts> = ({ columns, data }) => {
	const renderCol = (record: any, index: number) => {
		return columns.map((col, idx) => {
			const data = record[col.dataIndex];
			return (
				<td className={col.className ?? ""} key={col.key ?? idx}>
					{typeof col.render === "function" ? col.render(data, record, index) : data}
				</td>
			);
		});
	};

	return (
		<table className="table-customize">
			<thead>
				<tr>
					{columns.map((item) => (
						<th key={item.dataIndex}>{item.title}</th>
					))}
				</tr>
			</thead>

			<tbody>
				{data.map((item, index) => {
					return (
						<tr key={index} className="ant-table-row ant-table-row ant-table-row-level-0">
							{renderCol(item, index)}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default TableAddingProducts;
