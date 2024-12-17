disk_map = double(char(readlines('input.txt'))) - 48;
disk = zeros(sum(disk_map, 'all'), 1);

%% part 1
%% part 1 disk mapping
iter = 1;
id = 1;
pointer = 1;
for code = disk_map
    value_mod = mod(iter, 2);
    if (value_mod) == 1
        disk(pointer:(pointer+code-1)) = id;
        id = id + 1;
    end
    pointer = pointer + code;
    iter = iter + 1;
end

%% part 1 disk shuffling
last_pointer = 0;
for index = 1:numel(disk)
    if disk(index) == 0
        while disk(end-last_pointer) == 0
            last_pointer = last_pointer + 1;
        end
        if index > (numel(disk) - last_pointer)
            break
        end
        disk(index) = disk(end-last_pointer);
        disk(end-last_pointer) = 0;
    end
end

%% part 1 checksum
disk = disk - 1; % used ids started with 1 to differentiate them from 0s
disk = max(disk, 0);
indices = (1:numel(disk)) - 1;
checksum_p1 = sum(indices' .* disk, 'all')

%% part 2
spaces = dictionary(double([]), {});
files = dictionary(double([]), struct('start', double([]), 'size', double([])));

pointer = 1; id = 0;
iter = 1;
%% part 2 disk analyzing
for code = disk_map
    value_mod = mod(iter, 2);
    if (value_mod) == 1
        files(id) = struct('start', pointer, 'size', code);
        id = id + 1;
    else
        if isKey(spaces, code)
            value = spaces(code);
            spaces(code) = {[value{1}, pointer]};
        else
            spaces(code) = {pointer};
        end
    end
    pointer = pointer + code;
    iter = iter + 1;
end

%% part 2 shuffling
fileIds = keys(files);

for id = flip(keys(files))'
    file_data = files(id);
    size = file_data.size;
    start = file_data.start;

    available_space_sizes = keys(spaces);
    sufficent_sizes = available_space_sizes(available_space_sizes >= size);
    first_pointers = cellfun(@min, spaces(sufficent_sizes));
    [sorted_pointers, order] = sort(first_pointers);

    if(sorted_pointers(1) > start)
        continue
    end
    used_key = sufficent_sizes(order(1));
    used_pointer = sorted_pointers(1);
    that_key_pointers = spaces(used_key);

    files(id).start = used_pointer; % update fil position
    spaces(used_key) = {that_key_pointers{1}(that_key_pointers{1} ~= used_pointer)}; % remove free space from dict
    if used_key > size % add the leftover space to the spaces dict
        size_diff = used_key - size;
        created_space_pointer = used_pointer+size;

        if isKey(spaces, size_diff)
            size_diff_pointers = spaces(size_diff);
            new_size_diff_pointers = {sort([size_diff_pointers{1}, created_space_pointer])};
        else
            new_size_diff_pointers = {created_space_pointer};
        end
        spaces(size_diff) = new_size_diff_pointers;
    end
end
%% part 2 disk unpacking
new_disk = zeros(sum(disk_map, 'all'), 1);
for id = flip(keys(files))'
    file_data = files(id);
    size = file_data.size;
    start = file_data.start;

    new_disk(start:(start+size-1)) = id;
end

indices = (1:numel(disk)) - 1;
checksum_p2 = sum(indices' .* new_disk, 'all')
