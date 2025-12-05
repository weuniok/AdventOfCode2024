input_text = readlines("input.txt");

linebreak = find(input_text == "");
fresh_ranges_raw = input_text(1:linebreak-1);
fresh_ranges = str2double(split(fresh_ranges_raw, '-'));

fresh_ranges = sortrows(fresh_ranges);

num_ranges = size(fresh_ranges, 1);
unioned_ranges = [fresh_ranges(1,:)];
for i = 2:num_ranges
    this_range = fresh_ranges(i, :);
    this_start = fresh_ranges(i, 1);
    this_end = fresh_ranges(i, 2);
    
    prev_end = unioned_ranges(end, 2);
    if prev_end < this_start
        unioned_ranges = [unioned_ranges; this_range];
    elseif prev_end < this_end
        unioned_ranges(end, 2) = this_end;
    end
end
score = unioned_ranges(:, 2) - unioned_ranges(:, 1) + 1;
num2str(sum(score))
