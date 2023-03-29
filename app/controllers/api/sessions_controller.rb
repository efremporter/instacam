class Api::SessionsController < ApplicationController
  before_action :require_signed_in, only: [:destroy]

  def create
    if params[:user][:email]
      @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    elsif params[:user][:handle]
      user = User.find_by(handle: params[:user][:handle])
      if user
        @user = User.find_by_credentials(user[:email], params[:user][:password])
      end
    end
    if @user
      sign_in!(@user)
      render "api/sessions/show.json.jbuilder"
    else
      errors = []
      if (User.exists?(email: params[:user][:email]))
        errors.push('Invalid email/password combination')
      else
        errors.push('User does not exist')
      end
      render json: errors, status: 404
    end
  end

  def destroy
    sign_out!
  end
  
end
