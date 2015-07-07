class HelloController < ApplicationController

    def index
        f = File.open(Rails.root.to_s + '/public/angular-phonecat/app/phones/phones.json', 'r')
        string = ""
        f.readlines.each do |line|
            string += line
        end
        render json: JSON.parse(string)
    end
end
