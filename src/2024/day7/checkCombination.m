
function is_valid = checkCombination(components, operators_encoded, target_result)
  %CHECKCOMBINATION Check if a combination of components and operators equals target result

  result = components(1);
  
  for i = 1:numel(operators_encoded)
      if result > target_result
          break
      end
  
      next_component = components(i+1);
      switch operators_encoded(i)
          case 1  % '+'
              result = result + next_component;
          case 2  % '*'
              result = result * next_component;
          case 3  % '|'
              result = str2double(sprintf('%d%d', result, next_component));
      end
  end

  is_valid = result == target_result;
  
  end
  