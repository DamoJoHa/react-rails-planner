class Workout < ApplicationRecord
  belongs_to :entry
  has_one :user, through: :entry
end
