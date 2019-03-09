const swf = require('./index');
const main = async () => {
    const result = await swf();
    console.log(result);
}
main();