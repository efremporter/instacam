export const fetchUsers = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/users`
  });
};

export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/user/${id}`
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