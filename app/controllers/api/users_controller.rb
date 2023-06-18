class Api::UsersController < ApplicationController
  before_action :require_signed_in, only: [:update]

  def index 
    if params[:user] && params[:user][:author_ids].length > 0
      author_ids = params[:user][:author_ids]
      @users = []
      author_ids.each do |id|
        user = User.find(id)
        if user
          @users << user
        end
      end
      render "api/users/index.json.jbuilder"
    else
      errors = []
      errors.push('Users not found')
      render json: errors, status: 404
    end
  end

  def show
    @user = User.find(params[:id])
    if @user
      render "api/users/_show.json.jbuilder"
    else
      errors = []
      errors.push('User not found')
      render json: errors, status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.profile_photo.attach(io: File.open("app/assets/images/blank_profile_photo.jpg"), filename: "square.webp")
      sign_in!(@user)
      render "api/users/_show.json.jbuilder"
    else
      errors = []
      if User.exists?(email: params[:user][:email])
        errors.push('Email already exists')
      end
      if User.exists?(handle: params[:user][:handle])
        errors.push('Username already exists')
      end
      if (params[:user][:password].length < 6 || params[:user][:password].length > 30) 
        errors.push('Password must be between 6 and 30 characters')
      end
      render json: errors, status: 400
    end
  end

  def update 
    @user = User.find(params[:id])
    if @user
      if params[:user] && params[:user][:profile_photo_url]
        @user.profile_photo.purge
        @user.profile_photo.attach(params[:user][:profile_photo_url])
      else
        @user.update(user_params)
      end
      render "api/users/_show.json.jbuilder"
    else  
      render json: ["Couldn't update user (User not found)"], status: 404
    end
  end

  def destroy
    user = User.find(params[:id])
    if user
      user.posts.each { |post| post.destroy}
      user.likes.each { |like| like.destroy}
      user.comments.each { |comment| comment.destroy}
      user.follows.each { |follow| follow.destroy}
      user.followers.each { |follower| follower.destroy}
      user.profile_photo.purge
      sign_out!(user)
      user.delete
      render json: ["User deleted"], status: 200
    else
      render json: ["User not found"], status: 404
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :name, :handle, :password, :author_ids, :profile_photo_url)
  end
end
