import { spawn } from 'child_process';

const rawArgs = process.argv.slice(2);
let port = process.env.PORT || '3000';
let host = '0.0.0.0';

for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '--port' || rawArgs[i] === '-p') {
    if (rawArgs[i + 1]) {
      port = rawArgs[i + 1];
      i++;
    }
  } else if (rawArgs[i] === '--host' || rawArgs[i] === '-H' || rawArgs[i] === '--hostname') {
    if (rawArgs[i + 1]) {
      host = rawArgs[i + 1];
      i++;
    }
  }
}

const nextArgs = ['dev', '-p', port, '-H', host];

const child = spawn('npx', ['next', ...nextArgs], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PORT: port, HOSTNAME: host }
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
