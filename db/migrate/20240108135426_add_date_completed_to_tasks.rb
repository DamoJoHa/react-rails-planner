class AddDateCompletedToTasks < ActiveRecord::Migration[7.0]
  def change
    add_column :tasks, :date_completed, :date
  end
end
