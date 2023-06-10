class Follower < ApplicationRecord
  validates :user_id, presence: true
  validates :follower_id, presence: true
  validates :user_id, uniqueness: { scope: [:follower_id] }

  belongs_to :user, foreign_key: :user_id
end
