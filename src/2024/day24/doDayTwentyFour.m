data = readlines('input.txt');
values = data(1:find(data=="")-1);
operations = data(find(data=="")+1 : end);

solved_wires = dictionary(string([]), logical([]));
names = values.extractBefore(":");
vals = logical(double(values.extractAfter(" ")));
solved_wires(names) = vals;

operations = split(operations);
gates = operations(:, [1:3, end]);
og_gates = gates;

%% part 1
solved = false(size(gates, 1), 1);
while ~all(solved)
    progress = false;
    
    for i = 1:height(gates)
        if solved(i)
            continue;
        end
        
        gate = gates(i, :);
        input1 = gate(1);
        operand = gate(2);
        input2 = gate(3);
        output = gate(4);
        
        if isKey(solved_wires, input1) && isKey(solved_wires, input2)
            value1 = solved_wires(input1);
            value2 = solved_wires(input2);
            
            % Compute the output
            switch operand
                case 'AND'
                    solved_wires(output) = value1 && value2;
                case 'OR'
                    solved_wires(output) = value1 || value2;
                case 'XOR'
                    solved_wires(output) = xor(value1, value2);
            end
            
            solved(i) = true; % Mark gate as resolved
            progress = true;
        end
    end
    
    % Check for progress
    if ~progress
        error('Cannot solve.');
    end
end

%% part 1 output
wires = keys(solved_wires);
z_wires = sort(wires(wires.startsWith('z')), 'descend'); 

result = string(strrep(num2str(solved_wires(z_wires)'), ' ', ''));
disp(bin2dec(result))

% %% plot
% connections = height(gates)*2;
% inputs = string(zeros(1, connections));
% outputs = string(zeros(1, connections));
% labels = outputs;
% 
% for i = 1:height(gates)
%     gate = gates(i, :);
%     inputs(i*2-1) = gate(1);
%     inputs(i*2) = gate(3);
%     outputs([i*2-1, i*2]) = gate(4);
% end
% diagram = digraph(inputs, outputs);
% 
% plot(diagram, 'Layout', 'layered')


%% part 2
solved_wires = dictionary(string([]), string([]));
names = values.extractBefore(":");
vals = logical(double(values.extractAfter(" ")));
solved_wires(names) = vals;
solved_wires_og_names = solved_wires;

operations = split(operations);
gates = operations(:, [1:3, end]);
%fixes - this is manual solving, iteratively checking stringified_final_wires and looking where 
% the first error is - this is easy to spot since it cascades
gates = swapGates(gates, "z14", "vss");
gates = swapGates(gates, "kdh", "hjf");
gates = swapGates(gates, "z31", "kpp");
gates = swapGates(gates, "z35", "sgj");


solved = false(size(gates, 1), 1);
while ~all(solved)
    progress = false;
    
    for i = 1:height(gates)
        if solved(i)
            continue;
        end
        
        gate = gates(i, :);
        og_gate = og_gates(i, :);
        input1 = gate(1);
        operand = gate(2);
        input2 = gate(3);
        output = gate(4);
        
        if isKey(solved_wires, input1) && isKey(solved_wires, input2)
            value1 = solved_wires(input1);
            value2 = solved_wires(input2);

            new_name = sprintf("(%s-%s-%s)", input1, operand, input2);
            gates = strrep(gates, output, new_name);

            if extractBefore(output, 2) == "z"
                solved_wires(output) = new_name;
            else
                solved_wires(new_name) = new_name;
            end
            solved_wires_og_names(og_gate(4)) = sprintf("(%s-%s-%s)", og_gate(1), operand, og_gate(3));
            
            solved(i) = true; % Mark gate as resolved
            progress = true;
        end
    end
    
    % Check for progress
    if ~progress
        error('Cannot solve.');
    end
end

%
solved_keys = solved_wires.keys;
keys_map = extractBefore(solved_wires.keys, 2) == "z";
final_keys = solved_keys(keys_map);

% stringified_final_wires = final_keys + " = " + solved_wires(final_keys);
stringified_final_wires = solved_keys + " = " + solved_wires(solved_keys);
% filtered_wires = dictionary(string([]), string([]));
% filtered_wires(final_keys) = solved_wires(final_keys);


stringified_final_wires = strrep(stringified_final_wires, ...
    "(x00-XOR-y00)", "z00");
stringified_final_wires = strrep(stringified_final_wires, ...
    "(y00-XOR-x00)", "z00");
stringified_final_wires = strrep(stringified_final_wires, ...
    "(y00-AND-x00)", "c00");
stringified_final_wires = strrep(stringified_final_wires, ...
    "(x00-AND-y00)", "c00");
for index = 1:(height(stringified_final_wires)-1)
    index_str = index + "";
    prev_index_str = index - 1 + "";
    if index < 10
        index_str = "0" + index;
    end
    if index - 1 < 10
        prev_index_str = "0" + (index - 1);
    end

    this_x = "x"+index_str;
    this_y = "y"+index_str;
    prev_c = "c"+prev_index_str;
    prev_z = "z"+prev_index_str;

    % s = x XOR y
    this_s = "s"+index_str;
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_x + "-XOR-" + this_y + ")", ...
        this_s);
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_y + "-XOR-" + this_x + ")", ...
        this_s);
    % z = s XOR c n-1
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_s + "-XOR-" + prev_c + ")", ...
         "z" + index_str);
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + prev_c + "-XOR-" + this_s + ")", ...
        "z" + index_str);
    % c = sAND(c-1) OR xANDy
    this_sANDc = "sANDc" + index_str;
    this_xANDy = "xANDy" + index_str;
    this_c = "c" + index_str;

    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_x + "-AND-" + this_y + ")", ...
        this_xANDy);
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_y + "-AND-" + this_x + ")", ...
        this_xANDy);

    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + prev_c + "-AND-" + this_s + ")", ...
        this_sANDc);
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_s + "-AND-" + prev_c + ")", ...
        this_sANDc);

    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_sANDc + "-OR-" + this_xANDy + ")", ...
        this_c);
    stringified_final_wires = strrep(stringified_final_wires, ...
        "(" + this_xANDy + "-OR-" + this_sANDc + ")", ...
        this_c);
end


function gates = swapGates(gates, target1, target2)
placeholder = "temp";

gates(gates(:,4) == target1, 4) = placeholder;
gates(gates(:,4) == target2, 4) = target1;
gates(gates(:,4) == placeholder, 4) = target2;
end