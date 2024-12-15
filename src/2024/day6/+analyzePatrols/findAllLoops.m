function loop_counter = findAllLoops(data_mat)
  loop_counter = 0;
  for i=1:numel(data_mat)
    if data_mat(i) == double('#')
        continue
    end

    data_mat_altered = data_mat;
    data_mat_altered(i) = double('#');
    
    [~, stuck_in_loop] = performPatrol(data_mat_altered);
    if(stuck_in_loop)
        loop_counter = loop_counter + 1;
    end
  end

end