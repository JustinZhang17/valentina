const displayAlert = (title, text) => {
  const alert = document.getElementById("alert-anim");
  alert.querySelector("strong").innerHTML = title;
  alert.querySelector("span").innerHTML = text;
  reTriggerAnimation(alert);
  setAnimState(alert, "running");
};
