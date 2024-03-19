in_file = open('haunted_places.json', 'r')
out_file = open('new_places.json', 'w')
sample_file = open('sample.txt', 'w')

out_file.write('{\n\t"places": [\n')

lines = in_file.readlines()

for line in lines:
	out_file.write('\t\t' + line + ',\n')
