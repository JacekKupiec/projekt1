class ArticlesController < ApplicationController
  def new
    @article = Article.new

  end

  def create
    #tak nie mzna bo musimy określić dokładnie jakie parametry przesylamy.
    #@artile = Article.new(params[:article])
    #@article.save
    #redirec_to @article

    @article = Article.new(article_params)
    if @article.save
      redirect_to @article
    else
      render 'new'
    end
  end

  def show
    @article = Article.find params[:id]
    if request.xhr?
      render :json => {:status => "ok", :title => @article.title, :text => @article.text}
    end
  end

  def edit
    @article = Article.find(params[:id])

    if request.xhr?
      render :json => {:status => "ok"}
    end
  end

  def index
    @articles = Article.all
  end

  def update
    @article = Article.find(params[:id])


    if @article.update(article_params)
      if request.xhr?
        render :json => {:status => "ok"}
      else
        redirect_to @article
      end
    else
      if request.xhr?
        errors = String.new

        @article.errors.full_messages.each do |msg| errors += "<br/>" + msg end

        render :json => {:status => "fail", :err_num => @article.errors.count, :err_msg => errors.to_s}
      else
        render 'edit'
      end
    end
  end

  def destroy
    @article = Article.find params[:id]
    @article.destroy
    #redirect_to articles_path
    render :json => {:status => "ok"}

  end

  private
  def article_params
    params.require(:article).permit(:title, :text)
  end
end
