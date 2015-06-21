var fs = require('fs');
var args = process.argv.slice(2);

var years = [];
for (var year = 1950; year <= 2009; year++) {
	years.push(year);
}

function interpolateYears(array, years) {
	var out = [];
	var j = 0; // index into 'years'
	for (var i = 0; i < array.length; i++) {
		if (j >= years.length) {
			return out;
		}
		while (array[i][0] > years[j]) {
			if (i == 0) {
				// console.log('Warning: No data as early as ' + years[j] + '.');
				return [];
			}
			var fraction = (years[j] - array[i-1][0])/(array[i][0] - array[i-1][0]);
			var interpolatedValue = array[i-1][1] + (array[i][1] - array[i-1][1])*fraction;
			out.push(interpolatedValue);
			j += 1;
		}
		if (array[i][0] == years[j]) {
			out.push(array[i][1]);
			j += 1;
		}
	}
	return out;
}

var data = JSON.parse(fs.readFileSync(args[0]));
var processedData = data.map(function(nation) {
	var processedNation = {
		name: nation.name,
		region: nation.region,
		years: years,
		income: interpolateYears(nation.income, years),
		population: interpolateYears(nation.population, years),
		lifeExpectancy: interpolateYears(nation.lifeExpectancy, years)
	};
	var excludeNation = false;
	excludeNation = excludeNation || (processedNation.income.length == 0);
	excludeNation = excludeNation || (processedNation.population.length == 0);
	excludeNation = excludeNation || (processedNation.lifeExpectancy.length == 0);
	if (excludeNation) {
		console.log('Excluding "' + nation.name + '" because of lack of data.');
		return undefined;
	} else {
		return processedNation;
	}
}).filter(function(nation) {
	return nation != undefined;
});

fs.writeFileSync(args[1], JSON.stringify(processedData, undefined, 2));
