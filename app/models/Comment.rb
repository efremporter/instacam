class Comment < ApplicationRecord
  validates :user_id, presence: true
  validates :post_id, presence: true
  validates :content, presence: true

  belongs_to :user, foreign_key: :user_id
  belongs_to :post, foreign_key: :post_id
end