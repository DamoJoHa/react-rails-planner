class Task < ApplicationRecord
  belongs_to :user

  after_find :flip_flop_daily

  before_save :track_completion

  validates :name, presence: true

  private

  def flip_flop_daily
    # Check if the task is daily, and if the completion date is in the past (could be cleaner)
    return unless daily && date_completed && date_completed < Date.today

    self.complete = false
    self.date_completed = nil
    save
  end

  def track_completion
    self.date_completed = Date.today if complete && !date_completed
  end
end
