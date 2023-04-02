class Api::PostsController < ApplicationController

  def index
    if params[:post] && params[:post][:author_id]
      @posts = Post.where(author_id: params[:post][:author_id])
    else
      @posts = Post.all
      puts @posts
    end
    if @posts.length > 0
      render :index
    else
      render json: ["Posts not found"], status: 404
    end
  end

  def show
    @post = Post.find(params[:id])
    if @post
      render :show
    else
      render json: ["Post not found"], status: 404
    end
  end

  def create
    @post = Post.new({
      author_id: params[:post][:author_id],
      location: params[:post][:location],
      caption: params[:post][:caption]
    })
    if @post.save
      images = params[:post][:images]
      if images
        i = 0
        while i < images.keys.length
          @post.images.attach(io: images["#{i}"], filename:"#{@post.id}-#{i}")
          i += 1
        end
      end
      render :show
    else
      render json: ["Could not create post"], status: 400
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post
      @post.update(post_params)
      render :show
    else
      render json: ["Could not update post"], status: 400
    end
  end

  def destroy
    post = Post.find(params[:id])
    if post
      if post.images.attached?
        post.images.purge
      end
      # post.likes.each { |like| like.delete}
      # post.comments.each { |comment| comment.delete}
      post.delete
      render json: ["Post deleted"], status: 200
    else
      render json: ["Could not delete post"], status: 400
    end
  end

  def post_params
    params.require(:post).permit(:author_id, :caption, :location, :images)
  end
end
