class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def create
    p "Creating Task"
    task = Task.new(task_params)
    task.user = current_user
    p task
    task.save
    index
  end

  def index
    @tasks = current_user.current_tasks
    render json: @tasks, status: :ok
  end

  def mark_complete
    @task = Task.find(params[:id])
    if @task.user == current_user
      @task.complete = @task.complete ? false : true
      @task.save
      index
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
      p "Unsuccesful task update"
    end
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.user == current_user && @task.destroy
      index
    else
      render json: { error: "Failed to delete" }, status: :forbidden
      p "Unsuccesful task deletion"
    end
  end

  private

  def task_params
    params.permit(:daily, :name, :complete)
  end
end
