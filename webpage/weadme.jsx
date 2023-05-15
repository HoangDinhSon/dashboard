  // validation for email
  const validateEmail = () => {
    const pattern = /^g/;
    if (dataUser.email === "" || dataUser.email === undefined) {
      setAlertEmail("Email is required");
      return false;
    } else if (pattern.test(dataUser.email)) {
      console.log("validation true");
      setAlertEmail("");
      return true;
    } else {
      setAlertEmail("Email is not valid");
      return false;
    }
  };
 
  