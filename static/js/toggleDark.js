const toggleDark = () => {
  doc = document.documentElement.classList;
  doc.contains("dark") ? doc.remove("dark") : doc.add("dark");
};
