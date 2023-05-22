class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :handle, presence: true, uniqueness: true, length: { minimum: 1, maximum: 30, allow_nil: false }
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, maximum: 30, allow_nil: true }

  has_many :posts, foreign_key: :author_id
  has_many :likes, foreign_key: :user_id
  has_many :follows, foreign_key: :user_id
  has_one_attached :profile_photo

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    @user = User.find_by(email: email)
    return nil unless @user
    @user.is_valid_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end 

  def is_valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.base64
  end
end