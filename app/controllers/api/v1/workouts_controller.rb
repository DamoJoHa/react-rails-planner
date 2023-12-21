class Api::V1::WorkoutsController < ApplicationController
  before_action :authenticate_user!

  def show
    @workout = Workout.find(params[:id])
    if @workout.user == current_user
      render json: @workout, status: :ok
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
    end
  end

  def update
    @workout = Workout.find(params[:id])
    p "UPDATING WORKOUT"
    p @workout.id
    if @workout.user == current_user && @workout.update(workout_params)
      render json: {message: "Workout Updated"}, status: :ok
      p "Workout updated"
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
      p "Unsuccesful workout update"
    end
  end

  private

  def workout_params
    params.permit(:pushups, :situps)
  end
end
