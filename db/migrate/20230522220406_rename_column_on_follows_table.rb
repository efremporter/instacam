class RenameColumnOnFollowsTable < ActiveRecord::Migration[5.2]
  def change
    rename_column :follows, :friend_id, :following_id
  end
end
