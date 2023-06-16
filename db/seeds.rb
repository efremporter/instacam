# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Like.destroy_all
Comment.destroy_all
Follow.destroy_all
Follower.destroy_all
Post.destroy_all
User.destroy_all

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

sample_user_2 = User.create({
  email: "sample2@user.com",
  name: "Dwayne Johnson",
  handle: "dj",
  bio: "The rock is cookin",
  password: "easy123"
})

sample_user_3 = User.create({
  email: "sample3@user.com",
  name: "Hello Panda",
  handle: "yumsnack",
  bio: "Mmmmmmm",
  password: "easy123"
})

sample_user_4 = User.create({
  email: "sample4@user.com",
  name: "Steve Jobs",
  handle: "stevejobs",
  bio: "R.I.P",
  password: "easy123"
})

sample_user_5 = User.create({
  email: "sample5@user.com",
  name: "Wacka Flacka",
  handle: "flackaflame",
  bio: "YEAAAAAAAAHHHHHHH",
  password: "easy123"
})

sample_user_6 = User.create({
  email: "sample6@user.com",
  name: "Grandmother",
  handle: "grammy",
  bio: "Coooookiieeees",
  password: "easy123"
})

sample_user_7 = User.create({
  email: "sample7@user.com",
  name: "Jimmy Butler",
  handle: "himmybuckets",
  bio: "Will we win game 3?",
  password: "easy123"
})

sample_user_8 = User.create({
  email: "sample8@user.com",
  name: "greatreggaeband",
  handle: "Groundation",
  bio: "I just found this band recently, great music",
  password: "easy123"
})

sample_user_9 = User.create({
  email: "sample9@user.com",
  name: "Arnold Palmer",
  handle: "arnoldpalmer",
  bio: "I think this guy was a golfer? Great drink tho",
  password: "easy123"
})

sample_user_10 = User.create({
  email: "sample10@user.com",
  name: "Water bottle",
  handle: "crystalgeyser",
  bio: "A bottle was sitting on my speaker :D",
  password: "easy123"
})

default_photo = "app/assets/images/blank_profile_photo.jpg"
demo_user.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_1.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_2.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_3.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_4.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_5.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_6.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_7.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_8.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_9.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
sample_user_10.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")


users = [];
users << sample_user_1
users << sample_user_2
users << sample_user_3
users << sample_user_4
users << sample_user_5
users << sample_user_6
users << sample_user_7
users << sample_user_8
users << sample_user_9
users << sample_user_10


i = 0;
while i < users.length - 1
  j = i + 1;
  while j < users.length
    Follow.create({
      user_id: users[i].id,
      following_id: users[j].id
    })
    Follower.create({
      user_id: users[j].id,
      follower_id: users[i].id
    })
    if i % 2 == 0
      Follow.create({
        user_id: users[j].id,
        following_id: users[i].id
      })
      Follower.create({
        user_id: users[i].id,
        follower_id: users[j].id
      })
    end
    j += 1;
  end
  i += 1;
end

Follow.create({user_id: 1, following_id: 2})
Follower.create({user_id: 2, follower_id: 1})

post_1 = Post.create({author_id: 1,
caption: 'omg look at this hot dogomg look at this hot dogomg look at this hot dogomg look at this hot dogomg look at this hot dog',
location: 'istanbul'})
post_1.images.attach(io: File.open("app/assets/images/post_1_hot_dog.jpg"), filename: "square.webp")
post_1.images.attach(io: File.open("app/assets/images/post_2_hey_friends.jpg"), filename: "square.webp")


post_2 = Post.create({author_id: 1, caption: 'hey there my friends', location: 'somewhere over the rainbow'})
post_2.images.attach(io: File.open("app/assets/images/post_2_hey_friends.jpg"), filename: "square.webp")
# change above line back to 2 after styling postShow

post_3 = Post.create({author_id: 1, caption: 'check out this melon', location: 'Top Dog'})
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