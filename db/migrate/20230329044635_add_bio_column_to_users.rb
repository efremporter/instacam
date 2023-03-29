class AddBioColumnToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :bio, :string, limit: 150
  end
end
