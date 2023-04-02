json.set! @post.id do
  json.extract! @post, :id, :caption, :location, :created_at
  images = []
  @post.images.each do |image|
    images << url_for(image)
  end
  json.imageUrls do 
    json.array! images
  end
end