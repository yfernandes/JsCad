import fs from "fs";

export function writeOutput(outputFile, outputData) {
	fs.writeFile(outputFile, outputData.asBuffer(), (err) => {
		if (err) {
			console.log("err", err);
		}
	});
}
