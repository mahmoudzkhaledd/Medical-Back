async function genPass() {
    const bcrypt = require("bcrypt");
    const salt = await bcrypt.genSalt();
    console.log(await bcrypt.hash("admin", salt));
}
genPass();
