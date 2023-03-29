class Post < ApplicationRecord
  validates :author_id, presence: true

  # has_many :likes
  # has_many_attached :images
end