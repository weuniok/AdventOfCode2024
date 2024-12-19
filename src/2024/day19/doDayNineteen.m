data = readlines('input.txt');
carpets = strsplit(data(1), ', ');
patterns = data(3:end)';

%% Part 1
possible = false(1, length(patterns));
for index = 1:length(patterns)
    pattern = patterns(index);
    possible(index) = checkPattern(pattern, carpets);
end
score_p1 = sum(possible, 'all')

%% Part 2
ways = zeros(1, length(patterns));
for index = 1:length(patterns)
    pattern = patterns(index);
    ways(index) = countWays(pattern, carpets);
end
score_p2 = sum(ways, 'all')

%% Verification
assert(score_p1 == sum(ways > 0, 'all'))