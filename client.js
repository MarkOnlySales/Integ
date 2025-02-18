const axios = require('axios');

(async () => {

    const updateData = {
        firstName: "test",
        lastName: "123"
    }
    
    const users = await axios.patch("http://127.0.0.1:3000/student/67b42f0c525fb628be23d346", updateData);

    console.log(users.data);

})();