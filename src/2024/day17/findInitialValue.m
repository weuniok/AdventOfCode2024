function answers = findInitialValue(sumValue, power, program, target, answers)
    % FINDINITIALVALUE This function is part of the Advent of Code 2024 challenge for day 17.
    % It calculates the initial value required to find A register that spits out target output.
    checkA = @(A) runProgram(program, A, 0, 0);
    % Recursively searches for an initial value for A
    for x = 0:7
        % Each digit in octal of A changes one digit of output
        partialSum = sumValue + 8 ^ power * x;
        output = checkA(partialSum);

        if isequal(output, target)
            answers(end + 1) = partialSum;
            return;
        else
            if isequal(target(1 + power:end), output(1 + power:end))
                % Digit correct -> check to the next power of 8
                answers = findInitialValue(partialSum, power - 1, program, target, answers);
            end
        end

    end

end
