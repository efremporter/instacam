class ApplicationController < ActionController::Base
  helper_method :current_user, :signed_in?
  skip_before_action :verify_authenticity_token

  def sign_in!(user)
    session[:session_token] = user.session_token
  end

  def sign_out!
    current_user.reset_session_token!
    session[:session_token] = nil
    return true;
  end

  def current_user
    return nil unless session[:session_token]

    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !current_user.nil?
  end
  
  def require_signed_out
    redirect_to user_url(current_user) if signed_in?
  end

  def require_signed_in
    redirect_to '/' unless signed_in?
  end
end
