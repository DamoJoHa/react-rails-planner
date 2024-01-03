class ChangeDefaultWorkoutValues < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:workouts, :pushups, 0)
    change_column_default(:workouts, :situps, 0)
  end
end
