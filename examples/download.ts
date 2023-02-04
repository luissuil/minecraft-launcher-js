import { MinecraftLauncher } from '../src';

const launcher = new MinecraftLauncher({
  authentication: {
    name: 'Player',
  },
  memory: {
    max: 2048,
    min: 1024,
  },
  version: {
    number: '1.19.3',
    type: 'release',
  },
});

async function main() {
  launcher.on('download_start', (event) => {
    console.log(
      `Starting download assets: ${event.files}, ${event.totalSize / 1024} KB`,
    );
  });

  launcher.on('download_progress', (event) => {
    console.log(
      `Progress: ${event.progress}% | File ${event.progressFiles} of ${
        event.totalFiles
      } | Size ${(event.progressSize / 1024).toFixed(0)}KB / ${(
        event.totalSize / 1024
      ).toFixed(0)}KB`,
    );
  });

  launcher.on('download_end', (event) => {
    console.log(`Finished download: error=${event.error},task=${event.name}`);
  });

  launcher.prepare();
  await launcher.download();
  await launcher.start();
}

main();
