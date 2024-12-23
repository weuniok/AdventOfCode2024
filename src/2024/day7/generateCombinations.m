function permutations = generateCombinations(combination_length, n_elements)
  %GENERATECOMBINATIONS Generate all possible permutations of specified length 
  % from numbers 1 to n_elements
  % Input: 
  %   combination_length - length of each permutation
  %   n_elements - maximum number to use
  % Output: permutations - matrix where each row is a unique permutation
  
  permutations = [];
  permutations = recursivePermutations([], combination_length, n_elements);
end

function permutations = recursivePermutations(current_perm, remaining_length, n_elements)
  % Helper function to recursively build permutations
  % Input:
  %   current_perm - current partial permutation
  %   remaining_length - how many more numbers needed
  %   n_elements - maximum number to use
  
  permutations = [];
  
  % Base case: if we've built a full permutation
  if remaining_length == 0
      permutations = current_perm;
      return;
  end
  
  % Recursive case: add all possible numbers on that slot
  for i = 1:n_elements
      new_perm = [current_perm, i];
      result = recursivePermutations(new_perm, remaining_length - 1, n_elements);
      permutations = [permutations; result];
  end
end