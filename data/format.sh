for file in ./*.txt; do
	[ -e "$file" ] || continue
	cat $file | grep -o 'data-original-title="[0-9]\{1,2\}h[0-9]\{2\}"' | awk -F\" '{print $2}' > form_data/$file
done
