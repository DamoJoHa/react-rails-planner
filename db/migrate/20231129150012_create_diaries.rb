class CreateDiaries < ActiveRecord::Migration[7.0]
  def change
    create_table :diaries do |t|
      t.text :content
      t.string :mood
      t.references :entry, foreign_key: true

      t.timestamps
    end
  end
end
