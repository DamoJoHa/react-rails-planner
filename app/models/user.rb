class User < ApplicationRecord
  has_many :entries, dependent: :destroy
  has_many :tasks, dependent: :destroy

  # Allow us to access modules through dated entries
  has_many :diaries, through: :entries
  has_many :workouts, through: :entries

  # Logic for filtering tasks
  def current_tasks
    today = Date.today
    # Probably not the most effecient way to do this
    tasks.select { |task| !task.complete || task.date_completed == today || task.daily }
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
