class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def create
    p "Creating Task"
    task = Task.new(task_params)
    task.user = current_user
    p task
    task.save
  end

  def index
    @tasks = current_user.current_tasks
    render json: @tasks, status: :ok
  end

  private

  def task_params
    params.permit(:daily, :name, :complete)
  end
end
