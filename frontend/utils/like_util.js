export const fetchLikes = (user_id, post_id) => {
  const postIdOrUserId = post_id ? post_id : user_id;
  return $.ajax({
    method: 'GET',
    url: `/api/likes`,
    data: { like: {
      [post_id ? 'post_id' : 'user_id']: postIdOrUserId
    } }
  });
};

export const fetchLike = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/likes/${id}`
  });
};

export const createLike = (user_id, post_id) => {
  return $.ajax({
    method: 'POST',
    url: `/api/likes`,
    data: { like: {
      post_id,
      user_id
    } }
  });
};

export const deleteLike = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/likes/${id}`
  });
};