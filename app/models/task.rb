class Task < ApplicationRecord
  belongs_to :user

  after_find :flip_flop_daily

  validates :name, presence: true

  private

  def flip_flop_daily
    # Check if the task is daily, and if the completion date is today
    return unless daily && date_completed < Date.today

    self.complete = false
    save
  end
end
