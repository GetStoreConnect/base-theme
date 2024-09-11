const fs = require('fs');
const path = require('path');
const colors = require('colors');
const manifestPlugin = require('esbuild-plugin-manifest');

const buildTypes = ['scripts', 'styles', 'files'];

function notify(type) {
  const color = getColor(type);
  return {
    name: 'notify',
    setup(build) {
      build.onStart(() => {
        console.log(colors[color](`[esbuild ${type}] building...`));
      });
      build.onEnd(result => {
        if (result.errors.length > 0) {
          console.error(colors.red(`${type} build failed with ${result.errors.length} errors`));
        }
        console.log(colors[color](`[esbuild ${type}] ...done`));
      });
    }
  };
}

function getFileExtensions(dir, blacklist = [], extensions = new Set()) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getFileExtensions(filePath, blacklist, extensions);
    } else {
      const ext = path.extname(file);
      if (!blacklist.includes(ext) && ext !== '') {
        extensions.add(ext);
      }
    }
  });

  return [...extensions];
}

function getColor(type) {
  switch (type) {
    case 'scripts':
      return 'magenta'; // Purple
    case 'styles':
      return 'blue';
    case 'files':
      return 'yellow';
    default:
      return 'white'; // Default color if type is not recognized
  }
}

function cleanUp() {
  console.log(colors.red(`[esbuild cleanup] cleaning...`));
  // Path to the manifest file and dist folder
  const basePath = path.join(__dirname, '..');
  const distPath = path.join(basePath, 'dist');
  const manifestPath = path.join(distPath, 'manifest.json');

  // Read the manifest file
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const manifestFiles = new Set(Object.values(manifest));

  // Get all files and directories in /dist
  const allFilesAndDirs = getAllFilesAndDirs(distPath);

  // Loop over all files and directories in /dist and delete unlisted ones
  allFilesAndDirs.forEach((file) => {
    if (file === manifestPath) return;

    const relativePath = path.relative(basePath, file);
    if (!manifestFiles.has(relativePath)) {
      deleteFileOrDirectory(file);
      console.log(colors.red(`  ✘`), relativePath);
    }
  });
  console.log(colors.red(`[esbuild cleanup] ...done`));
}

// Helper function to delete a file or directory
const deleteFileOrDirectory = (targetPath) => {
  if (fs.lstatSync(targetPath).isDirectory()) {
    fs.readdirSync(targetPath).forEach((file) => {
      const curPath = path.join(targetPath, file);
      deleteFileOrDirectory(curPath);
    });
    fs.rmdirSync(targetPath);
  } else {
    fs.unlinkSync(targetPath);
  }
};

// Function to get all files and directories recursively
const getAllFilesAndDirs = (dir) => {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllFilesAndDirs(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
};

const cssHandler = {
  name: 'handle css files',
  setup(build) {
    build.onEnd(result => {
      const outputs = result.metafile.outputs;
      const newOutputs = {};

      Object.keys(outputs).forEach(outputPath => {
        const extension = path.extname(outputPath);

        if (extension === '.css') {
          const newOutputPath = outputPath.replace('dist/scripts/', 'dist/styles/');
          const fullOutputPath = path.resolve(outputPath);
          const fullNewOutputPath = path.resolve(newOutputPath);

          // Create new directory if it doesn't exist
          const newDir = path.dirname(fullNewOutputPath);
          if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
          }

          // Rename the file
          fs.renameSync(fullOutputPath, fullNewOutputPath);

          // Update the metafile
          newOutputs[newOutputPath] = outputs[outputPath];
        } else {
          newOutputs[outputPath] = outputs[outputPath];
        }
      });

      // Sort the newOutputs object
      const sortedNewOutputs = Object.keys(newOutputs)
        .sort()
        .reduce((sortedObj, key) => {
          sortedObj[key] = newOutputs[key];
          return sortedObj;
        }, {});

      // Update the result.metafile.outputs with sorted new paths
      result.metafile.outputs = sortedNewOutputs;
    });
  }
};

module.exports = { notify, getFileExtensions, manifestPlugin, buildTypes, cssHandler, cleanUp};
