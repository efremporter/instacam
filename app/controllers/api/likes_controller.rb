class Api::LikesController < ApplicationController

  def index
    post_id = params[:like][:post_id]
    user_id = params[:like][:user_id]
    if user_id && post_id
      # There can only be one like for each [user_id, post_id] combo
      @like = Like.find_by(user_id: user_id, post_id: post_id)
      if @like
        render :show
      else
        render json: ["Could not find like"], status: 404
      end
    elsif post_id && user_id == nil
      @likes = Like.where(post_id: post_id)
    elsif user_id && post_id == nil
      @likes = Like.where(user_id: user_id)
    else 
      render json: ["Bad request (user_id && post_id are nil)"], status: 400
    end
    render :index
  end

  def show
    @like = Like.find(params[:id])
    if @like
      render :show
    else
      render json: ["Like not found (id == nil?)"], status: 404
    end
  end

  def create
    user_id = params[:like][:user_id]
    post_id = params[:like][:post_id]
    if user_id && post_id
      @like = Like.new(user_id: user_id, post_id: post_id)
      if @like.save
        render :show
      else
        render json: ["Could not create like"], status: 400
      end
    else
      render json: ["Could not create like (user_id or post_id is nil)"], status: 400
    end
  end

  def destroy
    like = Like.find(params[:id])
    if like
      like.delete
      render json: ["Like removed"], status: 200
    else
      render json: ["Could not remove like (id == nil?)"], status: 400
    end
  end

  def like_params
    params.require(:like).permit(:user_id, :post_id)
  end
end
