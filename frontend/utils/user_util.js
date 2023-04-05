export const fetchUsers = authorIds => {
  console.log(authorIds)
  return $.ajax({
    method: 'GET',
    url: `/api/users`,
    data: {
      user: { author_ids: authorIds}
    }
  });
};

export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  });
};

export const updateUser = user => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: {user}
  });
};

export const deleteUser = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/users/${id}`
  });
};