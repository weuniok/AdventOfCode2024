data = readlines('input.txt');
data(end+1) = "";
data = reshape(data, 8, []);
data = data(1:end-1, :);
%%
lock_flag = data(1, :) == "#####";
key_flag = data(end, :) == "#####";

binaried_data = (double(char((data))) - double('.')) ./ (double('#') - double('.'));
numerical_data = reshape(sum(binaried_data, 1) - 1, 5, 500);
%%
keys = numerical_data(:,key_flag);
locks = numerical_data(:,lock_flag);

fits = 0;
for key = keys
    for lock = locks
        if ~any(key+lock > 5)
            fits = fits + 1;
        end
    end
end
disp(fits)