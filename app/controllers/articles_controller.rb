class ArticlesController < ApplicationController
  def new
  end

  def create
    #tak nie mzna bo musimy określić dokładnie jakie parametry przesylamy.
    #@artile = Article.new(params[:article])
    #@article.save
    #redirec_to @article

    @article = Article.new(article_params)
    @article.save
    redirect_to @article
  end

  def show
    @article = Article.find params[:id]
  end

  def index
    @articles = Article.all
  end

  private
  def article_params
    params.require(:article).permit(:title, :text)
  end
end
