class EntriesController < ApplicationController
  before_action :authenticate_user!

  def index
    today = Entry.find { |entry| entry.date == Date.today }
    if today
      p "Loading today's data"
      @entry = today.compile
    else
      p "Creating new entry"
      new_entry = Entry.new
      new_entry.date = Date.today
      new_entry.user = current_user
      new_entry.save
      @entry = new_entry.compile
    end
  end
end
