# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo_user = User.create({
  email: "demo@user.com",
  name: "Demo User",
  handle: "demouser",
  bio: "Hey I'm the demo user, welcome to my profile",
  password: "password123!"
})

sample_user_1 = User.create({
  email: "sample1@user.com",
  name: "Arnold Poole",
  handle: "ap",
  bio: "Yoooooo go dubs",
  password: "easy123"
})

demo_user.profile_photo.attach(io: File.open("app/assets/images/blank_profile_photo.jpg"), filename: "square.webp")
sample_user_1.profile_photo.attach(io: File.open("app/assets/images/blank_profile_photo.jpg"), filename: "square.webp")

post_1 = Post.create({author_id: 1, caption: 'check out this melon', location: 'istanbul'})
post_1.images.attach(io: File.open("app/assets/images/post_2_hey_friends.jpg"), filename: "square.webp")
post_1.images.attach(io: File.open("app/assets/images/post_1_hot_dog.jpg"), filename: "square.webp")


post_2 = Post.create({author_id: 1, caption: 'hey there my friends', location: 'somewhere over the rainbow'})
post_2.images.attach(io: File.open("app/assets/images/post_2_hey_friends.jpg"), filename: "square.webp")
# change above line back to 2 after styling postShow
post_3 = Post.create({author_id: 1, caption: 'omg look at this hot dog', location: 'Top Dog'})
post_3.images.attach(io: File.open("app/assets/images/post_3_melon.png"), filename: "square.webp")

post_4 = Post.create({author_id: 1, caption: 'grandma shoes for the day', location: 'Rome'})
post_4.images.attach(io: File.open("app/assets/images/post_4_grandma_shoes.png"), filename: "square.webp")

post_5 = Post.create({author_id: 1, caption: 'i am looking for a pregnant animal', location: 'urgent'})
post_5.images.attach(io: File.open("app/assets/images/post_5_pregnant_animal.jpg"), filename: "square.webp")

post_6 = Post.create({author_id: 1, caption: 'I bet you can not guess where this is', location: 'Unknown'})
post_6.images.attach(io: File.open("app/assets/images/post_6_guess_where.jpg"), filename: "square.webp")

post_7 = Post.create({author_id: 1, caption: 'lolipop by lil wayne', location: '2006?'})
post_7.images.attach(io: File.open("app/assets/images/post_7_lil_wayne.jpg"), filename: "square.webp")

post_8 = Post.create({author_id: 1, caption: 'My teacher used to play Party in the USA every morning', location: '4th grade'})
post_8.images.attach(io: File.open("app/assets/images/post_8_miley_cyrus.jpg"), filename: "square.webp")

post_9 = Post.create({author_id: 1, caption: 'finally we have reached the 9th post', location: 'yay'})
post_9.images.attach(io: File.open("app/assets/images/post_9_final_post.jpg"), filename: "square.webp")