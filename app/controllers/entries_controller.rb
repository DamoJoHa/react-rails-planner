class EntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    today = Entry.find { |entry| entry.date == Date.today }
    if today
      p "Loading today's data"
      @entry = today
    else
      p "Creating new entry"
      @entry = Entry.new
      @entry.date = Date.today
      @entry.user = current_user
      @entry.save
    end
  end
end
