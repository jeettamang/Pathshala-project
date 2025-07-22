const useSidebarLinks = () => {
  return [
    {
      to: "/admin/dashboard",
      iconPath:
        "M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6",
      label: "Dashboard",
    },
    {
      to: "/admin/users/create",
      iconPath:
        "M18 9v6m3-3h-6m-2 5a4 4 0 10-8 0m8 0a4 4 0 01-8 0m8 0H4m16-7a4 4 0 11-8 0 4 4 0 018 0z",
      label: "Add user",
    },
    {
      to: "/admin/expense",
      iconPath: "M12 9v6m-3-3h6m6 0a9 9 0 11-18 0 9 9 0 0118 0z",
      label: "Add expense",
    },
    {
      to: "/admin/add-income",
      iconPath: "M12 4v16m8-8H4",
      label: "Add income",
    },
    {
      to: "/admin/users",
      iconPath:
        "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0zm6 13H2",
      label: "User list",
    },
    {
      to: "/admin/category",
      iconPath: "M7 7h.01M3 11V5a2 2 0 012-2h6l8 8-6 6-8-8z",
      label: "Category",
    },
  ];
};

export default useSidebarLinks;
