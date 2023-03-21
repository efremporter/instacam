class Api::UsersController < ApplicationController
  # before_action :require_logged_in, only: [:update]

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in!(@user)
      render "api/users/_user.json.jbuilder"
    else
      errors = []
      if User.exists?(email: params[:user][:email]) 
        errors.push('Email already exists')
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
        @user.update(user_params)
        # render "api/users/_user.json.jbuilder"
    else  
      render json: ["Couldn't update user (User not found)"], status: 404
    end
  end

  def destroy
    user = User.find(params[:id])
    if user
      # destroy posts associated with user
      # destroy follows associated with user
      # destroy likes associated with user
      user.delete
      render json: ["User deleted"], status: 200
    else
      render json: ["User not found"], status: 404
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
