data = readlines('input.txt');

%% Part 1
A = double(data(1).extractAfter("A: "));
B = double(data(2).extractAfter("B: "));
C = double(data(3).extractAfter("C: "));
program = str2num(data(end).extractAfter("Program: "));

output = runProgram(program, A, B, C);
outputString = strjoin(string(output), ',');
disp(outputString);

%% Part 2
answers = findInitialValue(0, numel(program) - 1, program, program, []);
A_init = min(answers);
disp(A_init);
