const fs = require('fs');
const path = require('path');

// Specify the directory containing the images
const directoryPath = 'public/images';

// Function to delete files matching the criteria
function deleteImages(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }

        files.forEach((file) => {
            const filePath = path.join(directory, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    return console.error('Error stating file:', filePath, err);
                }

                if (stats.isDirectory()) {
                    // Recursively call deleteImages for nested directories
                    deleteImages(filePath);
                } else if (stats.isFile()) {
                    const regex = /-800x0\.\w+$/;
                    const excludeRegex1 = /-600x0\.\w+$/;

                    if (regex.test(file) && !excludeRegex1.test(file)) {
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error('Error deleting file:', filePath, err);
                            } else {
                                console.log('Deleted:', filePath);
                            }
                        });
                    }
                }
            });
        });
    });
}

// Call the function
deleteImages(directoryPath);
