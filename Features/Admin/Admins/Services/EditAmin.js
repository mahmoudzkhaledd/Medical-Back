const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

const { adminRoles } = require('../../../../ServerConfigs/AdminRoles');
exports.editAdmin = asyncHandeler(
    async (req, res, next) => {
        const adminId = req.params.id;
        if (!ObjectId.isValid(adminId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على المدير المطلوب" });
        }
        const { name, email, username, phone, roles } = req.body;
        if (Object.keys(roles).length != adminRoles.length) {
            return res.status(400).json({ msg: "من فضلك أدخل كل الصلاحيات المطلوبة" })
        }
        for (const role of adminRoles) {
            if (roles[role.ref] == null) {
                return res.status(400).json({ msg: "من فضلك أدخل كل الصلاحيات المطلوبة" })
            }
        }
        const count = await Admin.find({
            $or: [
                {
                    username: username,
                },
                {
                    email: email,
                },
            ],
            _id: { $ne: adminId }
        });
        console.log(count);
        if (count.length != 0) {
            console.log('got itttttttttt');
            return res.status(404).json({ msg: "هناك مدير اخر بنفس اسم المستخدم !" });
        }
        try {
            const admin = await Admin.findById(adminId);
            if (admin.master) {
                await admin.updateOne({ name, email, username, phone });
            } else {
                await admin.updateOne({ name, email, username, phone, roles });
            }
            if (admin != null) {
                return res.status(200).json({ admin });
            } else {
                return res.status(404).json({ msg: "لم نتمكن من العثور على المدير" });
            }
        } catch (ex) {

            return res.status(404).json({ msg: ex.message });
        }
    }
)