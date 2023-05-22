class Follow < ApplicationRecord
  validates :user_id, presence: true
  validates :friend_id, presence: true
  validates :user_id, uniqueness: { scope: [:friend_id] }

  belongs_to :user, foreign_key: :user_id
end