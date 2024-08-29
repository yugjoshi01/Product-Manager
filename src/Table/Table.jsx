import { Pagination, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Delete from "../components/Delete";
import Edit from "../components/Edit";
import { BASE_URL } from "../constent";

function ProductDetails({ productList }) {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0); 

  const renderProductList = async () => {
    setLoading(true);
    console.log("localStorage.getItem",localStorage.getItem("token"))
    try {
      setLoading(true);
      let res = await axios.get(
        `${BASE_URL}/product/list/?limit=10&page=${current}&search`,
        (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`)
      );
      console.log("response",res)
      setProduct(res.data.data.product);
      setTotalProducts(res.data.data.totalCount);
      setLoading(false);
    } catch (err) {
      console.error("product list render failed!", err);
      setLoading(false)
    }
  };
 
  useEffect(() => {
    renderProductList(current);
  }, [current]);

  
  const handleProductUpdate = (updatedProduct) => {
    if (updatedProduct) {
      setProduct(updatedProduct);
    }
  };

  const handleProductDelete=(deletedProduct)=>{
    if(deletedProduct){
      setProduct(deletedProduct)
    }
  }

  const onChange = (page) => {
    console.log("page", page);
    setCurrent(page);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "ProductDetails",
      dataIndex: "productDetails",
      key: "productDetails",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex">
          <Edit
            product={record}
            productData={product}
            onProductUpdate={handleProductUpdate}
          />
          <Delete 
          product={record}
          onDeleteProductUpdate={handleProductDelete}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <Table dataSource={product} columns={columns} pagination={false} />
      <div className="d-flex justify-content-end my-3">
        <Pagination current={current} onChange={onChange} total={totalProducts} />
      </div>
    </>
  );
}

export default ProductDetails;
