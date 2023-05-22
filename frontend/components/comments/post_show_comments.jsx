import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

function PostShowComments() {
  const dispatch = useDispatch();
  const comments = useSelector(state => Object.values(state.entities.comments));
  

};

export default PostShowComments;