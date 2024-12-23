function score = calibrateBridges(symbols, numbers, solutions)
  score = 0;
  
  for i = 1:length(solutions)
      components = numbers{i};
      target_result = solutions(i);
  
      n_operators = numel(components) - 1;
      combinations = generateCombinations(n_operators, numel(symbols));
      
      % Check all operator combinations
      for variant = 1:height(combinations)
          operators = combinations(variant, :);
          is_valid = checkCombination(components, operators, target_result);
          if is_valid
              score = score + target_result;
              break;
          end
      end
  end
  
  end
  