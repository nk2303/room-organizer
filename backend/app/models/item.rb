class Item < ApplicationRecord
    belongs_to :storage
    belongs_to :room
end
