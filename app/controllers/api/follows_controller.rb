class Api::FollowsController < ApplicationController
  def index
    user_id = params[:follow][:user_id]
    following_id = params[:follow][:following_id]
    if user_id && following_id
      @follow = Follow.find_by(user_id: user_id, following_id: following_id)
      if @follow
        render :show
      else 
        render json: ["Follow not found"], status: 404
      end
    elsif user_id
      @follows = Follow.where(user_id: user_id)
      render :index
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
    params.require(:follow).permit(:user_id, :following_id)
  end

end
