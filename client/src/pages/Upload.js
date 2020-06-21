import React from "react";

const Upload = () => {
  return (
    <article className="upload">
      <form className="upload--form">
        <h1>UPLOAD</h1>
        <div>
          Image: <input type="file" name="imageFile" />
        </div>
        <div>
          Title: <input type="text" name="title" placeholder="title" />
        </div>
        <div>
          Description:{" "}
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </form>
    </article>
  );
};

export default Upload;
