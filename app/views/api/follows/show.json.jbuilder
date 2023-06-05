json.set! "#{@follow.user_id}#{@follow.following_id}" do
  json.extract! @follow, :id, :user_id, :following_id
end