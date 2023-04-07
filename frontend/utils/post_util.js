export const fetchPosts = (authorId, currentUserId) => {
  return $.ajax({
    method: 'GET',
    url:`/api/posts`,
    data: { 
      post: { 
        author_id: authorId,
        current_user_id: currentUserId
      } 
    }
  });
};

export const fetchPost = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/posts/${id}`
  });
};

export const createPost = post => {
  return $.ajax({
    method: 'POST',
    url: `/api/posts`,
    data: post,
    processData: false,
    contentType: false
  });
};

export const updatePost = post => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/posts/${post.id}`,
    data: {post}
  });
};

export const deletePost = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/posts/${id}`
  });
};