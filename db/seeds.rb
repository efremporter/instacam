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
  username: "demouser",
  password: "password123!"
})

Post.create({author_id: 1, caption: 'check out this melon', location: 'istanbul'})
Post.create({author_id: 1, caption: 'hey there my friends', location: 'somewhere over the rainbow'})
Post.create({author_id: 1, caption: 'omg look at this hot dog', location: 'Top Dog'})
Post.create({author_id: 1, caption: 'grandma shoes for the day', location: 'Rome'})
Post.create({author_id: 1, caption: 'i am looking for a pregnant animal', location: 'urgent'})
Post.create({author_id: 1, caption: 'I bet you can not guess where this is', location: 'Unknown'})
Post.create({author_id: 1, caption: 'lolipop by lil wayne', location: '2006?'})
Post.create({author_id: 1, caption: 'My teacher used to play Party in the USA every morning', location: '4th grade'})
Post.create({author_id: 1, caption: 'finally we have reached the 9th post', location: 'yay'})