function new_stone_dict = blinkAtStones(stone_dict)

  stones = stone_dict.keys;
  new_stone_dict = dictionary();
  
  num_digits = floor(log10(stones)) + 1;
  
  % rule flags
  zero_stones_flag = stones == 0;
  even_digit_flag = mod(num_digits, 2) == 0;
  other_flag = ~zero_stones_flag & ~even_digit_flag;
  
  % calculating stone splitting
  split_points = num_digits(even_digit_flag) ./ 2;
  divisors = 10.^(num_digits(even_digit_flag) - split_points);
  left_stones = floor(stones(even_digit_flag) ./ divisors);
  right_stones = mod(stones(even_digit_flag), divisors);
  
  if any(zero_stones_flag)
      new_stone_dict(1) = stone_dict(0);
  end
  if any(other_flag)
      new_stone_dict(stones(other_flag) .* 2024) = stone_dict(stones(other_flag));
  end
  
  even_digit_stones = stones(even_digit_flag);
  for even_digit_index = 1:numel(even_digit_stones)
      this_stone = even_digit_stones(even_digit_index);
      left_stone = left_stones(even_digit_index);
      right_stone = right_stones(even_digit_index);
  
      new_stone_dict(left_stone) = lookup(new_stone_dict, left_stone, "FallbackValue", 0) + 1.*stone_dict(this_stone);
      new_stone_dict(right_stone) = lookup(new_stone_dict, right_stone, "FallbackValue", 0) + 1.*stone_dict(this_stone);
  end
  
  end