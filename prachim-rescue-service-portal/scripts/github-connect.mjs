import fetch from 'node-fetch';
import { execSync } from 'child_process';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO_NAME = 'westernrescueunit';

async function setupGithub() {
  if (!GITHUB_TOKEN) {
    console.log('GITHUB_TOKEN not provided in environment.');
    return;
  }
  console.log('Connecting to GitHub API...');
}

setupGithub();
