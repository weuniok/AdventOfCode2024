function possible = checkPattern(pattern, carpets)
  persistent possible_patterns
  if isempty(possible_patterns)
      possible_patterns = dictionary(string([]), logical([]));
  end

  if isKey(possible_patterns, pattern)
      possible = possible_patterns(pattern);
      return;
  end

  if strlength(pattern) == 0
      possible = true;
      return;
  end

  for carpet = carpets
      carpet_length = strlength(carpet);
      if strncmp(pattern, carpet, carpet_length)
          charPattern = char(pattern);
          subPattern = string(charPattern((carpet_length+1):end));
          if checkPattern(subPattern, carpets)
              possible_patterns(pattern) = true;
              possible = true;
              return;
          end
      end
  end

  possible_patterns(pattern) = false;
  possible = false;
end