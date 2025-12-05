input_text = readlines("input.txt");

linebreak = find(input_text == "");
fresh_ranges_raw = input_text(1:linebreak-1);
ingredients = str2double(input_text(linebreak+1 : end));
fresh_ranges = str2double(split(fresh_ranges_raw, '-'));

is_fresh = any(ingredients' >= fresh_ranges(:, 1) & ingredients' <= fresh_ranges(:, 2), 1);
sum(is_fresh)
