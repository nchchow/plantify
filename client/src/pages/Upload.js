import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageChange = (event) => {
    // console.log(event.target.files[0]);
    setImage(event.pop());
    // setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(image);
    const formData = new FormData();
    formData.append("image", image);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/api/uploads", formData, config)
      .then(console.log)
      .catch((err) => console.log(err));
  };

  return (
    <article className="upload">
      <form className="upload--form" onSubmit={handleSubmit}>
        <h1>UPLOAD</h1>
        <div>
          <ImageUploader
            withIcon={true}
            buttonText="Choose an iamge"
            onChange={handleImageChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5 * 1024 * 1024}
            withPreview={true}
            name="image"
          />
        </div>
        <div>
          Title:{" "}
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Description:{" "}
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={handleDescriptionChange}
          ></textarea>
        </div>
        <button>submit</button>
      </form>
    </article>
  );
};

export default Upload;
