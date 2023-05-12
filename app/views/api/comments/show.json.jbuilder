json.set! @comment.id do
  json.extract! @comment, :id, :user_id, :post_id, :content
end