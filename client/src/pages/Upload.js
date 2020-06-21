import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

const Upload = (props) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleImageChange = (event) => setImage(event.pop());

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload image");
      return;
    }

    const formData = new FormData();
    formData.append("userId", "1"); // TODO: make dynamic logged in id
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/api/uploads", formData, config)
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="upload">
      <form className="upload--form" onSubmit={handleSubmit}>
        {!image && <h1 className="upload--form__heading">UPLOAD</h1>}
        <ImageUploader
          withIcon={true}
          buttonText="Choose an Image"
          onChange={handleImageChange}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5 * 1024 * 1024}
          name="image"
          withPreview={true}
        />
        <div className="upload--form__input-wrapper">
          Title:{" "}
          <input
            type="text"
            name="title"
            onChange={handleTitleChange}
            className="upload--form__title--input"
            required={true}
          />
        </div>
        <div className="upload--form__input-wrapper">
          Description:{" "}
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            onChange={handleDescriptionChange}
            className="upload--form__description--input"
            required={true}
          ></textarea>
        </div>
        <button className="upload--form__submit-button">Submit</button>
      </form>
    </article>
  );
};

export default Upload;
