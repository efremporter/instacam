class Api::FollowersController < ApplicationController
  def index
    user_id = params[:follower][:user_id]
    follower_id = params[:follower][:follower_id]
    if user_id && follower_id
      @follower = Follower.find_by(user_id: user_id, follower_id: follower_id)
      if @follower
        render :show
      else
        render json: ["Follower not found"], status: 404
      end
    elsif user_id
      @followers = Follower.where(user_id: user_id)
      render :index
    elsif follower_id
      @followers = Follower.where(follower_id: follower_id)
      render :index;
    end
  end

  def create
    @follower = Follower.new({
      user_id: params[:follower][:user_id],
      follower_id: params[:follower][:follower_id]
    })
    if @follower.save
      render :show
    else
      render json: ["Could not create follower"], status: 400
    end
  end

  def destroy
    follower = Follower.find(params[:id])
    if follower
      follower.delete
      render json: ["Follow removed"], status: 200
    else
      render json: ["Could not remove follower (id == nil?)"], status: 400
    end
  end

  def follower_params
    params.require(:follower).permit(:user_id, :friend_id)
  end
end
