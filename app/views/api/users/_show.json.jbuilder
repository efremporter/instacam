@user ||= user
json.extract! @user, :id, :email, :name, :handle, :bio
json.profilePhotoUrl url_for(@user.profile_photo)