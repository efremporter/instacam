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
User.all.each { |user| user.destroy}
# User.destroy_all

users = []

demo_user = User.create({
  email: "demo@user.com",
  name: "Demo User",
  handle: "demouser",
  bio: "Hey I'm the demo user, please keep photos & captions PG",
  password: "password123!"
})

sample_user_1 = User.create({
  email: "sample1@user.com",
  name: "Jordan Poole",
  handle: "jp",
  bio: "Yoooooo go dubs",
  password: "easy123$%#"
})

sample_user_2 = User.create({
  email: "sample2@user.com",
  name: "Dwayne Johnson",
  handle: "dj",
  bio: "The rock is cookin",
  password: "easy123$%#"
})

sample_user_3 = User.create({
  email: "sample3@user.com",
  name: "Hello Panda",
  handle: "yumsnack",
  bio: "Mmmmmmm",
  password: "easy123$%#"
})

sample_user_4 = User.create({
  email: "sample4@user.com",
  name: "Steve Jobs",
  handle: "stevejobs",
  bio: "R.I.P",
  password: "easy123$%#"
})

sample_user_5 = User.create({
  email: "sample5@user.com",
  name: "Waka Flocka",
  handle: "flockaflame",
  bio: "YEAAAAAAAAHHHHHHH",
  password: "easy123$%#"
})

sample_user_6 = User.create({
  email: "sample6@user.com",
  name: "Grandmother",
  handle: "grammy",
  bio: "Coooookiieeees",
  password: "easy123$%#"
})

sample_user_7 = User.create({
  email: "sample7@user.com",
  name: "Jimmy Butler",
  handle: "himmybuckets",
  bio: "Will we win game 3?",
  password: "easy123$%#"
})

sample_user_8 = User.create({
  email: "sample8@user.com",
  name: "greatreggaeband",
  handle: "Groundation",
  bio: "I just found this band recently, great music",
  password: "easy123$%#"
})

sample_user_9 = User.create({
  email: "sample9@user.com",
  name: "Arnold Palmer",
  handle: "arnoldpalmer",
  bio: "I think this guy was a golfer? Great drink tho",
  password: "easy123$%#"
})

sample_user_10 = User.create({
  email: "sample10@user.com",
  name: "Jhene Aiko",
  handle: "jhene",
  bio: "I make good music",
  password: "easy123$%#"
})

users.push(
  demo_user,  sample_user_1, sample_user_2, sample_user_3, sample_user_4, 
  sample_user_5, sample_user_6, sample_user_7, sample_user_8,
  sample_user_9, sample_user_10
)

default_photo = "app/assets/images/blank_profile_photo.jpg"
users.each do |user|
  user.profile_photo.attach(io: File.open(default_photo), filename: "square.webp")
end

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

img_path = 'app/assets/images/demo_user_photos'
demo_post_1 = Post.create({author_id: 1, caption: 'omg look at this hot dog', location: 'istanbul'})
demo_post_1.images.attach(io: File.open(`#{img_path}/post_1_hot_dog.jpg`), filename: "square.webp")
demo_post_1.images.attach(io: File.open(`#{img_path}/post_2_hey_friends.jpg`), filename: "square.webp")

demo_post_2 = Post.create({author_id: 1, caption: 'hey there my friends', location: 'somewhere over the rainbow'})
demo_post_2.images.attach(io: File.open(`#{img_path}/post_2.jpg`), filename: "square.webp")

demo_post_3 = Post.create({author_id: 1, caption: 'check out this melon', location: 'Top Dog'})
demo_post_3.images.attach(io: File.open(`#{img_path}/post_3.png`), filename: "square.webp")

demo_post_4 = Post.create({author_id: 1, caption: 'grandma shoes for the day', location: 'Rome'})
demo_post_4.images.attach(io: File.open(`#{img_path}/post_4.png`), filename: "square.webp")

demo_post_5 = Post.create({author_id: 1, caption: 'i am looking for a pregnant animal', location: 'urgent'})
demo_post_5.images.attach(io: File.open(`#{img_path/}post_5.jpg`), filename: "square.webp")

demo_post_6 = Post.create({author_id: 1, caption: 'I bet you can not guess where this is', location: 'Unknown'})
demo_post_6.images.attach(io: File.open(`#{img_path}/post_6.jpg`), filename: "square.webp")

demo_post_7 = Post.create({author_id: 1, caption: 'lolipop by lil wayne', location: '2006?'})
demo_post_7.images.attach(io: File.open(`#{img_path}/post_7.jpg`), filename: "square.webp")

demo_post_8 = Post.create({author_id: 1, caption: 'My teacher used to play Party in the USA every morning', location: '4th grade'})
demo_post_8.images.attach(io: File.open(`#{img_path}/post_8.jpg`), filename: "square.webp")

demo_post_9 = Post.create({author_id: 1, caption: 'finally we have reached the 9th post', location: 'yay'})
demo_post_9.images.attach(io: File.open(`#{img_path}/post_9.jpg`), filename: "square.webp")

img_path = 'app/assets/images/user_1_photos'
1_post_1 = Post.create({author_id: 2, caption: 'headshot', location: 'studio'})
1_post_1.images.attach(io: File.open(`#{img_path}/post_1.webp`), filename: "square.webp")

1_post_2 = Post.create({author_id: 2, caption: 'cheeeeeeese', location: 'unis are drriiiip'})
1_post_2.images.attach(io: File.open(`#{img_path}/post_2.jpeg`), filename: "square.webp")

1_post_3 = Post.create({author_id: 2, caption: 'I just broke him over there', location: 'Ankles lost'})
1_post_3.images.attach(io: File.open(`#{img_path}/post_3.webp`), filename: "square.webp")

1_post_4 = Post.create({author_id: 2, caption: 'Call me later', location: 'Hotline bling'})
1_post_4.images.attach(io: File.open(`#{img_path}/post_4.webp`), filename: "square.webp")

1_post_5 = Post.create({author_id: 2, caption: 'flexed on em', location: 'poole party'})
1_post_5.images.attach(io: File.open(`#{img_path}/post_5.jpeg`), filename: "square.webp")

1_post_6 = Post.create({author_id: 2, caption: 'Lightskin face', location: 'Chase Center'})
1_post_6.images.attach(io: File.open(`#{img_path}/post_6.webp`), filename: "square.webp")

1_post_7 = Post.create({author_id: 2, caption: 'JP for threeeeeee', location: 'Giving out buckets 4 free'})
1_post_7.images.attach(io: File.open(`#{img_path}/post_7.webp`), filename: "square.webp")

1_post_8 = Post.create({author_id: 2, caption: 'Lil warmup flick', location: 'Gold blooded'})
1_post_8.images.attach(io: File.open(`#{img_path}/post_8.jpeg`), filename: "square.webp")

1_post_9 = Post.create({author_id: 2, caption: 'Yeah I can play the piano too', location: 'LA arena logo'})
1_post_9.images.attach(io: File.open(`#{img_path}/post_9.jpeg`), filename: "square.webp")

# 2_post_1 = Post.create({author_id: 3, caption: '', location: ''})