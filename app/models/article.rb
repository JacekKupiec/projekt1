class Article < ActiveRecord::Base
  validates :title, presence: ture, length: {minimum: 5}
end
