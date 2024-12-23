equations = readlines('input.txt');
solutions = double(equations.extractBefore(':'));
numbers_str = equations.extractAfter(': ');
numbers = arrayfun(@(x) str2num(split(x, ',')), numbers_str, 'UniformOutput', false);

%% Part 1
symbols = {'+', '*'};
score = calibrateBridges(symbols, numbers, solutions);
display(score)

%% Part 2
symbols = {'+', '*', '|'};
score = calibrateBridges(symbols, numbers, solutions);
display(score)