class CreateEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :entries do |t|
      t.date :date
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
