//RBAC =>ROLE BASED ACCESS CONTROL

const secureAPI = (sysRole = []) => {
  return (req, res, next) => {
    try {
      const { role = "" } = req.headers;
      if (!role && sysRole.length === 0) {
        next();
      } else {
        const isAllowed = sysRole.includes(role);
        if (!isAllowed) throw new Error("User is unauthorized");
        next();
      }
    } catch (error) {
      next();
    }
  };
};
export default secureAPI;
