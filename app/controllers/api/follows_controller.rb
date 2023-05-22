class Api::FollowsController < ApplicationController
  def index
    @follows = Follow.where(user_id: params[:follow][:user_id])
    render :index
  end

  def show
    follow_arr = Follow.where(
      user_id: params[:follow][:user_id], 
      following_id: params[:follow][:following_id]
    )
    if follow_arr.length > 0
      @follow = follow_arr[0]
      render :show
    else
      render json: ["Follow not found"], status: 404
    end
  end

  def create
    @follow = Follow.new({
      user_id: params[:follow][:user_id],
      following_id: params[:follow][:following_id]
    })
    if @follow.save
      render :show
    else
      render json: ["Could not create follow"], status: 400
    end
  end

  def destroy
    follow = Follow.find(params[:id])
    if follow
      follow.delete
      render json: ["Follow removed"], status: 200
    else
      render json: ["Could not remove follow (id == nil?)"], status: 400
    end
  end

  def follow_params
    params.require(:follow).permit(:user_id, :friend_id)
  end

end
