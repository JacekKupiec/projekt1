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
      if @article.update(article_params)
        if @article.errors.any?
          bledy = ""
          @article.errors.each do |e|
              bledy += "<br/>" + e.to_s
          end
          render :json => { :status => "fail", :bledy => bledy }
        end
      else
        render :json => { :status => "ok"}
      end
    end
  end

  def index
    @articles = Article.all
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render 'edit'
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
