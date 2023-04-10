class Post < ApplicationRecord
  validates :author_id, presence: true

  belongs_to :user, foreign_key: :author_id
  has_many :likes, foreign_key: :user_id
  # has_many :comments
  has_many_attached :images
end