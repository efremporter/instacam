export const fetchFollowers = userId => {
  return $.ajax({
    method: 'GET',
    url: '/api/followers',
    data: {
      follower: {
        user_id: userId
      }
    }
  });
};

export const fetchFollower = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/followers`,
    data: {
      follower: {
        user_id: userId,
        follower_id: followerId
      }
    }
  });
};

export const createFollower = (userId, followerId) => {
  return $.ajax({
    method: 'POST',
    url: 'api/followers',
    data: {
      follower: {
        user_id: userId,
        follower_id: followerId
      }
    }
  });
};

export const deleteFollower = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/followers/${id}`
  });
};