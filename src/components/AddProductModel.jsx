import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Result, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetails from "../Table/Table";
import { BASE_URL } from "../constent";

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [nameErr, setNameErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [discountErr, setDiscountErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [detailErr, setDetailErr] = useState("");

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discount: "",
    description: "",
    productDetails: "",
  });
  const [product, setProduct] = useState([]);
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const userId = localStorage.getItem("userid");

  const handlerSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId: localStorage.getItem("userid"),
      name: productData.name,
      price: productData.price,
      discount: productData.discount,
      description: productData.description,
      productDetails: productData.productDetails,
    };

    if (nameErr !== "") {
      return;
    }

    if (priceErr !== "") {
      return;
    }

    if (discountErr !== "") {
      return;
    }

    if (descErr !== "") {
      return;
    }

    if (detailErr !== "") {
      return;
    }
    if (
      nameErr === "" &&
      priceErr === "" &&
      discountErr === "" &&
      descErr === "" &&
      detailErr === ""
    ) {
      setLoading(true);
      try {
        let response = await axios.post(
          `${BASE_URL}/product/create`,
          payload,
          (axios.defaults.headers.post[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`)
        );
        console.log("response", response.data.product);
        if (response) {
          setProductData({
            name: "",
            price: "",
            discount: "",
            description: "",
            productDetails: "",
          });

          close();
          setMsg("Add Product successfully!");
          setProduct((prevProducts) => [
            ...prevProducts,
            response.data.product,
          ]);
          setLoading(false);
        }
      } catch (err) {
        console.error("failed to add product details!", err);
      }
    }
  };

  

  useEffect(() => {
    if (productData.name === "") {
      setNameErr("product name is required!");
    } else {
      setNameErr("");
    }
  }, [productData.name]);

  useEffect(() => {
    if (productData.price === "") {
      setPriceErr("product price is required!");
    } else {
      setPriceErr("");
    }
  }, [productData.price]);

  useEffect(() => {
    if (productData.discount === "") {
      setDiscountErr("product discount is required!");
    } else {
      setDiscountErr("");
    }
  }, [productData.discount]);

  useEffect(() => {
    if (productData.description === "") {
      setDescErr("product description is required!");
    } else {
      setDescErr("");
    }
  }, [productData.description]);

  useEffect(() => {
    if (productData.productDetails === "") {
      setDetailErr("product productDetails is required!");
    } else {
      setDetailErr("");
    }
  }, [productData.productDetails]);

 

  return (
    <>
      <Modal opened={opened} onClose={close} title="Product Details">
        <form onSubmit={handlerSubmit}>
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
              value={productData.name}
              onChange={handleChange}
            />
            {nameErr && <div className="text-danger">{nameErr}</div>}
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
              value={productData.price}
              onChange={handleChange}
            />
            {priceErr && <div className="text-danger">{priceErr}</div>}
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
              value={productData.discount}
              placeholder="Enter product discount"
              onChange={handleChange}
            />
            {discountErr && <div className="text-danger">{discountErr}</div>}
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
              placeholder="Enter product discription"
              value={productData.description}
              onChange={handleChange}
            />
            {descErr && <div className="text-danger">{descErr}</div>}
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
              value={productData.productDetails}
              onChange={handleChange}
            />
            {detailErr && <div className="text-danger">{detailErr}</div>}
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </Modal>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-outline-primary me-5"
          onClick={open}
        >
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {msg.length > 0 ? (
            <Result
              status="success"
              title={msg && <div className="text-success">{msg}</div>}
            />
          ) : (
            ""
          )}
        </>
      )}

      <div className="mx-3 my-3 px-3 py-3">
        <ProductDetails />
      </div>
      
    </>
  );
}

export default Demo;
