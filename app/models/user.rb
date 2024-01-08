class User < ApplicationRecord
  has_many :entries, dependent: :destroy
  has_many :tasks, dependent: :destroy

  # Allow us to access modules through dated entries
  has_many :diaries, through: :entries
  has_many :workouts, through: :entries

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
