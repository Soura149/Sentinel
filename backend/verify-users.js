import dotenv from 'dotenv';
import connectDB from './config/database.js';
import User from './models/User.js';
import Patient from './models/Patient.js';

dotenv.config();
connectDB();

const checkData = async () => {
    try {
        const staff = await User.findOne({ email: 'kk@gmail.com' });
        const patient = await Patient.findOne({ email: 'soura@gmail.com' });

        const result = {
            staff: staff ? { found: true, email: staff.email, role: staff.role } : { found: false },
            patient: patient ? { found: true, email: patient.email, phone: patient.phone, name: patient.name } : { found: false }
        };

        console.log('___RESULT_START___');
        console.log(JSON.stringify(result, null, 2));
        console.log('___RESULT_END___');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Wait a bit for connection
setTimeout(checkData, 2000);
