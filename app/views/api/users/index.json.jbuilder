@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :email, :name, :handle, :bio
    json.profilePhotoUrl url_for(user.profile_photo)
  end
end