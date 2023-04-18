@likes.each do |like|
  json.set! like.user_id + like.post_id do
    json.extract! like, :id, :user_id, :post_id
  end
end