class Follow < ApplicationRecord
  validates :user_id, presence: true
  validates :following_id, presence: true
  validates :user_id, uniqueness: { scope: [:following_id] }

  belongs_to :user, foreign_key: :user_id
end
