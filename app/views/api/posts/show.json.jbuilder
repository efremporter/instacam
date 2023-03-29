json.set! @post.id do
  json.extract! @post, :id, :caption, :location
end