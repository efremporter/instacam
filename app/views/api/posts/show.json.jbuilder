json.set! @post.id do
  json.extract! @post, :id, :caption, :location
  images = []
  @post.images.each do |image|
    images << url_for(image)
  end
  json.photoUrls do 
    json.array! images
  end
end