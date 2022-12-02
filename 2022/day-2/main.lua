local dir = debug.getinfo(1).short_src
local input = dir:gsub('main.lua', 'input.txt')

local guide = {}

for line in io.lines(input) do
    local row = {}

    for word in line:gmatch("%w+") do
        row[#row+1] = word
    end

    guide[#guide+1] = row
end

local first_column = {
    ["A"] = 'Rock',
    ["B"] = 'Paper',
    ["C"] = 'Scissors'
}

local second_column = {
    ["X"] = {
        label = 'Rock',
        points = 1
    },
    ["Y"] = {
        label = 'Paper',
        points = 2
    },
    ["Z"] = {
        label = 'Scissors',
        points = 3
    }
}

local function part_one()
    local total_score = 0

    for k, v in pairs(guide) do
        local opponent, me = v[1], v[2]
        local opponent_value, my_value = first_column[opponent], second_column[me]

        local score = my_value.points

        if opponent_value == 'Rock' then
            if my_value.label == 'Rock' then
                score = score + 3
            elseif my_value.label == 'Paper' then
                score = score + 6
            end
        elseif opponent_value == 'Paper' then
            if my_value.label == 'Paper' then
                score = score + 3
            elseif my_value.label == 'Scissors' then
                score = score + 6
            end
        elseif opponent_value == 'Scissors' then
            if my_value.label == 'Scissors' then
                score = score + 3
            elseif my_value.label == 'Rock' then
                score = score + 6
            end
        end

        total_score = total_score + score
    end

    print('ANSWER:', total_score)
end

local rigged_key = {
    ['X'] = 'loss',
    ['Y'] = 'draw',
    ['Z'] = 'win'
}

local function part_two()
    local total_score = 0

    for k, v in pairs(guide) do
        local opponent, me = v[1], v[2]
        local opponent_value = first_column[opponent]

        local outcome = rigged_key[me]
        local score = 0

        local my_value

        if opponent_value == 'Rock' then
            if outcome == 'draw' then
                my_value = 'X'
            elseif outcome == 'win' then
                my_value = 'Y'
            elseif outcome == 'loss' then
                my_value = 'Z'
            end
        elseif opponent_value == 'Paper' then
            if outcome == 'draw' then
                my_value = 'Y'
            elseif outcome == 'win' then
                my_value = 'Z'
            elseif outcome == 'loss' then
                my_value = 'X'
            end
        elseif opponent_value == 'Scissors' then
            if outcome == 'draw' then
                my_value = 'Z'
            elseif outcome == 'win' then
                my_value = 'X'
            elseif outcome == 'loss' then
                my_value = 'Y'
            end
        end

        score = score + second_column[my_value].points
        score = (score + ((outcome == 'win' and 6) or (outcome == 'draw' and 3) or 0))

        total_score = total_score + score
    end

    print('ANSWER:', total_score)
end

--part_one()
part_two()