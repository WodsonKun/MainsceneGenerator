const { exec } = require("child_process");

let codename = ''
let coachcount = ''
codename = process.argv[2]
var codenamelower = codename.toLowerCase()
console.log('\x1b[36m%s\x1b[0m', "---- GENERATE IPK UTILITY ----" + '\n')
console.log("Running..." + '\n')

exec(`bin\\unpakke\\Unpakke.exe bin\\unpakke\\modules\\ubiart.umod pack output_mainscene\\${codename} output_IPK\\${codenamelower}_pc.ipk`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Generated IPK for codename, size: `);
        return;
    }
    console.log(`stdout: ${stdout}`);
});