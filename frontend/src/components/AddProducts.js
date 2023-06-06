import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProducts = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [notif, setNotif] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Conent-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      setNotif(error.response.data.msg);
    }
  };
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <h1 className="has-text-danger">{notif}</h1>

        <form className="field" onSubmit={saveProduct}>
          <label className="label">Product Name</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product Name"
            />
          </div>
          <label className="label">Image</label>
          <div className="file">
            <label className="flie-label">
              <input type="file" className="file-input" onChange={loadImage} />
              <span className="file-cta">
                <span className="file-label">Choose a file...</span>
              </span>
            </label>
          </div>
          {preview ? (
            <figure className="image is-128x128 mt-3">
              <img src={preview} alt="Preview image" />
            </figure>
          ) : (
            ""
          )}
          <div className="field mt-3">
            <div className="control">
              <button type="submit" className="button is-success">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
