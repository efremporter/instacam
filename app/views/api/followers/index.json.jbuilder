@followers.each do |follower|
  json.set! "#{follower.user_id}#{follower.follower_id}" do
    json.extract! follower, :id, :user_id, :follower_id
  end
end