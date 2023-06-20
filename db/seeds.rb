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

demo_post_1 = Post.create({author_id: 1, caption: 'omg look at this hot dog', location: 'istanbul'})
demo_post_1.images.attach(io: File.open('app/assets/images/demo_user_photos/post_1.jpg'), filename: "square.webp")
demo_post_1.images.attach(io: File.open('app/assets/images/demo_user_photos/post_2.jpg'), filename: "square.webp")

demo_post_2 = Post.create({author_id: 1, caption: 'hey there my friends', location: 'somewhere over the rainbow'})
demo_post_2.images.attach(io: File.open('app/assets/images/demo_user_photos/post_2.jpg'), filename: "square.webp")

demo_post_3 = Post.create({author_id: 1, caption: 'check out this melon', location: 'Top Dog'})
demo_post_3.images.attach(io: File.open('app/assets/images/demo_user_photos/post_3.png'), filename: "square.webp")

demo_post_4 = Post.create({author_id: 1, caption: 'grandma shoes for the day', location: 'Rome'})
demo_post_4.images.attach(io: File.open('app/assets/images/demo_user_photos/post_4.png'), filename: "square.webp")

demo_post_5 = Post.create({author_id: 1, caption: 'i am looking for a pregnant animal', location: 'urgent'})
demo_post_5.images.attach(io: File.open('app/assets/images/demo_user_photos/post_5.jpg'), filename: "square.webp")

demo_post_6 = Post.create({author_id: 1, caption: 'I bet you can not guess where this is', location: 'Unknown'})
demo_post_6.images.attach(io: File.open('app/assets/images/demo_user_photos/post_6.jpg'), filename: "square.webp")

demo_post_7 = Post.create({author_id: 1, caption: 'lolipop by lil wayne', location: '2006?'})
demo_post_7.images.attach(io: File.open('app/assets/images/demo_user_photos/post_7.jpg'), filename: "square.webp")

demo_post_8 = Post.create({author_id: 1, caption: 'My teacher used to play Party in the USA every morning', location: '4th grade'})
demo_post_8.images.attach(io: File.open('app/assets/images/demo_user_photos/post_8.jpg'), filename: "square.webp")

demo_post_9 = Post.create({author_id: 1, caption: 'finally we have reached the 9th post', location: 'yay'})
demo_post_9.images.attach(io: File.open('app/assets/images/demo_user_photos/post_9.jpg'), filename: "square.webp")

one_post_1 = Post.create({author_id: 2, caption: 'headshot', location: 'studio'})
one_post_1.images.attach(io: File.open('app/assets/images/user_1_photos/post_1.webp'), filename: "square.webp")

one_post_2 = Post.create({author_id: 2, caption: 'cheeeeeeese', location: 'unis are drriiiip'})
one_post_2.images.attach(io: File.open('app/assets/images/user_1_photos/post_2.jpeg'), filename: "square.webp")

one_post_3 = Post.create({author_id: 2, caption: 'I just broke him over there', location: 'Ankles lost'})
one_post_3.images.attach(io: File.open('app/assets/images/user_1_photos/post_3.webp'), filename: "square.webp")

one_post_4 = Post.create({author_id: 2, caption: 'Call me later', location: 'Hotline bling'})
one_post_4.images.attach(io: File.open('app/assets/images/user_1_photos/post_4.webp'), filename: "square.webp")

one_post_5 = Post.create({author_id: 2, caption: 'flexed on em', location: 'poole party'})
one_post_5.images.attach(io: File.open('app/assets/images/user_1_photos/post_5.jpeg'), filename: "square.webp")

one_post_6 = Post.create({author_id: 2, caption: 'Lightskin face', location: 'Chase Center'})
one_post_6.images.attach(io: File.open('app/assets/images/user_1_photos/post_6.webp'), filename: "square.webp")

one_post_7 = Post.create({author_id: 2, caption: 'JP for threeeeeee', location: 'Giving out buckets 4 free'})
one_post_7.images.attach(io: File.open('app/assets/images/user_1_photos/post_7.webp'), filename: "square.webp")

one_post_8 = Post.create({author_id: 2, caption: 'Lil warmup flick', location: 'Gold blooded'})
one_post_8.images.attach(io: File.open('app/assets/images/user_1_photos/post_8.jpeg'), filename: "square.webp")

one_post_9 = Post.create({author_id: 2, caption: 'Yeah I can play the piano too', location: 'LA arena logo'})
one_post_9.images.attach(io: File.open('app/assets/images/user_1_photos/post_9.jpeg'), filename: "square.webp")

two_post_1 = Post.create({author_id: 3, caption: 'Back when I won the title', location: 'WWE champ'})
two_post_1.images.attach(io: File.open('app/assets/images/user_2_photos/post_1.jpeg'), filename: "square.webp")

two_post_2 = Post.create({author_id: 3, caption: 'An invisible headlock', location: 'Wrestlemania'})
two_post_2.images.attach(io: File.open('app/assets/images/user_2_photos/post_2.jpeg'), filename: "square.webp")

two_post_3 = Post.create({author_id: 3, caption: 'Shoulder tat is popping', location: 'Idk'})
two_post_3.images.attach(io: File.open('app/assets/images/user_2_photos/post_3.jpeg'), filename: "square.webp")

two_post_4 = Post.create({author_id: 3, caption: 'On the hunt', location: 'Ole college days'})
two_post_4.images.attach(io: File.open('app/assets/images/user_2_photos/post_4.jpeg'), filename: "square.webp")

two_post_5 = Post.create({author_id: 3, caption: 'We boutta win', location: 'Miamiiiii'})
two_post_5.images.attach(io: File.open('app/assets/images/user_2_photos/post_5.jpeg'), filename: "square.webp")

two_post_6 = Post.create({author_id: 3, caption: 'OUCH', location: 'Turf'})
two_post_6.images.attach(io: File.open('app/assets/images/user_2_photos/post_6.webp'), filename: "square.webp")

two_post_7 = Post.create({author_id: 3, caption: 'Pink suit poppin', location: "Grammy's?"})
two_post_7.images.attach(io: File.open('app/assets/images/user_2_photos/post_7.jpeg'), filename: "square.webp")

two_post_8 = Post.create({author_id: 3, caption: 'My model phase', location: "Probably h&m"})
two_post_8.images.attach(io: File.open('app/assets/images/user_2_photos/post_8.webp'), filename: "square.webp")

two_post_9 = Post.create({author_id: 3, caption: 'Headshot', location: "Disney Awards"})
two_post_9.images.attach(io: File.open('app/assets/images/user_2_photos/post_9.webp'), filename: "square.webp")

three_post_1 = Post.create({author_id: 4, caption: 'HelloPandaRed'})
three_post_1.images.attach(io: File.open('app/assets/images/user_3_photos/post_1.jpeg'), filename: "square.webp")

three_post_2 = Post.create({author_id: 4, caption: 'HelloPandaMinis'})
three_post_2.images.attach(io: File.open('app/assets/images/user_3_photos/post_2.jpeg'), filename: "square.webp")

three_post_3 = Post.create({author_id: 4, caption: 'HelloPandaChocolate'})
three_post_3.images.attach(io: File.open('app/assets/images/user_3_photos/post_3.webp'), filename: "square.webp")

three_post_4 = Post.create({author_id: 4, caption: 'HelloPandaVanilla'})
three_post_4.images.attach(io: File.open('app/assets/images/user_3_photos/post_4.jpeg'), filename: "square.webp")

three_post_5 = Post.create({author_id: 4, caption: 'HelloPandaChocolateBigBag'})
three_post_5.images.attach(io: File.open('app/assets/images/user_3_photos/post_5.jpeg'), filename: "square.webp")

three_post_6 = Post.create({author_id: 4, caption: 'HelloPandaMatcha'})
three_post_6.images.attach(io: File.open('app/assets/images/user_3_photos/post_6.jpeg'), filename: "square.webp")

three_post_7 = Post.create({author_id: 4, caption: 'HelloPandaMoreVanilla'})
three_post_7.images.attach(io: File.open('app/assets/images/user_3_photos/post_7.jpeg'), filename: "square.webp")

three_post_8 = Post.create({author_id: 4, caption: 'HelloPandaCaramel'})
three_post_8.images.attach(io: File.open('app/assets/images/user_3_photos/post_8.jpeg'), filename: "square.webp")

three_post_9 = Post.create({author_id: 4, caption: 'HelloPandaChocoMinis'})
three_post_9.images.attach(io: File.open('app/assets/images/user_3_photos/post_9.jpeg'), filename: "square.webp")

four_post_1 = Post.create({author_id: 5, caption: 'iPhone unboxing', location: 'Apple HQ'})
four_post_1.images.attach(io: File.open('app/assets/images/user_4_photos/post_1.jpeg'), filename: "square.webp")

four_post_2 = Post.create({author_id: 5, caption: 'Baby iPhone reveal', location: 'Apple HQ'})
four_post_2.images.attach(io: File.open('app/assets/images/user_4_photos/post_2.webp'), filename: "square.webp")

four_post_3 = Post.create({author_id: 5, caption: 'This one looks powerful', location: 'Apple HQ'})
four_post_3.images.attach(io: File.open('app/assets/images/user_4_photos/post_3.jpeg'), filename: "square.webp")

four_post_4 = Post.create({author_id: 5, caption: 'Business casual', location: 'Apple HQ'})
four_post_4.images.attach(io: File.open('app/assets/images/user_4_photos/post_4.jpeg'), filename: "square.webp")

four_post_5 = Post.create({author_id: 5, caption: 'I like this one', location: 'Apple HQ'})
four_post_5.images.attach(io: File.open('app/assets/images/user_4_photos/post_5.webp'), filename: "square.webp")

four_post_6 = Post.create({author_id: 5, caption: 'iTouch', location: 'Apple HQ'})
four_post_6.images.attach(io: File.open('app/assets/images/user_4_photos/post_6.webp'), filename: "square.webp")

four_post_7 = Post.create({author_id: 5, caption: 'iPod!', location: 'Apple HQ'})
four_post_7.images.attach(io: File.open('app/assets/images/user_4_photos/post_7.jpeg'), filename: "square.webp")

four_post_8 = Post.create({author_id: 5, caption: 'iPad', location: 'Apple HQ'})
four_post_8.images.attach(io: File.open('app/assets/images/user_4_photos/post_8.webp'), filename: "square.webp")

four_post_9 = Post.create({author_id: 5, caption: 'Young Steve', location: 'Apple HQ'})
four_post_9.images.attach(io: File.open('app/assets/images/user_4_photos/post_9.jpeg'), filename: "square.webp")

five_post_1 = Post.create({author_id: 6, caption: 'Professional Flok', location: "Grammy's"})
five_post_1.images.attach(io: File.open('app/assets/images/user_5_photos/post_1.webp'), filename: "square.webp")

five_post_2 = Post.create({author_id: 6, caption: 'Artsy Flok', location: "Over the rainbow"})
five_post_2.images.attach(io: File.open('app/assets/images/user_5_photos/post_2.jpeg'), filename: "square.webp")

five_post_3 = Post.create({author_id: 6, caption: 'Me killing a performance', location: "Showtime"})
five_post_3.images.attach(io: File.open('app/assets/images/user_5_photos/post_3.webp'), filename: "square.webp")

five_post_4 = Post.create({author_id: 6, caption: 'Young Flok', location: "Green screen"})
five_post_4.images.attach(io: File.open('app/assets/images/user_5_photos/post_4.webp'), filename: "square.webp")

five_post_5 = Post.create({author_id: 6, caption: 'Hang loose Flok', location: "Gray screen"})
five_post_5.images.attach(io: File.open('app/assets/images/user_5_photos/post_5.jpeg'), filename: "square.webp")

five_post_6 = Post.create({author_id: 6, caption: 'Football Flok', location: "Kentucky U"})
five_post_6.images.attach(io: File.open('app/assets/images/user_5_photos/post_6.jpeg'), filename: "square.webp")

five_post_7 = Post.create({author_id: 6, caption: 'Model Flok', location: "BET awards"})
five_post_7.images.attach(io: File.open('app/assets/images/user_5_photos/post_7.webp'), filename: "square.webp")

five_post_8 = Post.create({author_id: 6, caption: 'Smiling Flok', location: "Interview of some sort"})
five_post_8.images.attach(io: File.open('app/assets/images/user_5_photos/post_8.jpeg'), filename: "square.webp")

five_post_9 = Post.create({author_id: 6, caption: 'Deep Squat Flok', location: "Posted"})
five_post_9.images.attach(io: File.open('app/assets/images/user_5_photos/post_9.jpeg'), filename: "square.webp")

six_post_1 = Post.create({author_id: 7, caption: 'Grandma Nae Nae', location: "Dance floor"})
six_post_1.images.attach(io: File.open('app/assets/images/user_6_photos/post_1.png'), filename: "square.webp")

six_post_2 = Post.create({author_id: 7, caption: 'Happy Grandma', location: "White room"})
six_post_2.images.attach(io: File.open('app/assets/images/user_6_photos/post_2.png'), filename: "square.webp")

six_post_3 = Post.create({author_id: 7, caption: 'Duplicate, replace'})
six_post_3.images.attach(io: File.open('app/assets/images/user_6_photos/post_3.png'), filename: "square.webp")

six_post_4 = Post.create({author_id: 7, caption: 'Back when I used to turn up', location: "Night club"})
six_post_4.images.attach(io: File.open('app/assets/images/user_6_photos/post_4.png'), filename: "square.webp")

six_post_5 = Post.create({author_id: 7, caption: 'Knitting', location: "Rocking chair"})
six_post_5.images.attach(io: File.open('app/assets/images/user_6_photos/post_5.jpeg'), filename: "square.webp")

six_post_6 = Post.create({author_id: 7, caption: 'Copped a new cane', location: "Home depot"})
six_post_6.images.attach(io: File.open('app/assets/images/user_6_photos/post_6.png'), filename: "square.webp")

six_post_7 = Post.create({author_id: 7, caption: 'Oh good heavens'})
six_post_7.images.attach(io: File.open('app/assets/images/user_6_photos/post_7.jpeg'), filename: "square.webp")

six_post_8 = Post.create({author_id: 7, caption: "Grandma's getting old", location: "Bernie lean"})
six_post_8.images.attach(io: File.open('app/assets/images/user_6_photos/post_8.jpeg'), filename: "square.webp")

six_post_9 = Post.create({author_id: 7, caption: 'Young grandma', location: "Yellow room"})
six_post_9.images.attach(io: File.open('app/assets/images/user_6_photos/post_9.png'), filename: "square.webp")

seven_post_1 = Post.create({author_id: 8, caption: 'Just broke him', location: "Look back"})
seven_post_1.images.attach(io: File.open('app/assets/images/user_7_photos/post_1.jpeg'), filename: "square.webp")

seven_post_2 = Post.create({author_id: 8, caption: 'Grew the dreads out', location: "Heasdhot"})
seven_post_2.images.attach(io: File.open('app/assets/images/user_7_photos/post_2.webp'), filename: "square.webp")

seven_post_3 = Post.create({author_id: 8, caption: 'Headshot', location: "NBA"})
seven_post_3.images.attach(io: File.open('app/assets/images/user_7_photos/post_3.png'), filename: "square.webp")

seven_post_4 = Post.create({author_id: 8, caption: 'Clutch', location: "Game 3"})
seven_post_4.images.attach(io: File.open('app/assets/images/user_7_photos/post_4.jpeg'), filename: "square.webp")

seven_post_5 = Post.create({author_id: 8, caption: 'He wants no smoke', location: "Mavs Stadium"})
seven_post_5.images.attach(io: File.open('app/assets/images/user_7_photos/post_5.webp'), filename: "square.webp")

seven_post_6 = Post.create({author_id: 8, caption: "This man knows I'll take him", location: "We won"})
seven_post_6.images.attach(io: File.open('app/assets/images/user_7_photos/post_6.jpeg'), filename: "square.webp")

seven_post_7 = Post.create({author_id: 8, caption: 'Action shot'})
seven_post_7.images.attach(io: File.open('app/assets/images/user_7_photos/post_7.jpeg'), filename: "square.webp")

seven_post_8 = Post.create({author_id: 8, caption: 'James buckets', location: "There goes that man"})
seven_post_8.images.attach(io: File.open('app/assets/images/user_7_photos/post_8.jpeg'), filename: "square.webp")

seven_post_9 = Post.create({author_id: 8, caption: 'Jim Artsy', location: "Mountaintop"})
seven_post_9.images.attach(io: File.open('app/assets/images/user_7_photos/post_9.jpeg'), filename: "square.webp")

eight_post_1 = Post.create({author_id: 9, caption: 'Bongos', location: "Orange"})
eight_post_1.images.attach(io: File.open('app/assets/images/user_8_photos/post_1.jpg'), filename: "square.webp")

eight_post_2 = Post.create({author_id: 9, caption: 'Me n squad', location: "Picture on the wall"})
eight_post_2.images.attach(io: File.open('app/assets/images/user_8_photos/post_2.jpeg'), filename: "square.webp")

eight_post_3 = Post.create({author_id: 9, caption: 'Performing Babylon Rule Dem', location: "Turquoise Screen"})
eight_post_3.images.attach(io: File.open('app/assets/images/user_8_photos/post_3.jpg'), filename: "square.webp")

eight_post_4 = Post.create({author_id: 9, caption: 'Me n squad again', location: "Band"})
eight_post_4.images.attach(io: File.open('app/assets/images/user_8_photos/post_4.jpg'), filename: "square.webp")

eight_post_5 = Post.create({author_id: 9, caption: 'Here we are', location: "ft Don Carlos"})
eight_post_5.images.attach(io: File.open('app/assets/images/user_8_photos/post_5.jpeg'), filename: "square.webp")

eight_post_6 = Post.create({author_id: 9, caption: 'Headshot', location: "Harrison"})
eight_post_6.images.attach(io: File.open('app/assets/images/user_8_photos/post_6.jpeg'), filename: "square.webp")

eight_post_7 = Post.create({author_id: 9, caption: 'Beach trip', location: "Ocean Beach"})
eight_post_7.images.attach(io: File.open('app/assets/images/user_8_photos/post_7.jpeg'), filename: "square.webp")

eight_post_8 = Post.create({author_id: 9, caption: 'Performing', location: "Green screen"})
eight_post_8.images.attach(io: File.open('app/assets/images/user_8_photos/post_8.jpeg'), filename: "square.webp")

eight_post_9 = Post.create({author_id: 9, caption: 'Performing again', location: "Purple screen}"})
eight_post_9.images.attach(io: File.open('app/assets/images/user_8_photos/post_9.jpeg'), filename: "square.webp")

nine_post_1 = Post.create({author_id: 10, caption: 'Arnold n golf', location: "Advertisement"})
nine_post_1.images.attach(io: File.open('app/assets/images/user_9_photos/post_1.jpeg'), filename: "square.webp")

eight_post_2 = Post.create({author_id: 10, caption: 'Old pic', location: "Black n White"})
eight_post_2.images.attach(io: File.open('app/assets/images/user_9_photos/post_2.jpeg'), filename: "square.webp")

nine_post_3 = Post.create({author_id: 10, caption: 'Hole in one?', location: "Antarctica"})
nine_post_3.images.attach(io: File.open('app/assets/images/user_9_photos/post_3.jpeg'), filename: "square.webp")

nine_post_4 = Post.create({author_id: 10, caption: 'Still got it', location: "Red cardigan"})
nine_post_4.images.attach(io: File.open('app/assets/images/user_9_photos/post_4.webp'), filename: "square.webp")

nine_post_5 = Post.create({author_id: 10, caption: 'Golf 4 life', location: "Look at that swing"})
nine_post_5.images.attach(io: File.open('app/assets/images/user_9_photos/post_5.webp'), filename: "square.webp")

nine_post_6 = Post.create({author_id: 10, caption: 'Throwback Thursday', location: "I won this tourney"})
nine_post_6.images.attach(io: File.open('app/assets/images/user_9_photos/post_6.webp'), filename: "square.webp")

nine_post_7 = Post.create({author_id: 10, caption: 'Arnold Tea', location: "Safeway"})
nine_post_7.images.attach(io: File.open('app/assets/images/user_9_photos/post_7.jpeg'), filename: "square.webp")

nine_post_8 = Post.create({author_id: 10, caption: 'Headshot', location: "Cheeeeese"})
nine_post_8.images.attach(io: File.open('app/assets/images/user_9_photos/post_8.jpeg'), filename: "square.webp")

nine_post_9 = Post.create({author_id: 10, caption: 'This one is a classic', location: "Smoke n golf"})
nine_post_9.images.attach(io: File.open('app/assets/images/user_9_photos/post_9.webp'), filename: "square.webp")

ten_post_1 = Post.create({author_id: 11, caption: "Me @ Grammy's", location: "Gold Dress"})
ten_post_1.images.attach(io: File.open('app/assets/images/user_10_photos/post_1.webp'), filename: "square.webp")

ten_post_2 = Post.create({author_id: 11, caption: 'Sherpa fleece', location: "Modeling"})
ten_post_2.images.attach(io: File.open('app/assets/images/user_10_photos/post_2.jpeg'), filename: "square.webp")

ten_post_3 = Post.create({author_id: 11, caption: "Album cover", location: "Creative mode"})
ten_post_3.images.attach(io: File.open('app/assets/images/user_10_photos/post_3.webp'), filename: "square.webp")

ten_post_4 = Post.create({author_id: 11, caption: "I look good", location: "Throwback"})
ten_post_4.images.attach(io: File.open('app/assets/images/user_10_photos/post_4.webp'), filename: "square.webp")

ten_post_5 = Post.create({author_id: 11, caption: "Me & Sean", location: "MTV awards"})
ten_post_5.images.attach(io: File.open('app/assets/images/user_10_photos/post_5.webp'), filename: "square.webp")

ten_post_6 = Post.create({author_id: 11, caption: "Me & child", location: "Cheeeeeetah"})
ten_post_6.images.attach(io: File.open('app/assets/images/user_10_photos/post_6.jpeg'), filename: "square.webp")

ten_post_7 = Post.create({author_id: 11, caption: "Killin' it on stage", location: "Gold screen"})
ten_post_7.images.attach(io: File.open('app/assets/images/user_10_photos/post_7.jpeg'), filename: "square.webp")

ten_post_8 = Post.create({author_id: 11, caption: "Braided up", location: "New style"})
ten_post_8.images.attach(io: File.open('app/assets/images/user_10_photos/post_8.jpeg'), filename: "square.webp")

ten_post_9 = Post.create({author_id: 11, caption: "Me performing", location: "Purple screen"})
ten_post_9.images.attach(io: File.open('app/assets/images/user_10_photos/post_9.jpeg'), filename: "square.webp")


