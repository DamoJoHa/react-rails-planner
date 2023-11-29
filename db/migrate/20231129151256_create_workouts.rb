class CreateWorkouts < ActiveRecord::Migration[7.0]
  def change
    create_table :workouts do |t|
      t.integer :pushups
      t.integer :situps
      t.references :entry, foreign_key: true

      t.timestamps
    end
  end
end
