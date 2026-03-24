const { execSync } = require('child_process');
const fs = require('fs');

const logPath = 'git-commit.log';
function log(msg) {
    console.log(msg);
    fs.appendFileSync(logPath, msg + '\n');
}

try {
    fs.writeFileSync(logPath, 'Starting Git Commit Fix...\n');
    
    const commands = [
        'git init',
        'git config user.email "abhyuday@example.com"',
        'git config user.name "Abhyudaya"',
        'git add .',
        'git commit -m "Initial commit (Final Clean)"',
        'git log -n 1'
    ];

    for (const cmd of commands) {
        log(`Executing: ${cmd}`);
        try {
            const output = execSync(cmd, { stdio: 'pipe' }).toString();
            log(`Output: ${output}`);
        } catch (err) {
            log(`Error in ${cmd}: ${err.stderr ? err.stderr.toString() : err.message}`);
        }
    }
    log('Done.');
} catch (globalErr) {
    log(`Global Error: ${globalErr.message}`);
}
