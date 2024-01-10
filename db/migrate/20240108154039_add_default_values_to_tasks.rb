class AddDefaultValuesToTasks < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:tasks, :daily, false)
  end
end
