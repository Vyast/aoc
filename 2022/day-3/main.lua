local dir = debug.getinfo(1).short_src
local input = dir:gsub('main.lua', 'input.txt')

local function len(t)
    local c = 0
    for _, _ in pairs(t) do c = c + 1 end
    return c
end

local priority = {}

for i=1, 26 do
    local char = string.char(97 + (i - 1))

    priority[char] = i;
end

local length = len(priority)

for i=1, 26 do
    local char = string.char(97 + (i - 1))

    priority[char:upper()] = length + i;
end

local function part_one()
    local total = 0

    for line in io.lines(input) do
        local half = math.floor(#line / 2)

        local one, two = line:sub(1, half), line:sub(half + 1, #line)

        local one_letters, two_letters = {}, {}

        for i=1, #one do one_letters[i] = one:sub(i, i) end
        for i=1, #two do two_letters[i] = two:sub(i, i) end

        local char

        for _, v in pairs(one_letters) do
            if char then break end

            for _, v2 in pairs(two_letters) do
                if v == v2 then
                    char = v
                    break
                end
            end
        end

        total = total + priority[char]
    end

    print('ANSWER:', total)
end

local function part_two()
    local total = 0

    local rucksacks = {}
    local sack = {}

    for line in io.lines(input) do
        sack[#sack+1] = line
        
        if #sack == 3 then
            rucksacks[#rucksacks+1] = sack
            sack = {}
        end
    end

    for _, line in pairs(rucksacks) do
        local one, two, three = line[1], line[2], line[3]

        local one_chars, two_chars, three_chars = {}, {}, {}

        for i=1, #one do one_chars[i] = one:sub(i, i) end
        for i=1, #two do two_chars[i] = two:sub(i, i) end
        for i=1, #three do three_chars[i] = three:sub(i, i) end

        local char

        for _, v in pairs(one_chars) do
            if char then break end

            for _, v2 in pairs(two_chars) do
                if char then break end

                for _, v3 in pairs(three_chars) do
                    if v == v2 and v == v3 and v2 == v3 then
                        char = v
                        break
                    end
                end
            end
        end

        total = total + priority[char]
    end

    print('ANSWER:', total)
end

--part_one()
part_two()