class Api::V1::DiariesController < ApplicationController
  def show
    @diary = Diary.find(params[:id])
    render json: @diary, status: :ok
  end
end
