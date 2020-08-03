import csv, json

csv_filename = "ln_groups.csv"
json_filename = "ln_groups.json"

data = {}

with open(csv_filename) as csv_file:
    csvReader = csv.DictReader(csv_file)

    for row in csvReader:
        print(row["name"])
        ward = row["\ufeffward"]
        data.update({ward: {"name": row["name"], "url": row["url"]}})

with open(json_filename, "w") as json_file:
    json.dump(data, json_file, indent=4)
