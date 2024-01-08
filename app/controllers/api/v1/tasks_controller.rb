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

  def update
    @task = Task.find(params[:id])
    "UPDATING TASK"
    p @workout.id
    if @workout.user == current_user && @workout.update(workout_params)
      render json: {message: "TASK Updated"}, status: :ok
      p "Workout updated"
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
      p "Unsuccesful workout update"
    end
  end

  private

  def task_params
    params.permit(:daily, :name, :complete)
  end
end
