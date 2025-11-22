const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('Starting API Tests...');

    // 1. Test Settings
    console.log('\nTesting GET /settings...');
    try {
        const settingsRes = await fetch(`${BASE_URL}/settings`);
        const settings = await settingsRes.json();
        console.log('Settings:', settings);
    } catch (e) {
        console.error('Failed to get settings:', e.message);
    }

    // 2. Test Create Log
    console.log('\nTesting POST /logs...');
    const newLog = {
        date: new Date().toISOString(),
        habits: ['habit1', 'habit2'],
        meals: ['meal1'],
        exercises: [0, 1],
        weight: 75.5,
        notes: 'Test log'
    };

    try {
        const createRes = await fetch(`${BASE_URL}/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLog)
        });
        const createdLog = await createRes.json();
        console.log('Created Log:', createdLog);
    } catch (e) {
        console.error('Failed to create log:', e.message);
    }

    // 3. Test Get All Logs
    console.log('\nTesting GET /logs...');
    try {
        const logsRes = await fetch(`${BASE_URL}/logs`);
        const logs = await logsRes.json();
        console.log('All Logs Count:', logs.length);
    } catch (e) {
        console.error('Failed to get logs:', e.message);
    }

    // 4. Test MTD Report
    console.log('\nTesting GET /logs/report/mtd...');
    try {
        const mtdRes = await fetch(`${BASE_URL}/logs/report/mtd`);
        const mtdLogs = await mtdRes.json();
        console.log('MTD Logs Count:', mtdLogs.length);
    } catch (e) {
        console.error('Failed to get MTD report:', e.message);
    }
}

testAPI();
