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
end
