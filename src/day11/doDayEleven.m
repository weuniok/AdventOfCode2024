inputPath = fullfile('src', 'day11', 'input.txt');
imported_stones = importdata(inputPath)

[counts, unique_stones] = hist(imported_stones,unique(imported_stones));
stone_dict = dictionary(unique_stones, counts);

n_blinks = 75;

new_stone_dict = stone_dict;
tic
for blink = 1:n_blinks
    new_stone_dict = blinkAtStones(new_stone_dict);
end
toc

num2str(sum(new_stone_dict.values))
