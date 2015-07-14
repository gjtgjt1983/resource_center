require 'json'
require  'find'


Find.find("../app/data/projects/") do |filename|
	filename.gsub!('../app/data/projects/', '')
	dirs = filename.split('/')
	dirs.delete('')

	#项目名称
    project_name = nil
	#项目信息
	if(dirs.size == 1)
	    content = ""
		File.open('../app/data/projects.json', 'r').readlines.each do |line|
		    content += line.chomp
		end
		json = JSON.parse content
		if !json['projects'].include?(dirs.first)
		    json['projects'].store dirs.first, { 'name' => dirs.first }
		else
		    json['projects'][dirs.first]['name'] = dirs.first
		end
		file = File.open('../app/data/projects.json', 'w')
		file.puts json.to_s.gsub('=>', ' : ')
		file.close
	end
	if(dirs.size > 2)
        project_name = dirs.first
        dirs = dirs[1, dirs.size-1]
        if File.exist?('../app/data/'+ project_name +'.json')
            file = File.open('../app/data/'+ project_name +'.json', 'r')
            content = ""
            file.readlines.each do |line|
                content += line.chomp
            end
            file.close
        else
            file = File.new('../app/data/'+ project_name +'.json', 'w')
            file.close
            content = ""
        end

        if(content != "")
            json = JSON.parse content
        else
            json = {}
        end

        _pre = ""
        dirs.size.times.each do |i|
            pre = ""
            (i+1).times.each do |_i|
                pre += "['#{dirs[_i]}']"
            end

            if !eval("json#{pre}")
                if i < dirs.size - 1
                    eval("json#{pre} = {}")
                else
                    if eval("json#{_pre}").class == String
                        eval("json#{_pre} = {}")
                    end
                    eval("json#{pre} = dirs.last")
                end
            else
                if i == dirs.size - 1
                    eval("json#{pre} = dirs.last")
                end
            end
            _pre = pre
        end
        file = File.open('../app/data/'+ project_name +'.json', 'w')
        file.puts json.to_s.gsub('=>', ' : ')
        file.close
	end

end
