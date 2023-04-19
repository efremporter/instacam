export const fetchLikes = (userId, postId) => {
  const postIdOrUserId = postId ? postId : userId;
  return $.ajax({
    method: 'GET',
    url: `/api/likes`,
    data: { like: {
      [postId ? 'post_id' : 'user_id']: postIdOrUserId
    } }
  });
};

export const fetchLike = (userId, postId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/likes`,
    data: {
      like: {
        user_id: userId,
        post_id: postId
      }
    }
  });
};

export const createLike = (userId, postId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/likes`,
    data: {
      like: {
        post_id: postId,
        user_id: userId
      }
    }
  });
};

export const deleteLike = id => {
  console.log(id)
  return $.ajax({
    method: 'DELETE',
    url: `/api/likes/${id}`
  });
};