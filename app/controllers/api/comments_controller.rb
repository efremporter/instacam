class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.where(post_id: params[:comment][:post_id])
    render :index
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render json: ["Could not create comment"], status: 400
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment
      @comment.update(comment_params)
      render :show
    else
      render json: ["Could not update comment"], status: 400
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment
      comment.delete
      render json: ["Comment deleted"], status: 200
    else
      render json: ["Could not delete comment"], status: 400
    end
  end 

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :content)
  end

end
