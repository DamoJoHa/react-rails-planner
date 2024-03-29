class Entry < ApplicationRecord
  belongs_to :user

  # Relations for module models
  has_one :diary, dependent: :destroy
  has_one :workout, dependent: :destroy

  # Creates the modules it will need
  after_create do |entry|
    p 'Creating Entry Dependencies'

    workout = Workout.new
    workout.entry = entry
    workout.save
    p 'Created Workout'

    diary = Diary.new
    diary.entry = entry
    diary.save
    p 'Created Diary'
  end

  def compile
    { workout: workout, diary: diary, date: date }
  end

  validates :date, presence: true
  validates :date, uniqueness: { scope: :user, message: 'A user may only have one entry per date.' }
end
