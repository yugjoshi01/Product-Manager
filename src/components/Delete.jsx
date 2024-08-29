import { message, Popconfirm } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import deleteImg from "../assets/images/deleteImg.jpg";
import { BASE_URL } from '../constent';

function Delete({product,onDeleteProductUpdate}) {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const confirm = async(e) => {
    try{
      let response= await axios.delete(`${BASE_URL}/product/delete/${product._id}`,
      (axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`)
    );
    if(response.data.statusCode===200){
      message.success('product is deleted successfully!');
      renderProductList()
    }
      
    }catch(err){
      console.error("data was not deleted");
      
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
      
      onDeleteProductUpdate(res.data.data.product);

      
    } catch (err) {
      console.error("product list render failed!", err);
    }
  };
  
  useEffect(() => {
    renderProductList();
  },[]);
  

  const cancel = (e) => {
    console.log(e);
    message.error('product deletion is cancelled!');
  };
  

  return (
    <>
     <Popconfirm
    title="Delete the product"
    description="Are you sure to delete this product?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Delete"
    cancelText="Cancel"
   >
    <img src={deleteImg} alt="deleteImg" height={45} className='ps-3' style={{cursor:"pointer"}} />
    </Popconfirm>
    </>
  )
}

export default Delete