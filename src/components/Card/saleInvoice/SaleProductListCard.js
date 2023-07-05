import { Col, InputNumber, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const SaleProductListCard = ({ list, updateReturn, returnOnChange }) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "product_id",
			key: "product_id",
		},
		{
			title: "Nom",
			dataIndex: "product",
			key: "product.name",
			render: (product) => (
				<Link to={`/product/${product.id}`}>{product.name}</Link>
			),
		},
		{
			title: " Quantité de Produit ",
			dataIndex: "product_quantity",
			key: "product_quantity",
		},
		{
			title: "Prix Unitaire ",
			dataIndex: "product_sale_price",
			key: "product_sale_price",
		},
		{
			title: " Prix Total  ",
			key: "Total Price ",
			dataIndex: "",
			render: ({
				product_quantity,
				product_sale_price,
				remain_quantity,
				return_quantity,
			}) => {
				if (return_quantity) {
					return remain_quantity * product_sale_price;
				} else {
					return product_sale_price * product_quantity;
				}
			},
		},
	];

	if (updateReturn) {
		// columns.splice(3, 0, {
		//   title: "Remain Quantity",
		//   dataIndex: "remain_quantity",
		//   key: "remain_quantity",
		//   width: "120px",
		// });
		columns.splice(4, 0, {
			title: "Return Quantité",
			dataIndex: "return_quantity",
			key: "return_quantity",
			width: "150px",
			render: (
				value,
				{ product_id, product_quantity, product_sale_price: price }
			) => {
				return (
					<div>
						<InputNumber
							onChange={(value) =>
								returnOnChange({ id: product_id, value, price })
							}
							style={{ width: "120px" }}
							placeholder='Return Qty'
							max={product_quantity}
							min={0}
							value={value}
						/>
					</div>
				);
			},
		});
	}

	const addKeys = (arr) => arr.map((i) => ({ ...i, key: i.id }));

	return (
		<Row>
			<Col span={24} className=''>
				<div
					className='header-solid h-full m-2'
					bordered={false}
					bodyStyle={{ paddingTop: "0" }}>
					<h6 className='font-semibold m-0 text-center'>
					Informations sur les produits vendus
					</h6>
					<hr />,
					<div className='col-info'>
						<Table
							scroll={{ x: true }}
							loading={!list}
							columns={columns}
							dataSource={list ? addKeys(list) : []}
						/>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default SaleProductListCard;
