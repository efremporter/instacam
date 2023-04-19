class Like < ApplicationRecord
  validates :user_id, presence: true
  validates :post_id, presence: true
  validates :user_id, uniqueness: { scope: [:post_id] }

  belongs_to :user, foreign_key: :user_id
  belongs_to :post, foreign_key: :post_id
end