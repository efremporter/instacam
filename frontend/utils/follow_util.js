export const fetchFollows = userId => {
  return $.ajax({
    method: 'GET',
    url: '/api/follows',
    data: {
      follow: {
        user_id: userId
      }
    }
  });
};

export const fetchFollow = (userId, followingId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/follows`,
    data: {
      follow: {
        user_id: userId,
        following_id: followingId
      }
    }
  });
};

export const createFollow = (userId, followingId) => {
  return $.ajax({
    method: 'POST',
    url: 'api/follows',
    data: {
      follow: {
        user_id: userId,
        following_id: followingId
      }
    }
  });
};

export const deleteFollow = id => {
  // console.log('hey'); app breaks without this line, even edited out??? wierdest bug ever
  return $.ajax({
    method: 'DELETE',
    url: `/api/follows/${id}`
  });
};