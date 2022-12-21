const div = document.getElementById("init-calc");
const g = document.getElementById("growth-calc");
const m = document.getElementById("multi-calc");
const calc = document.getElementById("calc-val");
const spec = document.getElementById("calc-val-spec");

function runCalc() {
  getCalc(div.value, g.value, m.value);
}

const getCalc = (div, g, m) => {
  axios
    .get("/calc?div=" + div + "&g=" + g + "&m=" + m)
    .then((response) => {
      calc.innerHTML = response.data?.state;
      spec.innerHTML =
        "Multiplier = " +
        m +
        ", Initial Crash Rate = " +
        (1 / response.data?.div).toFixed(2) +
        "%, Growth Rate = " +
        response.data?.g +
        ", CDF: P(X <= " +
        m +
        ") = " +
        response.data?.cdf;
    })
    .catch((error) => {
      console.log(error);
    });
};
