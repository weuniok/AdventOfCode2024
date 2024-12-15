data_lines = readlines('src', '2024', 'day13', 'input.txt');

total_cost_p1 = 0;
total_cost_p2 = 0;
for problem = 1:4:numel(data_lines)
    coeffs = double([data_lines(problem).extractBetween('X', ','), ...
        data_lines(problem+1).extractBetween('X', ','); ...
        data_lines(problem).extractAfter('Y'), ...
        data_lines(problem+1).extractAfter('Y')]);
    targets_p1 = double([data_lines(problem+2).extractBetween('X=', ','); ...
        data_lines(problem+2).extractAfter('Y=')]);
    targets_p2 = 10000000000000 + targets_p1;

    options=optimoptions(@intlinprog,...
        'display','off',...
        'TolInteger', 1e-5, ...
        'LPPreprocess', 'None' ...
        );
    solution_p1 = intlinprog([3;1], [1,2], [], [], coeffs, targets_p1, [0, 0], [], options);

    backslash_result = coeffs \ targets_p2;
    solution_p2 = intlinprog([3;1], [1,2], [], [], coeffs, targets_p2, [0, 0], [], [], options);

    if ~isempty(solution_p1) && all(abs(solution_p1 - round(solution_p1)) < 1e-3)
        total_cost_p1 = total_cost_p1 +  [3,1] * solution_p1;
    end
    if ~isempty(solution_p2) && all(abs(solution_p2 - round(solution_p2)) < 1e-3)
        total_cost_p2 = total_cost_p2 +  [3,1] * round(solution_p2);
    end

end

total_cost_p1
total_cost_p2