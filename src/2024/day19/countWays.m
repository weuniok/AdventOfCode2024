function ways = countWays(pattern, carpets)
  persistent possible_ways
  if isempty(possible_ways)
      possible_ways = dictionary(string([]), double([]));
  end

  if isKey(possible_ways, pattern)
      ways = possible_ways(pattern);
      return;
  end

  if strlength(pattern) == 0
      ways = true;
      return;
  end

  ways = 0;
  for carpet = carpets
      carpet_length = strlength(carpet);
      if strncmp(pattern, carpet, carpet_length)
          charPattern = char(pattern);
          subPattern = string(charPattern((carpet_length+1):end));
          ways = ways + countWays(subPattern, carpets);
      end
  end

  possible_ways(pattern) = ways;
end
