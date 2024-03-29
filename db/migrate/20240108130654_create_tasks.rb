class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :daily, null: false
      t.boolean :complete, default: false
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
