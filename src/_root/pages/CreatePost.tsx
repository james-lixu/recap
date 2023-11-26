import React from "react";
import PostForm from "../forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={34}
            height={34}
            alt="post"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full text-raffia font-handlee underline">Upload a memory</h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;
