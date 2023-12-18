class Api::V1::DiariesController < ApplicationController
  before_action :authenticate_user!
  def show
    @diary = Diary.find(params[:id])
    if @diary.user == current_user
      render json: @diary, status: :ok
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
    end
  end

  def update
    @diary = Diary.find(params[:id])
    p "UPDATING DIARY"
    p @diary.id
    if @diary.user == current_user && @diary.update(diary_params)
      render json: @diary, status: :ok
      p "Diary updated"
    else
      render json: { error: "Unauthorized access attempt" }, status: :forbidden
      p "Unsuccesful diary update"
    end
  end

  private

  def diary_params
    params.permit(:content, :mood)
  end
end
