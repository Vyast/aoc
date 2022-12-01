local dir = debug.getinfo(1).short_src
local input = dir:gsub('main.lua', 'input.txt')

local totals = {}
local amount = 0

for line in io.lines(input) do
    if line == "" then
        totals[#totals+1] = amount
        amount = 0
    else
        amount = amount + tonumber(line)
    end
end

table.insert(totals, amount)

table.sort(totals, function(a, b)
    return a > b
end)

local function part_one()
    print('ANSWER:', totals[1])
end

local function part_two()
    local one, two, three = totals[1], totals[2], totals[3]

    print('ANSWER:', one + two + three)
end

--part_one()
part_two()