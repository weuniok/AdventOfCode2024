initial_prices = importdata('input.txt');

n_repeats = 2000;

result = initial_prices;
prices = zeros(n_repeats + 1, numel(initial_prices));
prices(1, :) = mod(initial_prices, 10);
for repeat = 1:n_repeats
    result = makeNewNumber(result);
    prices(repeat+1, :) = mod(result, 10);
end
score = sum(result, 'all');

%% part 2
% each buyer is a column
digits = -9:9;
[a, b, c, d] = ndgrid(digits, digits, digits, digits);
combinations = [a(:), b(:), c(:), d(:)];
valid_combinations = combinations(...
    sum(combinations, 2) >= -9 & sum(combinations, 2) <= 9,....
    :);

max_price = 0;
for seq = valid_combinations'
    this_price = getAllPrices(prices, seq');
    max_price = max(max_price, this_price);
end
disp(max_price);
