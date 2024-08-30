import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import editImg from "../assets/images/editImg.jpg";
import { BASE_URL } from "../constent";

function Edit({ product, onProductUpdate}) {
  
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState({
    name: product.name,
    price: product.price,
    discount: product.discount,
    description: product.description,
    productDetails: product.productDetails,
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      name: data.name,
      price: data.price,
      discount: data.discount,
      description: data.description,
      productDetails: data.productDetails,
    };

    try {
      let res = await axios.put(
        `${BASE_URL}/product/update/${product._id}`,
        payLoad,
        (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`)
       
      );
      console.log("first",res.data.data)
     
      if(res.data.data){
        close();
        setData(res.data.data);
        renderProductList()
      }
      
    } catch (err) {
      console.error("data Editing is Failed!",err);
    }
  };

  const renderProductList = async () => {
    setLoading(true);

    try {
      setLoading(true)
      let res = await axios.get(
        `${BASE_URL}/product/list/?limit=10&page=${current}&search`,
        (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`)
      );
      
      onProductUpdate(res.data.data.product);

      
    } catch (err) {
      console.error("product list render failed!", err);
    }
  };
  useEffect(() => {
    renderProductList();
  },[]);

  return (
    
    <div>
      <img
        src={editImg}
        alt="edit"
        height={40}
        onClick={open}
        style={{ cursor: "pointer" }}
        className="ps-3"
      />
      <Modal opened={opened} onClose={close} title="Product Details">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName1" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="exampleInputName1"
              placeholder="Enter product name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice1" className="form-label">
              Price
            </label>
            <input
              name="price"
              type="number"
              className="form-control"
              id="exampleInputPrice1"
              placeholder="Enter product price"
              value={data.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDiscount1" className="form-label">
              Discount
            </label>
            <input
              name="discount"
              type="number"
              className="form-control"
              id="exampleInputDiscount1"
              placeholder="Enter product discount"
              value={data.discount}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDes1" className="form-label">
              Description
            </label>
            <input
              name="description"
              type="text"
              className="form-control"
              id="exampleInputDes1"
              placeholder="Enter product Description"
              value={data.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDetails1" className="form-label">
              Product Details
            </label>
            <input
              name="productDetails"
              type="text"
              className="form-control"
              id="exampleInputDetails1"
              placeholder="Enter product details"
              value={data.productDetails}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
