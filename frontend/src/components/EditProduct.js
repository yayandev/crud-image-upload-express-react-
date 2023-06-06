import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/products/${id}`);
    setTitle(response.data.name);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Conent-type": "multipart/form-data",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form className="field" onSubmit={updateProduct}>
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
